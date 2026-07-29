import { describe, expect, it, vi } from 'vitest';

import { AppController } from '#/app/app.controller.js';
import { AppService } from '#/app/app.service.js';

describe('AppController', () => {
  it('returns the greeting', () => {
    const getHello = vi.fn<AppService['getHello']>(() => 'Hello World!');
    const appService: AppService = { getHello };
    const controller = new AppController(appService);

    expect(controller.getHello()).toBe('Hello World!');
    expect(getHello).toHaveBeenCalledOnce();
  });
});
