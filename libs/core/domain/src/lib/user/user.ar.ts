import {
  Aggregate,
  EmailValueObject,
  IResult,
  Ok,
  UID,
  UserNameValueObject,
} from 'types-ddd';

export interface UserProps {
  id?: UID;
  email: EmailValueObject;
  displayName: UserNameValueObject;
}

export class User extends Aggregate<UserProps> {
  private constructor(props: UserProps) {
    super(props);
  }

  public static override create(props: UserProps): IResult<User> {
    const user = new User(props);
    return Ok(user);
  }

  public static createWithDefaults(
    props: Partial<UserProps> & Pick<UserProps, 'email'>
  ) {
    const displayNameFromEmail = UserNameValueObject.create(
      props.email.getNick()
    ).value();

    const propsWithDefaults: UserProps = {
      displayName: displayNameFromEmail,
      ...props,
    };
    return this.create(propsWithDefaults);
  }
}
