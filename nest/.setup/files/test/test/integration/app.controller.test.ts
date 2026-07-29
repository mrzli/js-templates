import { Test } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { AppController } from '#/app/app.controller.js';
import { AppService } from '#/app/app.service.js';

describe('AppController integration', () => {
  let controller: AppController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    controller = moduleRef.get(AppController);
  });

  it('uses the real AppService through Nest dependency injection', () => {
    expect(controller.getHello()).toBe('Hello World!');
  });
});
