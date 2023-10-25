import { describe } from 'vitest';
import { ApplicationStatusLog } from './application-status-log.vo';

describe('VO: ApplicationStatusLog', () => {
  let log: ApplicationStatusLog;
  beforeEach(() => {
    log = ApplicationStatusLog.createWithDefaults().value();
  });

  it('can create with defaults', () => {
    const result = ApplicationStatusLog.createWithDefaults();
    expect(result.isOk()).toBeTruthy();
  });

  it('knows latest', () => {
    const latest = log.latest();
    expect(latest).toBeDefined();
  });

  it('cannot be created empty', () => {
    const result = ApplicationStatusLog.createWithDefaults({
      entries: new Set(),
    });
    expect(result.isFail()).toBeTruthy();
  });
});
