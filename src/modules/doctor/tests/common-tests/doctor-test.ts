import { CommonTests } from '../../../../shared/tests/e2e-tests.common';

export class DoctorTests {
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
    this.common.validCreation(validAuthToken, doctorWithStaticCmr);
    return this.common.invalidCreation(validAuthToken, doctorWithStaticCmr);
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
