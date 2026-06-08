import { registerAs } from "@nestjs/config";
import { seconds } from "../helper/helper";
import { StringValue } from "ms";

export default registerAs(
  "auth",
  (): Record<string, any> => ({
    accessToken: {
      secretKey: process.env.AUTH_JWT_ACCESS_TOKEN_SECRET_KEY,
      expirationTime: seconds(
        (process.env.AUTH_JWT_ACCESS_TOKEN_EXPIRED || "8h") as StringValue,
      ),
      // notBeforeExpirationTime: seconds("0"),
    },

    prefixAuthorization: "Bearer",

    password: {
      attempt: true,
      maxAttempt: 5,
      saltLength: 8,
    },

    verificationEmail: {
      secretKey: process.env.EMAIL_VERIFICATION_TOKEN_SECRET_KEY,
      expirationTime: Number(
        process.env.EMAIL_VERIFICATION_TOKEN_EXPIRED_IN_SECONDS,
      ),
    },
    frontEndBaseUrl: process.env.FRONT_END_BASE_URL,
  }),
);
