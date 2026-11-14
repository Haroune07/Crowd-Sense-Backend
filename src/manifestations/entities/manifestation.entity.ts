import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('manifestations')
export class Manifestation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column()
  startsAt: Date;

  @Column('float')
  meetingLat: number;

  @Column('float')
  meetingLng: number;

  /**
   * 6-character alphanumeric code shared via MIO / Omnivox
   */
  @Column({ unique: true })
  code: string;

  @Column()
  organizerId: string;

  @CreateDateColumn()
  createdAt: Date;
}
