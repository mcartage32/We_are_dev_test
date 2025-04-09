import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Param, 
    Logger 
  } from '@nestjs/common';
  import { ElevatorService } from './elevator.service';
  import { CallElevatorDto } from './elevator.dto';
  import { ElevatorResponseDto } from './elevator.dto';
  
  @Controller('elevator')
  export class ElevatorController {
    private readonly logger = new Logger(ElevatorController.name);
  
    constructor(private readonly elevatorService: ElevatorService) {}
  
    @Get('status')
    async getStatus(): Promise<ElevatorResponseDto> {
      this.logger.log('Fetching elevator status');
      return this.elevatorService.getStatus();
    }
  
    @Post('call')
    async callElevator(
      @Body() callDto: CallElevatorDto
    ): Promise<ElevatorResponseDto> {
      this.logger.log(`Calling elevator to floor ${callDto.floor}`);
      return this.elevatorService.callElevator(callDto);
    }
  
    @Post('doors/:action')
    async controlDoors(
      @Param('action') action: 'open' | 'close'
    ): Promise<ElevatorResponseDto> {
      this.logger.log(`Controlling doors: ${action}`);
      if (action !== 'open' && action !== 'close') {
        throw new Error('Invalid door action');
      }
      return this.elevatorService.controlDoors(action);
    }
  
    @Post('movement/:action')
    async controlMovement(
      @Param('action') action: 'start' | 'stop'
    ): Promise<ElevatorResponseDto> {
      this.logger.log(`Controlling movement: ${action}`);
      if (action !== 'start' && action !== 'stop') {
        throw new Error('Invalid movement action');
      }
      return this.elevatorService.controlMovement(action);
    }
  }