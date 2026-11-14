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

  @Column({
    type: 'simple-enum',
    enum: UserRole,
    default: UserRole.PROTESTER,
  })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;
}
