import { MailInterface } from '../interfaces/mail.interface';
import { generateSucessConfirmationEmail } from 'src/shared/html/confirmation.email';
export const confirmationEmail = (
  destination: string,
  id: string,
  username: string,
) => {
  const mail: MailInterface = {
    to: destination,
    from: 'hephaestus.sam.mailer@gmail.com',
    subject: 'Email de confirmação do Sistema de Agendamento Medico (S.A.M)',
    text: 'Email de confirmação (S.A.M)',
    html: generateSucessConfirmationEmail(
      `${process.env.ROOT}/user/confirmationEmail/?id=${id}`,
      username,
      process.env.SAM_HOME,
      process.env.HEPHAESTHUS_SITE,
      process.env.HEPHAESTHUS_LOGO,
    ),
  };
  return mail;
};
