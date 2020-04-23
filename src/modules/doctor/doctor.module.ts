import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entitys/doctor.entity';

@Module({
  controllers: [DoctorController],
  providers: [DoctorService],
  imports: [TypeOrmModule.forFeature([Doctor])],
})
export class DoctorModule {}
