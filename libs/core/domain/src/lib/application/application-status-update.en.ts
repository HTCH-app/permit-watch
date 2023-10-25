import { Entity, Fail, IResult, Ok } from 'types-ddd';
import { z } from 'zod';

export const ApplicationStatusUpdateSchema = z.discriminatedUnion('status', [
  z.object({
    id: z.string().optional(),
    status: z.literal('submitted'),
    when: z.date().refine((date) => date <= new Date(), {
      message: `Wait, you can't have submitted this Application in the future.`,
    }),
  }),
]);

export type ApplicationStatusUpdateProps = z.infer<
  typeof ApplicationStatusUpdateSchema
>;

export class ApplicationStatusUpdate extends Entity<ApplicationStatusUpdateProps> {
  private constructor(props: ApplicationStatusUpdateProps) {
    super(props);
  }

  public isValidProps(props: ApplicationStatusUpdateProps): boolean {
    return ApplicationStatusUpdateSchema.safeParse(props).success;
  }

  public static override create(
    props: ApplicationStatusUpdateProps
  ): IResult<ApplicationStatusUpdate> {
    const validator = ApplicationStatusUpdateSchema.safeParse(props);
    if (!validator.success) {
      return Fail(validator.error.issues.pop()?.message ?? 'Unknown error');
    }

    const statusUpdate = new ApplicationStatusUpdate(props);
    return Ok(statusUpdate);
  }

  public static createWithDefaults(
    props?: Partial<ApplicationStatusUpdateProps>
  ) {
    const propsWithDefaults: ApplicationStatusUpdateProps = {
      status: 'submitted',
      when: new Date(),
      ...props,
    };
    return this.create(propsWithDefaults);
  }
}
