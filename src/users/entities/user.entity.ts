import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { UserRole } from '../../common/enums/role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  displayName: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true, select: false })
  passwordHash: string;

  @Column({
    type: 'simple-enum',
    enum: UserRole,
    default: UserRole.PROTESTER,
  })
  role: UserRole;

  @Column({ nullable: true })
  manifestationId: string;

  @CreateDateColumn()
  createdAt: Date;
}
