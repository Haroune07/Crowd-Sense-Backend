import { SetMetadata } from '@nestjs/common';
import { ManifestationRole } from '../enums/role.enum';

export const ROLES_KEY = 'manifestation_roles';
export const Roles = (...roles: ManifestationRole[]) =>
  SetMetadata(ROLES_KEY, roles);
