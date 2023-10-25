import {
  AddApplicationStatusUpdateUseCase,
  CreateApplicationUseCase,
  SignUpUserUseCase,
} from '@permit-watch/application';
import { InMemoryApplicationRepository } from './db/in-memory-application-repo';
import { FakeUserService } from './services/fake-user-service';

const applicationRepo = new InMemoryApplicationRepository();
const userService = new FakeUserService();

export const useCases = {
  createApplicationUseCase: new CreateApplicationUseCase({
    applicationRepo,
  }),
  addStatusUpdateUseCase: new AddApplicationStatusUpdateUseCase({
    applicationRepo,
  }),
  registerUser: new SignUpUserUseCase({
    userService,
  }),
};
