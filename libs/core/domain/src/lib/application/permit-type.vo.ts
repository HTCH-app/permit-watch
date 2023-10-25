import { Fail, IResult, Ok, ValueObject } from 'types-ddd';
import { z } from 'zod';

export const PermitTypeSchema = z.discriminatedUnion('label', [
  z.object({
    label: z.literal('building'),
  }),
  z.object({
    label: z.literal('warehouse'),
  }),
]);

export type PermitTypeProps = z.infer<typeof PermitTypeSchema>;

export class PermitType extends ValueObject<PermitTypeProps> {
  private constructor(props: PermitTypeProps) {
    super(props);
  }

  public isValidProps(props: PermitTypeProps): boolean {
    return PermitTypeSchema.safeParse(props).success;
  }

  public static override create(props: PermitTypeProps): IResult<PermitType> {
    const validator = PermitTypeSchema.safeParse(props);
    if (!validator.success) {
      return Fail(validator.error.issues.pop()?.message ?? 'Unknown error');
    }

    const statusLog = new PermitType(props);
    return Ok(statusLog);
  }

  public static createWithDefaults(props?: Partial<PermitTypeProps>) {
    const propsWithDefaults: PermitTypeProps = {
      label: 'building',
      ...props,
    };
    return this.create(propsWithDefaults);
  }
}
