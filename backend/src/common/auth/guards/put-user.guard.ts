import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request as IRequest } from "express";
import { UserService } from "src/modules/user/user.service";
import { IUserOnRequest } from "../interfaces/jwt.interface";
import { User } from "prisma/prisma/client";

@Injectable()
export class PutUserGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const ctx = context.switchToHttp();
      const request = ctx.getRequest<
        IRequest & IUserOnRequest<Omit<User, "password">>
      >();

      const jwtDecodedUser = request.user;

      const userFromDb = await this.userService.getById(jwtDecodedUser.id);

      console.log("Put user guard: ", userFromDb);

      request.__user = userFromDb;

      return true;
    } catch (error) {
      throw error;
    }
  }
}
