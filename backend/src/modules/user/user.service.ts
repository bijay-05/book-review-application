import { PRISMA_CLIENT } from "src/common/prisma/prisma.constant";
import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaClient } from "prisma/prisma/internal/class";
import { ICreateUser } from "./interfaces/user.interface";
import { User } from "prisma/prisma/client";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UserService {
  constructor(
    @Inject(PRISMA_CLIENT)
    private readonly prismaClient: PrismaClient,
  ) {}

  async create(createDto: ICreateUser): Promise<Partial<User>> {
    await this.checkExistingUserWithEmail(createDto.email);

    const hashedPassword = await bcrypt.hash(createDto.password, 10);

    const createdUser = await this.prismaClient.user.create({
      data: {
        email: createDto.email,
        name: createDto.name,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return createdUser;
  }

  async getById(id: number): Promise<Partial<User>> {
    const user = await this.prismaClient.user.findFirst({
      where: {
        id: id,
      },
      select: {
        password: false,
      },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async checkExistingUserWithEmail(email: string): Promise<void> {
    const existingUser = await this.prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      throw new BadRequestException("Email already taken");
    }
  }
}
