import { IResult, UID } from 'types-ddd';
import { Application } from './application.ar';

export interface ApplicationRepoTrait {
  fetchForId(id: UID): Promise<IResult<Application>>;
  save(application: Application): Promise<IResult<void>>;
}
