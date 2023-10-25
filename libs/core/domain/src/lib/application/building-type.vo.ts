import { Fail, IResult, Ok, ValueObject } from 'types-ddd';
import { z } from 'zod';

export const BuildingTypeSchema = z.discriminatedUnion('label', [
  z.object({
    label: z.literal('large'),
  }),
  z.object({
    label: z.literal('small'),
  }),
]);

export type BuildingTypeProps = z.infer<typeof BuildingTypeSchema>;

export class BuildingType extends ValueObject<BuildingTypeProps> {
  private constructor(props: BuildingTypeProps) {
    super(props);
  }

  public isValidProps(props: BuildingTypeProps): boolean {
    return BuildingTypeSchema.safeParse(props).success;
  }

  public static override create(
    props: BuildingTypeProps
  ): IResult<BuildingType> {
    const validator = BuildingTypeSchema.safeParse(props);
    if (!validator.success) {
      return Fail(validator.error.issues.pop()?.message ?? 'Unknown error');
    }

    const statusLog = new BuildingType(props);
    return Ok(statusLog);
  }

  public static createWithDefaults(props?: Partial<BuildingTypeProps>) {
    const propsWithDefaults: BuildingTypeProps = {
      label: 'small',
      ...props,
    };
    return this.create(propsWithDefaults);
  }
}
