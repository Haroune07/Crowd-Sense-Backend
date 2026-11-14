import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum AnnouncementSeverity {
  INFO = 'info',
  WARNING = 'warning',
  URGENT = 'urgent',
}

@Entity('announcements')
export class Announcement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  manifestationId: string;

  @Column({ nullable: true })
  authorId: string;

  @Column()
  title: string;

  @Column('text')
  message: string;

  @Column({
    type: 'simple-enum',
    enum: AnnouncementSeverity,
    default: AnnouncementSeverity.INFO,
  })
  severity: AnnouncementSeverity;

  @Column('float', { nullable: true })
  lat: number;

  @Column('float', { nullable: true })
  lng: number;

  @CreateDateColumn()
  createdAt: Date;
}
