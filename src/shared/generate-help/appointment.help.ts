export const appointmentHelp = () => {
  const appointmentRoutes = {
    create: {
      route: 'appointment/insert',
      auth: true,
      example: {
        date: { type: 'date', required: true },
        description: { type: 'string', required: false },
        patient: { type: 'string', required: true, obs: 'PatientId' },
        doctor: { type: 'string', required: true, obs: 'DoctorId' },
        user: { type: 'string', required: true, obs: 'UserId' },
      },
    },

    delete: {
      route: 'appointment/delete/?id=AppointmentId',
      auth: true,
      example: {
        undefined: 'Body is not necessary in this request',
      },
    },

    update: {
      route: 'appointment/update',
      auth: true,
      example: {
        id: { type: 'string', required: true },
        date: { type: 'date', required: false },
        description: { type: 'string', required: false },
        doctor: { type: 'string', required: false, obs: 'Doctor id' },
      },
    },

    findOneById: {
      route: 'appointment/findOneById/?id=AppointmentId',
      auth: true,
      example: {
        undefined: 'Body is not necessary in this request',
      },
    },

    findAll: {
      route: 'appointment/findAll/?limit=100&page=0',
      auth: true,
      example: {
        undefined: 'Body is not necessary in this request',
      },
    },
  };
  return appointmentRoutes;
};
