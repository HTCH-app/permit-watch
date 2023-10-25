import { describe } from 'vitest';
import { User } from './user.ar';
import { EmailValueObject } from 'types-ddd';

describe('AR: User', () => {
  it('can create with defaults', () => {
    const result = User.createWithDefaults({
      email: EmailValueObject.create('test@email.com').value(),
    });
    expect(result.isOk()).toBeTruthy();
  });
});
