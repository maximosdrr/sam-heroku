import { CommonTests } from '../../../../shared/tests/e2e-tests.common';

export class UpdateDoctorTests {
  app: string;
  common: CommonTests;

  constructor() {
    this.common = new CommonTests('doctor');
    this.app = 'http://localhost:3000';
  }

  validUpdateDoctor(validAuthToken: string) {
    const doctorToUpdate = {
      name: 'Doutor inserido pelo update',
      cmr: Math.random().toString(),
      specialty: 'Speacialty',
    };

    const newData = {
      name: 'Doctor updated',
      cmr: `Updated CMR: ${Math.random().toString()}`,
      specialty: 'Updated Specialty',
    };

    return this.common.validUpdate(validAuthToken, newData, doctorToUpdate);
  }

  invalidDoctorIdUpdate(validAuthToken: string) {
    const data = {
      id: 'Invalid id provided',
      name: 'Doctor updated',
      cmr: `Updated CMR: ${Math.random().toString()}`,
      specialty: 'Updated Specialty',
    };

    return this.common.invalidSomeoneIdUpdate(validAuthToken, data);
  }
}
