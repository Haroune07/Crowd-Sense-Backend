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
  title: string;

  @Column()
  cegep: string;

  @Column('text', { nullable: true })
  description: string;

  /**
   * Token shared via MIO on Omnivox so students can join this manifestation
   */
  @Column({ unique: true })
  joinToken: string;

  @Column()
  createdById: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
