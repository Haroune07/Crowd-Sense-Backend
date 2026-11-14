import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { ManifestationRole } from '../../common/enums/role.enum';

@Entity('manifestation_members')
@Unique(['manifestationId', 'userId'])
export class ManifestationMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  manifestationId: string;

  @Column()
  userId: string;

  @Column({
    type: 'simple-enum',
    enum: ManifestationRole,
    default: ManifestationRole.MANIFESTER,
  })
  role: ManifestationRole;

  @CreateDateColumn()
  joinedAt: Date;
}
