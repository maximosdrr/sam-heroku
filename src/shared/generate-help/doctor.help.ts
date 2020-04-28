export const doctorHelp = () => {
  const doctorRoutes = {
    create: {
      route: 'doctor/insert',
      auth: true,
      example: {
        name: { type: 'string', required: true },
        cmr: { type: 'string', required: true },
        specialty: { type: 'string', required: true },
      },
    },

    delete: {
      route: 'doctor/delete/?id=DoctorId',
      auth: true,
      example: {
        undefined: 'Body is not necessary in this request',
      },
    },

    update: {
      route: 'doctor/update',
      auth: true,
      example: {
        id: { type: 'string', required: true },
        name: { type: 'string', required: false },
        cmr: { type: 'string', required: false },
        specialty: { type: 'string', required: false },
      },
    },

    findOneById: {
      route: 'doctor/findOneById/?id=DoctorId',
      auth: true,
      example: {
        undefined: 'Body is not necessary in this request',
      },
    },

    findAll: {
      route: 'doctor/findAll/?limit=100&page=0',
      auth: true,
      example: {
        undefined: 'Body is not necessary in this request',
      },
    },

    findDoctorByName: {
      route: 'doctor/findDoctorByName/?name=DoctorName',
      auth: true,
      example: {
        undefined: 'Body is not necessary in this request',
      },
    },

    findDoctorByCmr: {
      route: 'doctor/findDoctorByCmr/?cmr=DoctorCmr',
      auth: true,
      example: {
        undefined: 'Body is not necessary in this request',
      },
    },
  };
  return doctorRoutes;
};
