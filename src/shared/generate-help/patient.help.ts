export const patientHelp = () => {
  const patientRoutes = {
    create: {
      route: '/patient/insert',
      auth: true,
      example: {
        name: { type: 'string', required: true },
        healthInsurance: { type: 'string', required: true },
        birthday: { type: 'string', required: true },
        telephone: { type: 'string', required: false },
      },
    },

    update: {
      route: '/patient/update',
      auth: true,
      example: {
        id: { type: 'string', required: true },
        name: { type: 'string', required: false },
        healthInsurance: { type: 'string', required: false },
        telephone: { type: 'string', required: false },
        birthday: { type: 'Date', required: false },
      },
    },

    delete: {
      route: '/patient/delete?id=PatientId',
      auth: true,
      example: {
        undefined: 'Body is not necessary in this request',
      },
    },

    findOne: {
      route: '/patient/findOneById?id=PatientId',
      auth: true,
      example: {
        undefined: 'Body is not necessary in this request',
      },
    },

    findAll: {
      route: '/patient/findAll/?page=0&limit=100',
      auth: true,
      example: {
        undefined: 'Body is not necessary in this request',
      },
    },

    findOneByName: {
      route: '/patient/findPatientByName/?name=PatientName',
      auth: true,
      example: {
        undefined: 'Body is not necessary in this request',
      },
    },

    findPatientByLike: {
      route: 'patient/findPatientLikeName',
      auth: true,
      example: {
        name: 'Patient name',
      },
    },

    total: {
      route: 'patient/total',
      auth: true,
      example: {
        undefined: 'Body is not necessary in this request',
      },
    },

    createMedicalRecord: {
      route: '/patient/medical-record/insert',
      auth: true,
      example: {
        patient: { type: 'string', required: true, obs: 'Patient id' },
        description: { type: 'string', required: false },
      },
    },

    deleteMedicalRecord: {
      route: '/patient/medical-record/delete/?id=MedicalRecordId',
      auth: true,
      example: {
        undefined: 'Body is not necessary in this request',
      },
    },

    updateMedicalRecord: {
      route: '/patient/medical-record/update',
      auth: true,
      example: {
        patient: { type: 'string', required: false, obs: 'Patient id' },
        description: { type: 'string', required: false },
      },
    },
  };

  return patientRoutes;
};
