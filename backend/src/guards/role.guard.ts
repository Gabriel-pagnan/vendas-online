import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserType } from '../user/enums/enum.type';
import { ROLES_KEY } from '../decorators/role.decorator';
import { JwtService } from '@nestjs/jwt';
import { LoginPayload } from '../auth/dtos/loginPayload.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]);

    if (!roles) {
      return true;
    }
    const { authorization } = context.switchToHttp().getRequest().headers;

    const loginPayload: LoginPayload | undefined =
      await this.jwtService.verifyAsync((authorization ?? '').split(' ')[1], {
        secret: process.env.JWT_SECRET
      }).catch(() => undefined)    

    if (!loginPayload) return false

    return roles.some((role) => role === loginPayload.typeUser);
  }
}
