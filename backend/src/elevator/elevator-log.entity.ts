import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class ElevatorLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['call', 'arrival', 'door_open', 'door_close', 'start', 'stop']
  })
  event_type: string;

  @Column({ nullable: true })
  floor: number;

  @Column({ length: 255, nullable: true })
  details: string;

  @CreateDateColumn()
  created_at: Date;
}