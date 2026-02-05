import {
  applyDecorators,
  createParamDecorator,
  UseGuards,
} from "@nestjs/common";
// import { ApiBearerAuth } from '@nestjs/swagger';
import { PutUserGuard } from "../guards/put-user.guard";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";

export function UserProtected() {
  const decorators: any[] = [JwtAuthGuard, PutUserGuard];

  return applyDecorators(UseGuards(...decorators));
}

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContextHost) => {
    const request = ctx.switchToHttp().getRequest();

    return request.__user;
  },
);

export const GetActiveTenant = createParamDecorator(
  (data: unknown, ctx: ExecutionContextHost) => {
    const request = ctx.switchToHttp().getRequest();

    return request.__tenant;
  },
);
