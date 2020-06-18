import { Test, TestingModule } from '@nestjs/testing';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Patient } from '../../Patient/entitys/Patient.entity';
import { Repository } from 'typeorm/repository/Repository';
import { User } from '../../user/entitys/user.entity';
import { UserService } from '../../user/user.service';
import { CommonTests } from '../../../shared/tests/e2e-tests.common';
import { PatientTests } from './common-tests/patient-tests';
import { MedicalRecordTests } from './common-tests/medical-record-tests';

describe('Patient Controller E2E Testing', () => {
  const common = new CommonTests('same');
  const patientTests = new PatientTests();
  const medicalRecordTests = new MedicalRecordTests();

  let validAuthToken: string;
  let patientRepository: Repository<Patient>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Patient,
        { provide: getRepositoryToken(Patient), useClass: Repository },
        UserService,
        { provide: getRepositoryToken(User), useClass: Repository },
      ],
    }).compile();

    patientRepository = module.get<Repository<Patient>>(
      getRepositoryToken(Patient),
    );
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    validAuthToken = await common.userLogin();
  });

  it('Verify if AuthToken is defined', () => {
    expect(validAuthToken).toBeDefined();
  });

  it('Try create patient using valid data', () => {
    return patientTests.createPatientUsingValidData(validAuthToken);
  });

  it('Try create patient using invalid data', () => {
    return patientTests.createPatientUsingInvalidData(validAuthToken);
  });

  it('Try create patient using missing data', () => {
    return patientTests.createPatientUsingMissingData(validAuthToken);
  });

  it('Try create medical record using valid data', () => {
    return medicalRecordTests.createMedicalRecordUsingValidData(validAuthToken);
  });

  it('Try create medical record using invalid patient id', () => {
    return medicalRecordTests.createMedicalRecordUsingInvalidId(validAuthToken);
  });

  it('Try delete patient using valid id', () => {
    return patientTests.deletePatientUsingValidId(validAuthToken);
  });

  it('Try delete patient using invalid id', () => {
    return patientTests.deletePatientUsingInvalidId(validAuthToken);
  });

  it('Try find all patients', () => {
    return patientTests.validFindAllPatients(validAuthToken);
  });

  it('Try find one patient', () => {
    return patientTests.validFindPatientById(validAuthToken);
  });

  it('Try find one patient using invalid id', () => {
    return patientTests.invalidFindPatientById(validAuthToken);
  });

  it('Try find all patients without using querys page and limit', () => {
    return patientTests.invalidFindAllPatient(validAuthToken);
  });

  it('Try update a patient', () => {
    return patientTests.validUpdatePatient(validAuthToken);
  });

  it('Try update a patient using invalid id', () => {
    return patientTests.invalidPatientUpdate(validAuthToken);
  });
});
