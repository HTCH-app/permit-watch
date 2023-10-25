import { Fail, ID, IResult, IUseCase, Logger, Ok } from 'types-ddd';
import { CreateApplicationUseCaseDTO } from './create-application.uc.dto';
import { CreateApplicationUseCaseDeps } from './create-application.uc.deps';
import { Application } from '@permit-watch/domain';

export class CreateApplicationUseCase
  implements IUseCase<CreateApplicationUseCaseDTO, Promise<IResult<void>>>
{
  constructor(protected readonly deps: CreateApplicationUseCaseDeps) {}

  async execute(
    data: CreateApplicationUseCaseDTO
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
      return Fail('Failed to save new Application.');
    }
  }
}
