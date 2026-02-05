import { User } from "prisma/prisma/client";

export interface IJwtUser {
  id: number;
  tenantToken: string;
}

export interface IUserOnRequest<T = Omit<User, "password">> {
  user: IJwtUser;
  __user: T;
  token: string;
}

export interface IAuthUser {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}
