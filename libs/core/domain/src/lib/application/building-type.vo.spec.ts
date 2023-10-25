import { describe } from 'vitest';
import { BuildingType } from './building-type.vo';

describe('VO: BuildingType', () => {
  let log: BuildingType;
  beforeEach(() => {
    log = BuildingType.createWithDefaults().value();
  });

  it('creates building by default', () => {
    const buildingBuildingType = BuildingType.create({
      label: 'small',
    }).value();

    const result = BuildingType.createWithDefaults();
    const Building = result.value();

    expect(result.isOk()).toBeTruthy();
    expect(Building.isEqual(buildingBuildingType)).toBeTruthy();
  });

  it('fails with unrecognise type', () => {
    const unrecogniseBuildingTypeResult = BuildingType.create({
      label: 'nothing' as any,
    });
    expect(unrecogniseBuildingTypeResult.isOk()).toBeFalsy();
  });
});
