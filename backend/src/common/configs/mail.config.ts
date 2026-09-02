import { registerAs } from "@nestjs/config";

export default registerAs(
  "mail",
  (): Record<string, any> => ({
    user: process.env["MAIL_USER"], // the email you used to create app password
    secret: process.env["MAIL_SECRET"],
  }),
);
