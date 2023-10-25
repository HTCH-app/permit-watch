import { User, UserServiceTrait } from '@permit-watch/domain';
import { IResult, Logger, Ok } from 'types-ddd';

export class FakeUserService implements UserServiceTrait {
  async registerUser(user: User): Promise<IResult<void>> {
    Logger.info('Fake note application…');
    Logger.info(JSON.stringify(user.toObject(), undefined, 2));
    return Ok();
  }
}
