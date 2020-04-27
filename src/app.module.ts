import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { PatientModule } from './modules/patient/patient.module';
import { AuthModule } from './modules/auth/auth.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { config } from './configs/mail.config';
import { MyMailerModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/configs/.env',
    }),
    TypeOrmModule.forRoot(),
    UserModule,
    PatientModule,
    AuthModule,
    DoctorModule,
    AppointmentModule,
    MyMailerModule,
    MailerModule.forRootAsync(config),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
