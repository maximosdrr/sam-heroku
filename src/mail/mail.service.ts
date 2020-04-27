import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailInterface } from './interfaces/mail.interface';
import { confirmationEmail } from './templates/confirmation.mail';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(data: MailInterface): Promise<object> {
    return await this.mailerService
      .sendMail({
        to: data.to,
        from: 'hephaestus.sam.mailer@gmail.com',
        subject: data.subject,
        text: data.text,
        html: data.html,
      })
      .catch(erro => {
        throw new HttpException(erro, HttpStatus.BAD_REQUEST);
      });
  }

  async sendConfirmationEmail(
    destination: string,
    id: string,
  ): Promise<object> {
    const email: MailInterface = confirmationEmail(destination, id);
    return await this.mailerService.sendMail(email).catch(erro => {
      throw new HttpException(erro, HttpStatus.BAD_REQUEST);
    });
  }
}
