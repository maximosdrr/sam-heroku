import { Injectable } from '@nestjs/common';
import { userHelp } from './shared/generate-help/user.help';
import { patientHelp } from './shared/generate-help/patient.help';

@Injectable()
export class AppService {
  generateUserHelp(): object {
    const userRoutes = userHelp();
    return userRoutes;
  }

  generatePatientHelp(): object {
    const patientRoutes = patientHelp();
    return patientHelp;
  }
}
