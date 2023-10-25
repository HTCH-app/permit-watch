import { describe } from 'vitest';
import { Application } from './application.ar';

describe('AR: Application', () => {
  it('can create with defaults', () => {
    const result = Application.createWithDefaults();
    expect(result.isOk()).toBeTruthy();
  });

  describe('status log', () => {
    let a1: Application;

    beforeEach(() => {
      a1 = Application.createWithDefaults().value();
    });

    it('has a log', () => {
      const log = a1.statusUpdates;
      expect(log).toBeDefined();
    });

    it('knows the latest entry', () => {
      const status = a1.latestStatusUpdate();
      expect(status).toBeDefined();
    });
  });
});
