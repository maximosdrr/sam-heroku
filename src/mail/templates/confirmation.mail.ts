import { MailInterface } from '../interfaces/mail.interface';
export const confirmationEmail = (destination: string, id: string) => {
  const mail: MailInterface = {
    to: destination,
    from: 'hephaestus.sam.mailer@gmail.com',
    subject: 'Email de confirmação do Sistema de Agendamento Medico (S.A.M)',
    text: 'Email de confirmação (S.A.M)',
    html: `
          <p>
            Por favor clique no link abaixo para confirmar que esse email é mesmo seu
          </p>
          <br>
          <a href="http://localhost:3000/user/confirmationEmail/?id=${id}">Clique aqui para confirmar</a>
          `,
  };
  return mail;
};
