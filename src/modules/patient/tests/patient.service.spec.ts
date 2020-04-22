import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../entitys/patient.entity';
import { PatientService } from '../patient.service';
import { MedicalRecord } from '../entitys/medical-record.entity';

describe('Patient Controller', () => {
  let service: PatientService;
  let patientRepository: Repository<Patient>;
  let medicalRecordRepository: Repository<MedicalRecord>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientService,
        { provide: getRepositoryToken(Patient), useClass: Repository },
        { provide: getRepositoryToken(MedicalRecord), useClass: Repository },
      ],
    }).compile();

    service = module.get<PatientService>(PatientService);
    patientRepository = module.get<Repository<Patient>>(
      getRepositoryToken(Patient),
    );
    medicalRecordRepository = module.get<Repository<MedicalRecord>>(
      getRepositoryToken(MedicalRecord),
    );
  });

  it('Verify if controller is defined', () => {
    expect(service).toBeDefined();
    expect(patientRepository).toBeDefined();
    expect(medicalRecordRepository).toBeDefined();
  });
});
