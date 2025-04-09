import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class ElevatorQueue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  floor: number;

  @CreateDateColumn()
  request_time: Date;

  @Column({
    type: 'enum',
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending'
  })
  status: string;

  @Column({ nullable: true })
  completed_time: Date;
}