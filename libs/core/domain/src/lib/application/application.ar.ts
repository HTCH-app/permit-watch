import { Aggregate, IResult, Ok, UID } from 'types-ddd';
import { ApplicationStatusLog } from './application-status-log.vo';
import { ApplicationStatusUpdate } from './application-status-update.en';

export interface ApplicationProps {
  id?: UID;
  statusLog: ApplicationStatusLog;
}

export class Application extends Aggregate<ApplicationProps> {
  private constructor(props: ApplicationProps) {
    super(props);
  }

  public static override create(props: ApplicationProps): IResult<Application> {
    const application = new Application(props);
    return Ok(application);
  }

  public static createWithDefaults(props?: Partial<ApplicationProps>) {
    const propsWithDefaults: ApplicationProps = {
      statusLog: ApplicationStatusLog.createWithDefaults().value(),
      ...props,
    };
    return this.create(propsWithDefaults);
  }

  get statusUpdates(): ApplicationStatusLog {
    return this.props.statusLog;
  }

  public latestStatusUpdate(): ApplicationStatusUpdate {
    return this.statusUpdates.latest();
  }
}
