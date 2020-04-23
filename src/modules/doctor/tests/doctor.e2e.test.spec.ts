import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Doctor } from '../../Doctor/entitys/Doctor.entity';
import { Repository } from 'typeorm/repository/Repository';
import { DoctorService } from '../../doctor/doctor.service';
import { User } from '../../user/entitys/user.entity';
import { UserService } from '../../user/user.service';
import { CreateDoctor } from './functions/doctor.test.create';

describe('Doctor Controller E2E Testing', () => {
  const app = 'http://localhost:3000';
  const createDoctorFunctions = new CreateDoctor();
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
    validAuthToken = await createDoctorFunctions.userLogin();
  });

  it('Verify if AuthToken is defined', () => {
    expect(validAuthToken).toBeDefined();
  });

  it('Create a valid doctor', () => {
    return createDoctorFunctions.createDoctorWithRandomCMR(validAuthToken);
  });
});
