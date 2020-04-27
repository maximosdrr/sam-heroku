import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { User } from '../entitys/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Controller } from '@nestjs/common/interfaces';
import { UserController } from '../user.controller';
import { Appointment } from '../../appointment/entitys/appointment.entity';
import { AppointmentService } from '../../appointment/appointment.service';

describe('User Controller', () => {
  let controller: Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        AppointmentService,
        { provide: getRepositoryToken(User), useClass: Repository },
        { provide: getRepositoryToken(Appointment), useClass: Repository },
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get<Controller>(UserController);
  });

  it('Verify if controller is defined', () => {
    expect(controller).toBeDefined();
  });
});
