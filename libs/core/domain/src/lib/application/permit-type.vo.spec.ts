import { describe } from 'vitest';
import { PermitType } from './permit-type.vo';

describe('VO: PermitType', () => {
  let log: PermitType;
  beforeEach(() => {
    log = PermitType.createWithDefaults().value();
  });

  it('creates building by default', () => {
    const buildingPermitType = PermitType.create({
      label: 'building',
    }).value();

    const result = PermitType.createWithDefaults();
    const permit = result.value();

    expect(result.isOk()).toBeTruthy();
    expect(permit.isEqual(buildingPermitType)).toBeTruthy();
  });

  it('fails with unrecognise type', () => {
    const unrecognisePermitTypeResult = PermitType.create({
      label: 'nothing' as any,
    });
    expect(unrecognisePermitTypeResult.isOk()).toBeFalsy();
  });
});
