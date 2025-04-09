import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity()
export class ElevatorStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  current_floor: number;

  @Column({ default: false })
  is_moving: boolean;

  @Column({ default: false })
  doors_open: boolean;

  @Column({
    type: 'enum',
    enum: ['up', 'down', 'idle'],
    default: 'idle'
  })
  direction: string;

  @UpdateDateColumn()
  last_updated: Date;
}