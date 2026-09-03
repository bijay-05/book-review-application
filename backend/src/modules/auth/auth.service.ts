import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { IUserLogin } from "./interfaces/login.interface";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserService } from "../user/user.service";
import { KeyValueRedisService } from "src/common/key-value/services/key-value.redis.service";
import { MailQueueService } from "src/common/bull-queue/mail-queue/mail-queue.service";

@Injectable()
export class AuthenticationService {
  private readonly accessTokenSecretKey: string;
  private readonly accessTokenExpirationTime: number;
  private readonly emailVerificationTokenSecretKey: string;
  private readonly emailVerificationExpirationTime: number;
  private readonly frontendBaseUrl: string;
  constructor(
    private readonly userService: UserService,
    private readonly _jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly keyValueRedisService: KeyValueRedisService,
    private readonly _mailQueue: MailQueueService,
  ) {
    this.accessTokenSecretKey = this.configService.get<string>(
      "auth.accessToken.secretKey",
      "",
    );
    this.accessTokenExpirationTime = this.configService.get<number>(
      "auth.accessToken.expirationTime",
      0,
    );

    this.emailVerificationTokenSecretKey = this.configService.get<string>(
      "auth.verificationEmail.secretKey",
      "",
    );

    this.emailVerificationExpirationTime = this.configService.get<number>(
      "auth.verificationEmail.expirationTime",
      120,
    );

    this.frontendBaseUrl = this.configService.get<string>(
      "auth.frontendBaseUrl",
      "http://localhost:3000",
    );
  }

  async login(loginData: IUserLogin) {
    const user = await this.userService.getByEmail(loginData.email);

    if (!user) {
      throw new NotFoundException("Email or password doesn't match::looks");
    }

    const doesPasswordMatch = await bcrypt.compare(
      loginData.password,
      user.password,
    );

    if (!doesPasswordMatch) {
      throw new NotFoundException("Email or password doesn't match");
    }

    const accessToken = this._jwtService.sign(
      {
        id: user.id,
      },
      {
        secret: this.accessTokenSecretKey,
        expiresIn: this.accessTokenExpirationTime,
      },
    );

    return { accessToken };
  }

  async forgotPassword(email: string) {
    const existingUser = await this.userService.getByEmail(email);

    if (!existingUser) {
      throw new NotFoundException("User not found");
    }

    // send forgot password verification
    this.sendForgotPasswordVerification(existingUser.id, existingUser.email);

    return;
  }

  async sendForgotPasswordVerification(userId: number, email: string) {
    const token = await this._generateVerificationToken(userId);

    const key = this.keyValueRedisService.generateKey({
      module: AuthenticationService.name,
      identifier: `${userId}` + "_" + email.toLowerCase(),
    });

    this.keyValueRedisService.set(key, token, {
      expirationSeconds: this.emailVerificationExpirationTime,
    });

    this._mailQueue.sendMail({
      recepient: email,
      mailSubject: "Forgot Password Reset Link",
      message: `Please visit this link to change your password: ${this.frontendBaseUrl}/reset-password/token/${token}/email/${email}/`,
    });
  }

  async resetPassword(incomingData: {
    password: string;
    token: string;
    email: string;
  }) {
    const existingUser = await this.userService.getByEmail(incomingData.email);

    await this.checkRedisToken(incomingData.token, {
      module: AuthenticationService.name,
      identifier: `${existingUser.id}` + "_" + incomingData.email.toLowerCase(),
    });

    const hashedPassword = await bcrypt.hash(incomingData.password, 10);

    await this.userService.changePassword(existingUser.id, hashedPassword);

    return "Changed Successfully";
  }

  private async _generateVerificationToken(id: number) {
    const token = this._jwtService.sign(
      { id: id },
      {
        secret: this.emailVerificationTokenSecretKey,
        expiresIn: this.emailVerificationExpirationTime,
      },
    );

    return token;
  }

  async checkRedisToken(
    token: string,
    redisKey: { module: string; identifier: string },
  ) {
    const key = this.keyValueRedisService.generateKey(redisKey);

    const verificationData = await this.keyValueRedisService.get(key);
    if (!verificationData) {
      throw new BadRequestException("Link Expired");
    }

    if (verificationData !== token) {
      throw new BadRequestException("Token not matched");
    }

    await this.keyValueRedisService.removeKey(key);
  }
}
