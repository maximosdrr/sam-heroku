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
  };
  return patientRoutes;
};
