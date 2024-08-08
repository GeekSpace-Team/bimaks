import { Body, Controller, Post } from '@nestjs/common';
import { OtherService } from './other.service';
import { SendMailDto } from './dto/send-mail.dto';

@Controller('other')
export class OtherController {
  constructor(private readonly otherService: OtherService) {}

  @Post('send-mail')
  sendMail(@Body() body: SendMailDto) {
    return this.otherService.sendMail(body);
  }
}
