import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ElevatorStatus } from './elevator-status.entity';
import { ElevatorQueue } from './elevator-queue.entity';
import { ElevatorLog } from './elevator-log.entity';
import { CallElevatorDto } from './elevator.dto';
import { ElevatorResponseDto } from './elevator.dto';
import { 
  ELEVATOR_DIRECTIONS, 
  QUEUE_STATUS, 
  EVENT_TYPES 
} from './elevator.constants';

@Injectable()
export class ElevatorService {
  private readonly logger = new Logger(ElevatorService.name);
  private readonly STATUS_ID = 1; // ID fijo para el estado del ascensor

  constructor(
    @InjectRepository(ElevatorStatus)
    private statusRepository: Repository<ElevatorStatus>,
    @InjectRepository(ElevatorQueue)
    private queueRepository: Repository<ElevatorQueue>,
    @InjectRepository(ElevatorLog)
    private logRepository: Repository<ElevatorLog>,
  ) {}

    // Inicializa el estado del elevador si no existe
    async initializeElevator(): Promise<void> {
      const existingStatus = await this.statusRepository.findOne({ 
        where: { id: this.STATUS_ID } 
      });
  
      if (!existingStatus) {
        this.logger.log('Initializing elevator status...');
        const newStatus = this.statusRepository.create({
          id: this.STATUS_ID,
          current_floor: 0,
          is_moving: false,
          doors_open: false,
          direction: ELEVATOR_DIRECTIONS.IDLE
        });
        await this.statusRepository.save(newStatus);
        this.logger.log('Elevator status initialized');
      }
    }
  
    // Obtiene el estado actual del elevador
    private async getCurrentStatus(): Promise<ElevatorStatus> {
    let status = await this.statusRepository.findOne({ where: { id: this.STATUS_ID } });
    if (!status) {
      this.logger.log('Initializing new elevator status');
      status = this.statusRepository.create({
        id: this.STATUS_ID,
        current_floor: 0,
        is_moving: false,
        doors_open: false,
        direction: ELEVATOR_DIRECTIONS.IDLE
      });
      await this.statusRepository.save(status);
    }
    return status;
  }

  // Obtiene el estado completo del ascensor 
  async getStatus(): Promise<ElevatorResponseDto> {
    const status = await this.getCurrentStatus();
    const pendingQueue = await this.queueRepository.find({ 
      where: { status: QUEUE_STATUS.PENDING },
      order: { request_time: 'ASC' }
    });

    return {
      currentFloor: status.current_floor,
      isMoving: status.is_moving,
      doorsOpen: status.doors_open,
      direction: status.direction,
      queue: pendingQueue.map(item => item.floor)
    };
  }

  // Llama al ascensor a un piso específico
  async callElevator(callDto: CallElevatorDto): Promise<ElevatorResponseDto> {
    const { floor } = callDto;
    const status = await this.getCurrentStatus();

    // Validaciones
    if (isNaN(floor)) throw new Error('Invalid floor number');
    if (floor === status.current_floor) {
      throw new Error('Elevator is already on this floor');
    }

    // Registrar en la cola si no existe ya
    const existingRequest = await this.queueRepository.findOne({ 
      where: { 
        floor, 
        status: QUEUE_STATUS.PENDING 
      } 
    });

    if (!existingRequest) {
      await this.queueRepository.save({ floor });
      await this.logRepository.save({
        event_type: EVENT_TYPES.CALL,
        floor,
        details: `Elevator called to floor ${floor}`
      });
    }

    // Procesar cola si el ascensor está inactivo
    if (!status.is_moving && !status.doors_open) {
      await this.processQueue();
    }

    return this.getStatus();
  }

  // Controla las puertas del ascensor
  async controlDoors(action: 'open' | 'close'): Promise<ElevatorResponseDto> {
    const status = await this.getCurrentStatus();

    if (action === 'open') {
      if (status.is_moving) {
        throw new Error('Cannot open doors while elevator is moving');
      }
      await this.statusRepository.update(this.STATUS_ID, { doors_open: true });
      await this.logRepository.save({
        event_type: EVENT_TYPES.DOOR_OPEN,
        floor: status.current_floor,
        details: 'Doors opened'
      });
    } else if (action === 'close') {
      await this.statusRepository.update(this.STATUS_ID, { doors_open: false });
      await this.logRepository.save({
        event_type: EVENT_TYPES.DOOR_CLOSE,
        floor: status.current_floor,
        details: 'Doors closed'
      });
      // Procesar cola si hay solicitudes pendientes
      await this.processQueue();
    }

    return this.getStatus();
  }

  // Controla el movimiento del ascensor
  async controlMovement(action: 'start' | 'stop'): Promise<ElevatorResponseDto> {
    const status = await this.getCurrentStatus();

    if (action === 'start') {
      if (status.doors_open) {
        throw new Error('Cannot start elevator with doors open');
      }
      await this.statusRepository.update(this.STATUS_ID, { 
        is_moving: true 
      });
      await this.logRepository.save({
        event_type: EVENT_TYPES.START,
        details: 'Elevator started moving'
      });
      await this.processQueue();
    } else if (action === 'stop') {
      await this.statusRepository.update(this.STATUS_ID, { 
        is_moving: false,
        direction: ELEVATOR_DIRECTIONS.IDLE
      });
      await this.logRepository.save({
        event_type: EVENT_TYPES.STOP,
        floor: status.current_floor,
        details: 'Elevator stopped'
      });
    }

    return this.getStatus();
  }

  // Procesa la cola de solicitudes de pisos
  private async processQueue(): Promise<void> {
    const status = await this.getCurrentStatus();
    if (status.is_moving || status.doors_open) return;

    const nextRequest = await this.queueRepository.findOne({
      where: { status: QUEUE_STATUS.PENDING },
      order: { request_time: 'ASC' }
    });

    if (!nextRequest) return;

    await this.queueRepository.update(nextRequest.id, { 
      status: QUEUE_STATUS.IN_PROGRESS 
    });

    const direction = nextRequest.floor > status.current_floor 
      ? ELEVATOR_DIRECTIONS.UP 
      : ELEVATOR_DIRECTIONS.DOWN;

    await this.statusRepository.update(this.STATUS_ID, { 
      direction,
      is_moving: true 
    });

    // Simular movimiento entre pisos
    let currentFloor = status.current_floor;
    while (currentFloor !== nextRequest.floor) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 segundo por piso
      currentFloor += direction === ELEVATOR_DIRECTIONS.UP ? 1 : -1;
      await this.statusRepository.update(this.STATUS_ID, { 
        current_floor: currentFloor 
      });

      // Verificar si hay solicitudes para el piso actual
      const intermediateRequest = await this.queueRepository.findOne({
        where: { 
          floor: currentFloor, 
          status: QUEUE_STATUS.PENDING 
        }
      });

      if (intermediateRequest) {
        await this.handleArrival(currentFloor);
        break;
      }
    }

    if (currentFloor === nextRequest.floor) {
      await this.handleArrival(currentFloor);
    }

    // Verificar si hay más solicitudes
    await this.processQueue();
  }

  // Maneja la llegada del ascensor a un piso
  private async handleArrival(floor: number): Promise<void> {
    // Marcar todas las solicitudes para este piso como completadas
    await this.queueRepository.update(
      { floor, status: QUEUE_STATUS.PENDING },
      { 
        status: QUEUE_STATUS.COMPLETED,
        completed_time: new Date() 
      }
    );

    await this.statusRepository.update(this.STATUS_ID, { 
      is_moving: false,
      doors_open: true,
      direction: ELEVATOR_DIRECTIONS.IDLE
    });

    await this.logRepository.save({
      event_type: EVENT_TYPES.ARRIVAL,
      floor,
      details: `Elevator arrived at floor ${floor}`
    });

    // Cerrar puertas después de 2 segundos automáticamente
    setTimeout(async () => {
      const currentStatus = await this.getCurrentStatus();
      if (currentStatus.doors_open && !currentStatus.is_moving) {
        await this.controlDoors('close');
      }
    }, 2000);
  }
}