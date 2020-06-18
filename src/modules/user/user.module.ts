import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entitys/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from 'src/modules/mail/mail.service';

@Module({
  providers: [UserService, MailService],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService],
})
export class UserModule {}
