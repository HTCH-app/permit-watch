import { describe } from 'vitest';
import { District } from './district.en';

describe('En: District', () => {
  it('can be created', () => {
    const result = District.create({
      name: 'ทวีวัฒนา',
    });
    expect(result.isOk()).toBeTruthy();
  });

  it('knows the district (th)', () => {
    const province = 'กรุงเทพฯ';
    const district = District.create({
      name: 'ทวีวัฒนา',
    }).value();
    expect(district.province).toBe(province);
  });

  it('knows a different district (th)', () => {
    const province = 'นครศรีธรรมราช';
    const district = District.create({
      name: 'ทุ่งใหญ่',
    }).value();
    expect(district.province).toBe(province);
  });
});
