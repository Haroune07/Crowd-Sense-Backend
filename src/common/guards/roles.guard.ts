import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const jwtRole = request.user?.role as UserRole | undefined;
    const headerRole =
      process.env.NODE_ENV !== 'production'
        ? (request.headers['x-user-role'] as UserRole | undefined)
        : undefined;

    const effectiveRole = jwtRole || headerRole;
    if (!effectiveRole) {
      return false;
    }

    return requiredRoles.includes(effectiveRole);
  }
}
