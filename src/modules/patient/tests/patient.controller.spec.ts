import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../entitys/patient.entity';
import { PatientService } from '../patient.service';
import { MedicalRecord } from '../entitys/medical-record.entity';
import { Controller } from '@nestjs/common/interfaces';
import { PatientController } from '../patient.controller';

describe('Patient Controller', () => {
  let controller: Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientService,
        { provide: getRepositoryToken(Patient), useClass: Repository },
        { provide: getRepositoryToken(MedicalRecord), useClass: Repository },
      ],
      controllers: [PatientController],
    }).compile();

    controller = module.get<Controller>(PatientController);
  });

  it('Verify if controller is defined', () => {
    expect(controller).toBeDefined();
  });
});
