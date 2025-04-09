import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElevatorController } from './elevator.controller';
import { ElevatorService } from './elevator.service';
import { ElevatorStatus } from './elevator-status.entity';
import { ElevatorQueue } from './elevator-queue.entity';
import { ElevatorLog } from './elevator-log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ElevatorStatus,
      ElevatorQueue,
      ElevatorLog
    ])
  ],
  controllers: [ElevatorController],
  providers: [ElevatorService]
})
export class ElevatorModule {}