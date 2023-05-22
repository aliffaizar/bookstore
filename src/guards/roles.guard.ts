import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/types/user.type';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());

    if (request?.user?.role) {
      return roles.includes(request.user.role);
    }
    return false;
  }
}
