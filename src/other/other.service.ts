import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendMailDto } from './dto/send-mail.dto';

@Injectable()
export class OtherService {
  constructor(private readonly mailService: MailerService) {}

  async sendMail(req: SendMailDto) {
    console.log('sending...');
    await this.mailService
      .sendMail({
        from: 'app.mail.tm@gmail.com',
        to: `${req.to_mail}`,
        subject: req.subject,
        html: `
        <h4>Ulanyjy ${req.username}, Elektron poçtasy ${req.email}</h4>
        <p>${req.text}</p>
        <h5><i>Sorag-jogap merkezi</i></h5>`,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    return 'success';
  }
}
