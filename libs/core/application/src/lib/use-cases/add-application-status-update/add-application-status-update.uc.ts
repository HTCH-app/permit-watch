import { Fail, ID, IResult, IUseCase, Logger, Ok } from 'types-ddd';
import { Application } from '@permit-watch/domain';
import { AddApplicationStatusUpdateDeps } from './add-application-status-update.uc.deps';
import { AddApplicationStatusUpdateDTO } from './add-application-status-update.uc.dto';

export class AddApplicationStatusUpdateUseCase
  implements IUseCase<AddApplicationStatusUpdateDTO, Promise<IResult<void>>>
{
  constructor(protected readonly deps: AddApplicationStatusUpdateDeps) {}

  async execute(
    data: AddApplicationStatusUpdateDTO
  ): Promise<Promise<IResult<void>>> {
    const applicationResult = Application.createWithDefaults({
      applicantId: ID.create(),
    });
    if (applicationResult.isFail()) return Fail(applicationResult.error());
    const application = applicationResult.value();
    Logger.info(application.toObject());
    return Ok();
  }
}
