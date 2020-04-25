import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entitys/appointment.entity';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService],
  imports: [TypeOrmModule.forFeature([Appointment])],
})
export class AppointmentModule {}
