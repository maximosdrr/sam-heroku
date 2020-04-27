import { CommonTests } from '../../../../shared/tests/e2e-tests.common';

export class PatientTests {
  app: string;
  validAuthToken: string;
  common: CommonTests;

  constructor() {
    this.common = new CommonTests('patient');
    this.app = 'http://localhost:3000';
  }

  createPatientUsingValidData(validAuthToken: string) {
    const patient: object = {
      name: 'Any patient name',
      birthday: '2020-04-25 12:59:54',
      healthInsurance: 'Any health insurance',
      telephone: (Math.random() * 1000000000).toString(),
    };
    return this.common.validCreation(validAuthToken, patient);
  }

  createPatientUsingInvalidData(validAuthToken: string) {
    const patient: object = {
      some: 'Invalid',
      invalid: null,
      true: false,
      bool: undefined,
    };

    return this.common.invalidCreation(validAuthToken, patient);
  }

  createPatientUsingMissingData(validAuthToken: string) {
    const patient: object = {
      birthday: '2020-04-25 12:59:54',
      healthInsurance: 'Any health insurance',
    };

    return this.common.invalidCreation(validAuthToken, patient);
  }

  deletePatientUsingValidId(validAuthToken: string) {
    const patient = {
      name: 'Any',
      birthday: '2020-04-25 12:59:54',
      healthInsurance: 'Any',
      telephone: (Math.random() * 1000000000).toString(),
    };
    return this.common.validDelete(validAuthToken, patient);
  }

  deletePatientUsingInvalidId(validAuthToken: string) {
    return this.common.invalidDelete(validAuthToken);
  }

  validFindAllPatients(validAuthToken: string) {
    return this.common.validFindAll(validAuthToken);
  }

  validFindPatientById(validAuthToken: string) {
    const patient = {
      name: 'Patient to find',
      birthday: '2020-04-25 12:59:54',
      healthInsurance: 'Patient to find',
      telephone: Math.random().toString(),
    };
    return this.common.validFindSomeOneById(validAuthToken, patient);
  }

  invalidFindAllPatient(validAuthToken: string) {
    return this.common.invalidFindAll(validAuthToken);
  }

  invalidFindPatientById(validAuthToken: string) {
    return this.common.invalidFindSomeOneById(validAuthToken);
  }

  validUpdatePatient(validAuthToken: string) {
    const patient = {
      name: 'Patient updated',
      birthday: '2020-04-25 12:59:54',
      healthInsurance: 'Patient updated',
      telephone: Math.random().toString(),
    };

    const patientToUpdate = {
      name: 'Patient to find',
      birthday: '2020-04-25 12:59:54',
      healthInsurance: 'Patient to find',
      telephone: Math.random().toString(),
    };

    return this.common.validUpdate(validAuthToken, patient, patientToUpdate);
  }

  invalidPatientUpdate(validAuthToken: string) {
    const patient = {
      id: 'Some invalid id',
      name: 'Patient updated',
      birthday: '2020-04-25 12:59:54',
      healthInsurance: 'Patient updated',
      telephone: Math.random().toString(),
    };
    return this.common.invalidSomeoneIdUpdate(validAuthToken, patient);
  }
}
