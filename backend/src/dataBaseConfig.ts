import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ElevatorStatus } from './elevator/elevator-status.entity';
import { ElevatorQueue } from './elevator/elevator-queue.entity';
import { ElevatorLog } from './elevator/elevator-log.entity';

dotenv.config();

const dataBaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root',
  database: process.env.DB_NAME || 'we_are_dev_test',
  entities: [
    ElevatorStatus,
    ElevatorQueue,
    ElevatorLog
  ],
  synchronize: true,
  logging: process.env.NODE_ENV === 'development',
};

export default dataBaseConfig;