import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { PatientModule } from './modules/patient/patient.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['src/config/.api.secret.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(),
    UserModule,
    PatientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
