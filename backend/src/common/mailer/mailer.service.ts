import * as nodemailer from "nodemailer";
import { Injectable } from "@nestjs/common";
import { DebuggerService } from "../debugger/debugger.service";
import { AbstractMailerService } from "./abstract/mailer.abstract.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MailerService extends AbstractMailerService {
  constructor(
    private readonly debuggerService: DebuggerService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async sendMail(
    recepient: string,
    message: string,
    mailSubject: string,
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 587, //465,
      secure: true,
      auth: {
        user: this.configService.get<string>("mail.user", "random@gmail.com"), // the email you used to create app password
        pass: this.configService.get<string>("mail.secret", "randomsecret"), // your generated app password
      },
    });

    const mailOptions = {
      from: this.configService.get<string>("mail.user", "random@gmail.com"), // the email captured from the form
      to: recepient, // the email you want to receive emails
      subject: mailSubject, // the subject captured
      text: message, // the message captured
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw error("Error sending email: ", error);
      } else {
        this.debuggerService.log("Email sent: ", info.response);
      }
    });
  }
}
