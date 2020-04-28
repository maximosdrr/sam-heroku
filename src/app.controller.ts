import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(@Inject(AppService) private readonly appService: AppService) {}
  @Get('help/user')
  getUserHelp(): object {
    return this.appService.generateUserHelp();
  }

  @Get('help/patient')
  getPatientHelp(): object {
    return this.appService.generatePatientHelp();
  }
}
