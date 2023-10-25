import { IResult } from 'types-ddd';
import { User } from './user.ar';

export interface UserServiceTrait {
  registerUser(user: User): Promise<IResult<void>>;
}
