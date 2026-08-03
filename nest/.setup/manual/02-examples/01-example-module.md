# Example Module

## Description

- This section will setup `example` module.

## Create Example Module Directory

- Create `src/modules/example` directory if it does not exist.

## Example Directory Structure

- Nothing to do here, this is just for reference for future steps.
- This is the final structure of pages you will have after following all the steps in this section:

  ```
  src/
  └── modules/
      ├── example/
      │   ├── example.controller.ts
      │   ├── example.module.ts
      │   └── example.service.ts
  ```

## Create Minimal Example Module

### Create `example.service.ts`

- With content:

  ```ts
  import { Injectable } from '@nestjs/common';

  @Injectable()
  export class ExampleService {
    public getHello(): string {
      return 'Hello World!';
    }
  }
  ```

### Create `example.controller.ts`

- With content:

  ```ts
  import { Controller, Get } from '@nestjs/common';

  import { ExampleService } from './example.service.js';

  @Controller()
  export class ExampleController {
    public constructor(private readonly exampleService: ExampleService) {}

    @Get('hello')
    public getHello(): string {
      return this.exampleService.getHello();
    }
  }
  ```

### Create `example.module.ts`

- With content:

  ```ts
  import { Module } from '@nestjs/common';

  import { ExampleController } from './example.controller.js';
  import { ExampleService } from './example.service.js';

  @Module({
    imports: [],
    controllers: [ExampleController],
    providers: [ExampleService],
  })
  export class ExampleModule {}
  ```

## Update `root.module.ts`

- Add `ExampleModule` to `imports` array:

  ```ts
  // ...
  import { ExampleModule } from './modules/example/example.module.js';

  @Module({
    imports: [
      // ...
      ExampleModule,
    ],
    // ...
  })
  export class RootModule {}
  ```

## Finalize Step

- Format using `pnpm run fix`.
- Commit with "add example module".
