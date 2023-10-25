import { Fail, ID, IResult, IUseCase, Logger, Ok } from 'types-ddd';
import { Application } from '@permit-watch/domain';
import { AddApplicationStatusUpdateUseCaseDeps } from './add-application-status-update.uc.deps';
import { AddApplicationStatusUpdateUseCaseDTO } from './add-application-status-update.uc.dto';

export class AddApplicationStatusUpdateUseCase
  implements
    IUseCase<AddApplicationStatusUpdateUseCaseDTO, Promise<IResult<void>>>
{
  constructor(protected readonly deps: AddApplicationStatusUpdateUseCaseDeps) {}

  async execute(
    data: AddApplicationStatusUpdateUseCaseDTO
  ): Promise<Promise<IResult<void>>> {
    const applicationResult = Application.createWithDefaults({
      applicantId: ID.create(),
    });
    if (applicationResult.isFail()) return Fail(applicationResult.error());
    const application = applicationResult.value();

    try {
      const saveResult = await this.deps.applicationRepo.save(application);
      if (saveResult.isFail()) return Fail(saveResult.error());
      return Ok();
    } catch (error) {
      Logger.error(JSON.stringify(error, null, 2));
      return Fail('Failed to add application status update.');
    }
  }
}
