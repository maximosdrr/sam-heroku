import { HandlebarsAdapter } from '@nestjs-modules/mailer';

export const config = {
  useFactory: () => ({
    transport: {
      host: 'smtp.googlemail.com',
      type: 'OAuth2',
      port: 465,
      ignoreTLS: true,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    },
    defaults: {
      from: process.env.MAIL_SENDER,
    },
    preview: false,
    template: {
      dir: process.cwd() + '/template/',
      adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
      options: {
        strict: true,
      },
    },
  }),
};
