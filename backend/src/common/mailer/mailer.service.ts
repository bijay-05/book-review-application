import * as nodemailer from "nodemailer";

export class MailerService {
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
        user: process.env["MAIL_USER"], // the email you used to create app password
        pass: process.env["MAIL_SECRET"], // your generated app password
      },
    });

    // Constructing the message with the sender's email included
    // const fullMessage = `Sender's Email: ${sender}\nSubject: Nothing but Subject\n\nMessage:\nNothing but message`;

    // console.log("Full message: ", fullMessage);

    const mailOptions = {
      from: process.env["MAIL_USER"], // the email captured from the form
      to: recepient, // the email you want to receive emails
      subject: mailSubject, // the subject captured
      text: message, // the message captured
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });
  }
}

console.log("This is the console log that never runs");
