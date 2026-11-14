import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum ReportStatus {
  PENDING_REVIEW = 'pending_review',
  VERIFIED = 'verified',
  DISMISSED = 'dismissed',
}

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  userId: string;

  @Column('float')
  lat: number;

  @Column('float')
  lng: number;

  /**
   * 1 = Pacific / Safe
   * 5 = High Danger / Urgence
   */
  @Column('int')
  dangerLevel: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  photoUrl: string;

  @Column({
    type: 'simple-enum',
    enum: ReportStatus,
    default: ReportStatus.PENDING_REVIEW,
  })
  status: ReportStatus;

  @CreateDateColumn()
  createdAt: Date;
}
