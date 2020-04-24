import * as request from 'supertest';
import { LoginInterface } from '../../../../shared/interfaces/login.interface';
import { CommonTests } from '../../../../shared/tests/e2e-tests.common';

export class CreateDoctorTests {
  app: string;
  validAuthToken: string;
  common: CommonTests;

  constructor() {
    this.common = new CommonTests('doctor');
    this.app = 'http://localhost:3000';
  }

  createDoctorUsingValidData(validAuthToken: string) {
    const validDoctorData = {
      name: 'Doctor 1',
      cmr: Math.random().toString(),
      specialty: 'Speacialty',
    };

    return this.common.validCreation(validAuthToken, validDoctorData);
  }

  createDoctorUsingInvalidData(validAuthToken: string) {
    const invalidDoctorData: object = {
      nameS: '',
      specialty: 12345,
    };

    return this.common.invalidCreation(validAuthToken, invalidDoctorData);
  }

  createADoctorUsingDuplicateCmr(validAuthToken) {
    const doctorWithStaticCmr: object = {
      name: 'Doctor 1',
      cmr: 'some duplicated cmr',
      specialty: 'Speacialty',
    };
    return this.common.invalidCreation(validAuthToken, doctorWithStaticCmr);
  }
}
