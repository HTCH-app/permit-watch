import { Fail, ID, IResult, IUseCase, Logger, Ok } from 'types-ddd';
import { CreateApplicationDTO } from './create-application.uc.dto';
import { CreateApplicationDeps } from './create-application.uc.deps';
import { Application } from '@permit-watch/domain';

export class CreateApplicationUseCase
  implements IUseCase<CreateApplicationDTO, Promise<IResult<void>>>
{
  constructor(protected readonly deps: CreateApplicationDeps) {}

  async execute(data: CreateApplicationDTO): Promise<Promise<IResult<void>>> {
    const applicationResult = Application.createWithDefaults({
      applicantId: ID.create(),
    });
    if (applicationResult.isFail()) return Fail(applicationResult.error());
    const application = applicationResult.value();
    Logger.info(application.toObject());
    return Ok();
  }
}
