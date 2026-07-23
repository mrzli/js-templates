# Redux Observable

## Prerequisites

- You need to have `redux` set up.

## Add Dependencies

- Run:

  ```bash
  bun add redux-observable rxjs
  ```

## Copy Files

- From root:

  ```bash
  cp -a .setup/files/redux-observable/. .
  ```

## Update Store Code

### Update `action-type` Code

- Update `example.ts` file in `action-type/parts/` directory:

  ```ts
  // ...
  export const ACTION_TYPE_EXAMPLE_GET_JSON_PLACEHOLDER = 'example/get-json-placeholder';
  export const ACTION_TYPE_EXAMPLE_GET_JSON_PLACEHOLDER_PENDING =
    'example/get-json-placeholder-pending';
  export const ACTION_TYPE_EXAMPLE_GET_JSON_PLACEHOLDER_SUCCESS =
    'example/get-json-placeholder-success';
  export const ACTION_TYPE_EXAMPLE_GET_JSON_PLACEHOLDER_FAILURE =
    'example/get-json-placeholder-failure';

  // ...
  export type ActionTypeExampleGetJsonPlaceholder = typeof ACTION_TYPE_EXAMPLE_GET_JSON_PLACEHOLDER;
  export type ActionTypeExampleGetJsonPlaceholderPending =
    typeof ACTION_TYPE_EXAMPLE_GET_JSON_PLACEHOLDER_PENDING;
  export type ActionTypeExampleGetJsonPlaceholderSuccess =
    typeof ACTION_TYPE_EXAMPLE_GET_JSON_PLACEHOLDER_SUCCESS;
  export type ActionTypeExampleGetJsonPlaceholderFailure =
    typeof ACTION_TYPE_EXAMPLE_GET_JSON_PLACEHOLDER_FAILURE;

  export type ActionTypeExample =
    // ...
    | ActionTypeExampleGetJsonPlaceholder
    | ActionTypeExampleGetJsonPlaceholderPending
    | ActionTypeExampleGetJsonPlaceholderSuccess
    | ActionTypeExampleGetJsonPlaceholderFailure;
  ```

### Update `action` Code

- Update `example.ts` file in `action/parts/` directory:

  ```ts
  // ...

  export type ActionExampleGetJsonPlaceholder = ActionBase<
    ActionTypeExampleGetJsonPlaceholder,
    number
  >;

  export type ActionExampleGetJsonPlaceholderPending = ActionBase<
    ActionTypeExampleGetJsonPlaceholderPending,
    undefined
  >;

  export type ActionExampleGetJsonPlaceholderSuccess = ActionBase<
    ActionTypeExampleGetJsonPlaceholderSuccess,
    JsonPlaceholderPost
  >;

  export type ActionExampleGetJsonPlaceholderFailure = ActionBase<
    ActionTypeExampleGetJsonPlaceholderFailure,
    string
  >;

  export type ActionExample =
    // ...
    | ActionExampleGetJsonPlaceholder
    | ActionExampleGetJsonPlaceholderPending
    | ActionExampleGetJsonPlaceholderSuccess
    | ActionExampleGetJsonPlaceholderFailure;
  ```

### Update `action-creator` Code

- Update `example.ts` file in `action-creator/parts/` directory:

  ```ts
  // ...

  export function actionExampleGetJsonPlaceholder(
    payload: number,
  ): ActionExampleGetJsonPlaceholder {
    return {
      type: ACTION_TYPE_EXAMPLE_GET_JSON_PLACEHOLDER,
      payload,
    };
  }

  export function actionExampleGetJsonPlaceholderPending(): ActionExampleGetJsonPlaceholderPending {
    return {
      type: ACTION_TYPE_EXAMPLE_GET_JSON_PLACEHOLDER_PENDING,
      payload: undefined,
    };
  }

  export function actionExampleGetJsonPlaceholderSuccess(
    payload: JsonPlaceholderPost,
  ): ActionExampleGetJsonPlaceholderSuccess {
    return {
      type: ACTION_TYPE_EXAMPLE_GET_JSON_PLACEHOLDER_SUCCESS,
      payload,
    };
  }

  export function actionExampleGetJsonPlaceholderFailure(
    payload: string,
  ): ActionExampleGetJsonPlaceholderFailure {
    return {
      type: ACTION_TYPE_EXAMPLE_GET_JSON_PLACEHOLDER_FAILURE,
      payload,
    };
  }
  ```

### Update `state` Code

- Update `example.ts` file in `state/parts/` directory:

  ```ts
  import type { JsonPlaceholderPost } from '@/domain/types';

  export interface StateExample {
    // ...
    readonly jsonPlaceholderLoading: boolean;
    readonly jsonPlaceholderData: JsonPlaceholderPost | undefined;
    readonly jsonPlaceholderError: string | undefined;
  }
  ```

### Update `state-initial` Code

- Update `example.ts` file in `state-initial/parts/` directory:

  ```ts
  // ...

  export const STATE_INITIAL_EXAMPLE: StateExample = {
    // ...
    jsonPlaceholderLoading: false,
    jsonPlaceholderData: undefined,
    jsonPlaceholderError: undefined,
  };
  ```

### Update `state-reducer` Code

- Update `example.ts` file in `state-reducer/parts/` directory, with content (just before `default` case):

  ```ts
  // ...

  export function reducerExample(
    state: StateExample = STATE_INITIAL_EXAMPLE,
    action: ActionAny,
  ): StateExample {
    switch (action.type) {
      // ...
      case ACTION_TYPE_EXAMPLE_GET_JSON_PLACEHOLDER_PENDING: {
        return {
          ...state,
          jsonPlaceholderLoading: true,
          jsonPlaceholderData: undefined,
          jsonPlaceholderError: undefined,
        };
      }
      case ACTION_TYPE_EXAMPLE_GET_JSON_PLACEHOLDER_SUCCESS: {
        return {
          ...state,
          jsonPlaceholderLoading: false,
          jsonPlaceholderData: action.payload,
          jsonPlaceholderError: undefined,
        };
      }
      case ACTION_TYPE_EXAMPLE_GET_JSON_PLACEHOLDER_FAILURE: {
        return {
          ...state,
          jsonPlaceholderLoading: false,
          jsonPlaceholderData: undefined,
          jsonPlaceholderError: action.payload,
        };
      }
      // ...
    }
  }
  ```

### Update `state-select` Code

- Update `example.ts` file in `state-select/parts/` directory, with content:

  ```ts
  import type { JsonPlaceholderPost } from '@/domain/types';

  // ...

  export function selectExampleJsonPlaceholderLoading(root: StateRoot): boolean {
    return selectExample(root).jsonPlaceholderLoading;
  }

  export function selectExampleJsonPlaceholderData(
    root: StateRoot,
  ): JsonPlaceholderPost | undefined {
    return selectExample(root).jsonPlaceholderData;
  }

  export function selectExampleJsonPlaceholderError(root: StateRoot): string | undefined {
    return selectExample(root).jsonPlaceholderError;
  }
  ```

### Add `epic` Code

- Create `epic/` directory in `src/store/` directory.
- Create `epic/parts/` directory in `src/store/` directory.

#### Add `types.ts` File in `epic/` Directory

- With content:

  ```ts
  import type { Epic } from 'redux-observable';

  import type { AppDependencies } from '@/dependencies';

  import type { ActionAny } from '../action';
  import type { StateRoot } from '../state';

  export type RootEpic = Epic<ActionAny, ActionAny, StateRoot, AppDependencies>;
  ```

#### Add `shared.ts` File in `epic/` Directory

- This is just a file with utily function(s), such as one for creating a request epic.
- With content:

  ```ts
  import type { AppDependencies } from '@/dependencies';
  import {
    requestEpic as requestEpicGeneric,
    type RequestEpicParams,
  } from '@/shared/redux-observable';

  import type { ActionAny } from '../action';
  import type { StateRoot } from '../state';
  import type { RootEpic } from './types';

  export function requestEpic<TResult>(
    params: RequestEpicParams<ActionAny, StateRoot, AppDependencies, TResult>,
  ): RootEpic {
    return requestEpicGeneric<ActionAny, StateRoot, AppDependencies, TResult>(params);
  }
  ```

#### Add `example.ts` File in `epic/parts/` Directory

- With content:

  ```ts
  import { fromDtoExampleJsonPlaceholderPost } from '@/domain/helpers';

  import {
    actionExampleGetJsonPlaceholderFailure,
    actionExampleGetJsonPlaceholderPending,
    actionExampleGetJsonPlaceholderSuccess,
  } from '../../action-creator';
  import { ACTION_TYPE_EXAMPLE_GET_JSON_PLACEHOLDER } from '../../action-type';
  import { requestEpic } from '../shared';
  import type { RootEpic } from '../types';

  export const epicExampleGetJsonPlaceholder: RootEpic = requestEpic({
    type: ACTION_TYPE_EXAMPLE_GET_JSON_PLACEHOLDER,
    strategy: 'latest',
    request: ({ action, dependencies, options }) =>
      dependencies.api.example.jsonPlaceholder(action.payload, options),
    pending: () => actionExampleGetJsonPlaceholderPending(),
    success: ({ result }) =>
      actionExampleGetJsonPlaceholderSuccess(fromDtoExampleJsonPlaceholderPost(result)),
    failure: ({ message }) => actionExampleGetJsonPlaceholderFailure(message),
  });
  ```

#### Add `app.ts` File in `epic/` Directory

- With content:

  ```ts
  import { combineEpics } from 'redux-observable';

  import { epicExampleGetJsonPlaceholder } from './parts';
  import type { RootEpic } from './types';

  export const rootEpic: RootEpic = combineEpics(epicExampleGetJsonPlaceholder);
  ```

#### Add Index Files

- To `epic/parts/` directory, export all from `example.ts`.
- To `epic/` directory, export all from `parts/`, `app.ts`, `shared.ts`, and `types.ts`.

### Base Store Files

#### Update `create-app-store.ts` File in `store/` Directory

- You need to add epic middleware and run it:

  ```ts
  export function createAppStore(dependencies: AppDependencies): AppStore {
    const epicMiddleware = createEpicMiddleware<ActionAny, ActionAny, StateRoot, AppDependencies>({
      dependencies,
    });

    const composeEnhancers = composeWithDevToolsDevelopmentOnly({});
    const enhancer = composeEnhancers(applyMiddleware(epicMiddleware));

    const store = createStore(rootReducer, STATE_INITIAL_ROOT, enhancer);

    epicMiddleware.run(rootEpic);

    return store;
  }
  ```

### Update Index File in `store/` Directory

- You need to export `epic/` directory.

## Finalize

- Format using `bun run fix`.
- Commit with "setup redux observable".
