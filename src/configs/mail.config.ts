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
        user: 'hephaestus.sam.mailer@gmail.com',
        pass: 'jH62mg21-dr',
      },
    },
    defaults: {
      from: 'hephaestus.sam.mailer@gmail.com',
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
