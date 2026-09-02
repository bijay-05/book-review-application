export abstract class AbstractMailerService {
  abstract sendMail(
    recepient: string,
    message: string,
    mailSubject: string,
  ): Promise<any>;
}
