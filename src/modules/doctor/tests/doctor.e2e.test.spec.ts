import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Doctor } from '../../Doctor/entitys/Doctor.entity';
import { Repository } from 'typeorm/repository/Repository';
import { DoctorService } from '../../doctor/doctor.service';
import { User } from '../../user/entitys/user.entity';
import { UserService } from '../../user/user.service';
import { CommonTests } from '../../../shared/tests/e2e-tests.common';
import { DoctorTests } from './common-tests/doctor-test';

describe('Doctor Controller E2E Testing', () => {
  const common = new CommonTests('same');
  const doctorTests = new DoctorTests();

  let validAuthToken: string;
  let doctorRepository: Repository<Doctor>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorService,
        { provide: getRepositoryToken(Doctor), useClass: Repository },
        UserService,
        { provide: getRepositoryToken(User), useClass: Repository },
      ],
    }).compile();

    doctorRepository = module.get<Repository<Doctor>>(
      getRepositoryToken(Doctor),
    );
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    validAuthToken = await common.userLogin();
  });

  it('Verify if AuthToken is defined', () => {
    expect(validAuthToken).toBeDefined();
  });

  it('Create doctor using valid data', () => {
    //IF ALL TESTS PASS THIS DOCTOR WILL BE DELETED
    return doctorTests.createDoctorUsingValidData(validAuthToken);
  });

  it('Create doctor using invalid data', () => {
    return doctorTests.createDoctorUsingInvalidData(validAuthToken);
  });

  it('Create doctor using duplicated CMR', () => {
    //IF YOUR RUNING THIS TEST FOR FIRST TIME ERRO AS EXPECTED BECAUSE NO DATA HAS PROVIDED
    return doctorTests.createADoctorUsingDuplicateCmr(validAuthToken);
  });

  it('Delete doctor using valid ID', () => {
    return doctorTests.deleteDoctorUsingValidId(validAuthToken);
  });

  it('Delete doctor using invalid ID', () => {
    return doctorTests.deleteDoctorUsingInvalidId(validAuthToken);
  });

  it('Find doctor using valid ID', () => {
    return doctorTests.validFindDoctorById(validAuthToken);
  });

  it('Find doctor using invalid ID', () => {
    return doctorTests.invalidFindDoctorById(validAuthToken);
  });

  it('Find all doctors', () => {
    return doctorTests.validFindAllDoctors(validAuthToken);
  });

  it('Invalid find all doctors', () => {
    return doctorTests.invalidFindAllDoctors(validAuthToken);
  });

  it('Valid update doctor', () => {
    return doctorTests.validUpdateDoctor(validAuthToken);
  });

  it('Invalid id to update some doctor', () => {
    return doctorTests.invalidDoctorIdUpdate(validAuthToken);
  });
});
