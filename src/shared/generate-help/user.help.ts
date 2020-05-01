export const userHelp = () => {
  const userRoutes = {
    createUser: {
      route: '/user/insert',
      auth: false,
      example: {
        username: { type: 'string', required: true },
        password: { type: 'string', required: true },
        name: { type: 'string', required: true },
        email: { type: 'string', required: true },
        accessLevel: { type: 'int', required: true },
      },
    },
    login: {
      route: '/auth/login',
      auth: false,
      example: {
        username: { type: 'string', required: true },
        password: { type: 'string', required: true },
      },
    },
    update: {
      route: 'user/update',
      auth: true,
      example: {
        id: { type: 'string', required: true },
        name: { type: 'string', required: false },
      },
    },

    delete: {
      route: 'user/delete/?id=Userid',
      auth: true,
      example: {
        undefined: 'Body is not necessary in this request',
      },
    },

    updatePassword: {
      route: 'user/changePassword',
      auth: true,
      example: {
        data: {
          oldPassword: { type: 'string', required: true },
          newPassword: { type: 'string', required: true },
        },
      },
    },

    changeEmail: {
      route: 'user/changeEmail',
      auth: true,
      example: {
        email: { type: 'string', required: true },
      },
    },

    getProfile: {
      route: 'user/getProfile',
      auth: true,
      example: {
        undefined: 'Body is not necessary in this request',
      },
    },
  };

  return userRoutes;
};
