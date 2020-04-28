import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  providers: [MailService],
  controllers: [],
})
export class MyMailerModule {}
