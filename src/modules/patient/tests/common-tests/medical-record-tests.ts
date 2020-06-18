import { CommonTests } from '../../../../shared/tests/e2e-tests.common';

export class MedicalRecordTests {
  app: string;
  validAuthToken: string;
  common: CommonTests;
  commonForPatient: CommonTests;

  constructor() {
    this.common = new CommonTests('patient/medical-record');
    this.commonForPatient = new CommonTests('patient');
    this.app = 'http://localhost:3000';
  }

  async createMedicalRecordUsingValidData(validAuthToken: string) {
    const patient: object = {
      name: 'Created by medical record',
      birthday: '01/01/1970',
      healthInsurance: 'Any health insurance',
      telephone: (Math.random() * 1000000000).toString(),
    };

    const patientId: string = await this.commonForPatient.validCreationForActionUsingId(
      validAuthToken,
      patient,
    );

    const medicalRecord: object = {
      patient: patientId,
    };

    return this.common.validCreation(validAuthToken, medicalRecord);
  }

  createMedicalRecordUsingInvalidId(validAuthToken: string) {
    const medicalRecord: object = {
      patient: 'any invalid id',
    };
    return this.common.invalidCreation(validAuthToken, medicalRecord);
  }
}
