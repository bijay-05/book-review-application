import { registerAs } from "@nestjs/config";
import { seconds } from "../helper/helper";

export default registerAs(
  "helper",
  (): Record<string, any> => ({
    salt: {
      length: 8,
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
    },
    maxPasswordRequest: process.env.PASSWORD_MAX_REQUEST_LIMIT || 10,
  }),
);
