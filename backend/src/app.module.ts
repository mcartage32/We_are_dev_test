import dataBaseConfig from './dataBaseConfig';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElevatorModule } from './elevator/elevator.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataBaseConfig),
    ElevatorModule,
  ],
})
export class AppModule {}
