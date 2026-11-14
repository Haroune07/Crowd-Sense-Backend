import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('polls')
export class Poll {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  manifestationId: string;

  @Column()
  question: string;

  @Column('simple-json')
  options: string[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
