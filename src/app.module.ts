import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { PatientModule } from './modules/patient/patient.module';
import { AuthModule } from './modules/auth/auth.module';
import { DoctorModule } from './modules/doctor/doctor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['src/configs/.api-secret.env'],
    }),
    TypeOrmModule.forRoot(),
    UserModule,
    PatientModule,
    AuthModule,
    DoctorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
