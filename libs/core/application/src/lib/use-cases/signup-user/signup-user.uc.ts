import {
  EmailValueObject,
  Fail,
  IResult,
  IUseCase,
  Logger,
  Ok,
} from 'types-ddd';
import { SignupUserUseCaseDeps } from './signup-user.uc.deps';
import { SignupUserUseCaseDTO } from './signup-user.uc.dto';
import { User } from '@permit-watch/domain';

export class SignUpUserUseCase
  implements IUseCase<SignupUserUseCaseDTO, Promise<IResult<void>>>
{
  constructor(protected readonly deps: SignupUserUseCaseDeps) {}

  async execute(data: SignupUserUseCaseDTO): Promise<Promise<IResult<void>>> {
    const user = User.createWithDefaults({
      email: EmailValueObject.create('test@email.com').value(),
    }).value();

    try {
      const saveResult = await this.deps.userService.registerUser(user);
      if (saveResult.isFail()) return Fail(saveResult.error());
      return Ok();
    } catch (error) {
      Logger.error(JSON.stringify(error, null, 2));
      return Fail('Failed to Sign up user.');
    }
  }
}
