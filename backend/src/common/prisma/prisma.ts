import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../prisma/prisma/client";
import { Module } from "@nestjs/common";
import { PRISMA_CLIENT } from "./prisma.constant";

const connectionString = `${process.env.DATABASE_URL}`;

@Module({
  imports: [],
  providers: [
    {
      provide: PRISMA_CLIENT,
      useFactory: () => {
        const adapter = new PrismaPg({ connectionString });
        const prisma = new PrismaClient({ adapter });
        return prisma;
      },
    },
  ],
  exports: [PRISMA_CLIENT],
})
export class PrismaModule {}
