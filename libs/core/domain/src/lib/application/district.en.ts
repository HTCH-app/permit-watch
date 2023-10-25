import { Entity, Fail, IResult, Ok } from 'types-ddd';
import { z } from 'zod';

interface DistrictDatum {
  'district-th': string;
  'province-th': string;
  'district-en': string;
  'province-en': string;
}
type Tuple<T extends string> = [T, ...T[]];

const districtData = require('./districts-data.json') as Array<DistrictDatum>;

const DistrictSchema = z.object({
  name: z.enum(districtData.map((d) => d['district-th']) as Tuple<string>),
});

export type DistrictProps = z.infer<typeof DistrictSchema>;

export class District extends Entity<DistrictProps> {
  public static districtData = districtData;

  private constructor(props: DistrictProps) {
    super(props);
  }

  public isValidProps(props: DistrictProps): boolean {
    return DistrictSchema.safeParse(props).success;
  }

  public static override create(props: DistrictProps): IResult<District> {
    const validator = DistrictSchema.safeParse(props);
    if (!validator.success) {
      return Fail(validator.error.issues.pop()?.message ?? 'Unknown error');
    }

    const statusUpdate = new District(props);
    return Ok(statusUpdate);
  }

  get province(): string {
    const districtNameInThai = this.props.name;
    return (
      District.districtData.find(
        (district) => district['district-th'] === districtNameInThai
      )?.['province-th'] ?? '???'
    );
  }
}
