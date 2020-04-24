import { CommonTests } from '../../../../shared/tests/e2e-tests.common';

export class FindDoctorTests {
  app: string;
  common: CommonTests;
  constructor() {
    this.common = new CommonTests('doctor');
    this.app = 'http://localhost:3000';
  }

  validFindDoctorById(validAuthToken: string) {
    const doctor = {
      name: 'Doctor 1',
      cmr: Math.random().toString(),
      specialty: 'Speacialty',
    };

    return this.common.validFindSomeOneById(validAuthToken, doctor);
  }

  invalidFindDoctorById(validAuthToken: string) {
    return this.common.invalidFindSomeOneById(validAuthToken);
  }

  validFindAllDoctors(validAuthToken: string) {
    return this.common.validFindAll(validAuthToken);
  }

  invalidFindAllDoctors(validAuthToken: string) {
    return this.common.invalidFindAll(validAuthToken);
  }
}
