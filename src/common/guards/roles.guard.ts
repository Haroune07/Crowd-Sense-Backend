import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { ManifestationRole } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<ManifestationRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // TODO: Verify user's ManifestationMember role (organizer | manifester) for the target manifestationId
    const request = context.switchToHttp().getRequest();
    const roleHeader = request.headers['x-user-role'] as
      | ManifestationRole
      | undefined;
    return roleHeader ? requiredRoles.includes(roleHeader) : true;
  }
}
