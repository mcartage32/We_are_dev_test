import dataBaseConfig from './dataBaseConfig';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataBaseConfig),

  ],
})
export class AppModule {}
