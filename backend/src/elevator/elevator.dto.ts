export class CallElevatorDto {
    floor: number;
}

export class ElevatorResponseDto {
    currentFloor: number;
    isMoving: boolean;
    doorsOpen: boolean;
    direction: string;
    queue: number[];
}