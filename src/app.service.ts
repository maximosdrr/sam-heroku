import { Injectable } from '@nestjs/common';
import { userHelp } from './shared/generate-help/user.help';
import { patientHelp } from './shared/generate-help/patient.help';
import { doctorHelp } from './shared/generate-help/doctor.help';
import { appointmentHelp } from './shared/generate-help/appointment.help';

@Injectable()
export class AppService {
  generateHelpRoutes(): object {
    const helpRoutes = {
      user: 'app/help/user',
      patient: 'app/help/patient',
      doctor: 'app/help/doctor',
      appointment: 'app/help/appointment',
    };

    return helpRoutes;
  }

  generateUserHelp(): object {
    const userRoutes = userHelp();
    return userRoutes;
  }

  generatePatientHelp(): object {
    const patientRoutes = patientHelp();
    return patientRoutes;
  }

  generateDoctorHelp(): object {
    const doctorRoutes = doctorHelp();
    return doctorRoutes;
  }

  generateAppointmentHelp(): object {
    const appointmentRoutes = appointmentHelp();
    return appointmentRoutes;
  }
}
