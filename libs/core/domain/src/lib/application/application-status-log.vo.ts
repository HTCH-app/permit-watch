import { Fail, IResult, Ok, ValueObject } from 'types-ddd';
import { ApplicationStatusUpdate } from './application-status-update.en';

export interface ApplicationStatusLogProps {
  entries: Set<ApplicationStatusUpdate>;
}

export class ApplicationStatusLog extends ValueObject<ApplicationStatusLogProps> {
  private constructor(props: ApplicationStatusLogProps) {
    super(props);
  }

  public static override create(
    props: ApplicationStatusLogProps
  ): IResult<ApplicationStatusLog> {
    if (!this.isValidProps(props)) return Fail('Cannot be empty');
    const statusLog = new ApplicationStatusLog(props);
    return Ok(statusLog);
  }

  public static override isValidProps({
    entries,
  }: ApplicationStatusLogProps): boolean {
    const { number } = this.validator;
    return number(entries.size).isGreaterThan(0);
  }

  public static createWithDefaults(props?: Partial<ApplicationStatusLogProps>) {
    const defaultStatusUpdate =
      ApplicationStatusUpdate.createWithDefaults().value();

    const propsWithDefaults: ApplicationStatusLogProps = {
      entries: new Set([defaultStatusUpdate]),
      ...props,
    };
    return this.create(propsWithDefaults);
  }

  public latest(): ApplicationStatusUpdate {
    return [...this.props.entries].pop()!;
  }
}
