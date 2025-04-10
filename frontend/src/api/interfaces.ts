export interface ElevatorStatus {
    currentFloor: number;
    isMoving: boolean;
    doorsOpen: boolean;
    direction: 'up' | 'down' | 'idle';
    queue: number[];
  }

  export interface ElevatorLog {
    id: number;
    eventType: 'call' | 'arrival' | 'door_open' | 'door_close' | 'start' | 'stop';
    floor: number | null;
    details: string;
    createdAt: Date;
  }
  
export type DoorAction = 'open' | 'close';
export type MovementAction = 'start' | 'stop';
