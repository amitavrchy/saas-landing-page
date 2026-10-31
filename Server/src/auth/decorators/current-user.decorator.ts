import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUser => {
    const req = ctx.switchToHttp().getRequest<{ user: AuthUser }>();
    return req.user;
  },
);