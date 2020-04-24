import { CommonTests } from '../../../../shared/tests/e2e-tests.common';

export class DeleteDoctorTests {
  app: string;
  common: CommonTests;

  constructor() {
    this.common = new CommonTests('doctor');
    this.app = 'http://localhost:3000';
  }

  deleteDoctorUsingValidId(validAuthToken: string) {
    const doctor = {
      name: 'Same name',
      cmr: Math.random().toString(),
      specialty: 'Same specialty',
    };
    return this.common.validDelete(validAuthToken, doctor);
  }

  deleteDoctorUsingInvalidId(validAuthToken: string) {
    return this.common.invalidDelete(validAuthToken);
  }
}
