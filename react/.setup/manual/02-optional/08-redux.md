# Redux

## Add Dependencies

- Run:

  ```bash
  bun add redux react-redux @redux-devtools/extension
  ```

## Copy Files

- From root:

  ```bash
  cp -a .setup/files/redux/. .
  ```

## Add Store Code

- You will need to create some base store files.
- You will also need to add per-part (slice) code for each part of the state:
  - Action types - String constants, each identifying a specific action.
  - Actions - Typescript types defining the shape of each action object.
  - Action creators - Functions that create and return action objects.
  - State - Typescript type defining the shape of the state for that part.
  - State initial - Initial state for that part, an instance of the state object.
  - State reducer - Reducer function that immutably updates the state based on the previous state and the action received.
  - State select - Functions that are used to narrow state selection on the call site.
- You will be adding a single `example` part (slice) for now. This will be a placeholder, reference and template for future parts.

### Create `store/` Directory

- Create `src/store/` directory if it does not exist.

### Add `action-type` Code

- Create `action-type/` directory in `src/store/` directory.
- Create `action-type/parts/` directory in `src/store/` directory.

#### Add `example.ts` File

- Inside `action-type/parts/` directory, with content:

  ```ts
  export const ACTION_TYPE_EXAMPLE_CHANGE = 'example/change';
  export const ACTION_TYPE_EXAMPLE_RESET = 'example/reset';

  export type ActionTypeExampleChange = typeof ACTION_TYPE_EXAMPLE_CHANGE;
  export type ActionTypeExampleReset = typeof ACTION_TYPE_EXAMPLE_RESET;

  export type ActionTypeExample = ActionTypeExampleChange | ActionTypeExampleReset;
  ```

#### Add `app.ts` File

- Inside `action-type/` directory, with content:

  ```ts
  import type { ActionTypeExample } from './parts';

  export type ActionTypeAny = ActionTypeExample;
  ```

#### Add Index Files

- To `action-type/parts/` directory, export all from `example.ts`.
- To `action-type/` directory, export all from `parts/` and `app.ts`.

### Add `action` Code

- Create `action/` directory in `src/store/` directory.
- Create `action/parts/` directory in `src/store/` directory.

#### Add `example.ts` File

- Inside `action/parts/` directory, with content:

  ```ts
  import type { ActionBase } from '@/shared/redux';

  import type { ActionTypeExampleChange, ActionTypeExampleReset } from '../../action-type';

  export type ActionExampleChange = ActionBase<ActionTypeExampleChange, number>;
  export type ActionExampleReset = ActionBase<ActionTypeExampleReset, undefined>;

  export type ActionExample = ActionExampleChange | ActionExampleReset;
  ```

#### Add `app.ts` File

- Inside `action/` directory, with content:

  ```ts
  import type { ActionExample } from './parts';

  export type ActionAny = ActionExample;
  ```

#### Add Index Files

- To `action/parts/` directory, export all from `example.ts`.
- To `action/` directory, export all from `parts/` and `app.ts`.

### Add `action-creator` Code

- Create `action-creator/` directory in `src/store/` directory.
- Create `action-creator/parts/` directory in `src/store/` directory.

#### Add `example.ts` File

- Inside `action-creator/parts/` directory, with content:

  ```ts
  import type { ActionExampleChange, ActionExampleReset } from '../../action';
  import { ACTION_TYPE_EXAMPLE_CHANGE, ACTION_TYPE_EXAMPLE_RESET } from '../../action-type';

  export function actionExampleChange(payload: number): ActionExampleChange {
    return {
      type: ACTION_TYPE_EXAMPLE_CHANGE,
      payload,
    };
  }

  export function actionExampleReset(): ActionExampleReset {
    return {
      type: ACTION_TYPE_EXAMPLE_RESET,
      payload: undefined,
    };
  }
  ```

#### Add Index Files

- To `action-creator/parts/` directory, export all from `example.ts`.
- To `action-creator/` directory, export all from `parts/` directory.

### Add `state` Code

- Create `state/` directory in `src/store/` directory.
- Create `state/parts/` directory in `src/store/` directory.

#### Add `example.ts` File

- Inside `state/parts/` directory, with content:

  ```ts
  export interface StateExample {
    readonly value: number;
    readonly lastUpdatedAt: string | undefined;
  }
  ```

#### Add `app.ts` File

- Inside `state/` directory, with content:

  ```ts
  import type { StateExample } from './parts';

  export interface StateRoot {
    readonly example: StateExample;
  }
  ```

#### Add Index Files

- To `state/parts/` directory, export all from `example.ts`.
- To `state/` directory, export all from `parts/` and `app.ts`.

### Add `state-initial` Code

- Create `state-initial/` directory in `src/store/` directory.
- Create `state-initial/parts/` directory in `src/store/` directory.

#### Add `example.ts` File

- Inside `state-initial/parts/` directory, with content:

  ```ts
  import type { StateExample } from '../../state';

  export const STATE_INITIAL_EXAMPLE: StateExample = {
    value: 0,
    lastUpdatedAt: undefined,
  };
  ```

#### Add `app.ts` File

- Inside `state-initial/` directory, with content:

  ```ts
  import type { StateRoot } from '../state';
  import { STATE_INITIAL_EXAMPLE } from './parts';

  export const STATE_INITIAL_ROOT: StateRoot = {
    example: STATE_INITIAL_EXAMPLE,
  };
  ```

#### Add Index Files

- To `state-initial/parts/` directory, export all from `example.ts`.
- To `state-initial/` directory, export all from `parts/` and `app.ts`.

### Add `state-reducer` Code

- Create `state-reducer/` directory in `src/store/` directory.
- Create `state-reducer/parts/` directory in `src/store/` directory.

#### Add `example.ts` File

- Inside `state-reducer/parts/` directory, with content:

  ```ts
  import { Temporal } from '@js-temporal/polyfill';

  import type { ActionAny } from '../../action';
  import { ACTION_TYPE_EXAMPLE_CHANGE, ACTION_TYPE_EXAMPLE_RESET } from '../../action-type';
  import type { StateExample } from '../../state';
  import { STATE_INITIAL_EXAMPLE } from '../../state-initial';

  export function reducerExample(
    state: StateExample = STATE_INITIAL_EXAMPLE,
    action: ActionAny,
  ): StateExample {
    switch (action.type) {
      case ACTION_TYPE_EXAMPLE_CHANGE: {
        return {
          ...state,
          value: state.value + action.payload,
          lastUpdatedAt: Temporal.Now.plainDateTimeISO().toString(),
        };
      }
      case ACTION_TYPE_EXAMPLE_RESET: {
        return {
          ...state,
          value: 0,
          lastUpdatedAt: Temporal.Now.plainDateTimeISO().toString(),
        };
      }
      default: {
        return state;
      }
    }
  }
  ```

#### Add `app.ts` File

- Inside `state-reducer/` directory, with content:

  ```ts
  import { combineReducers, type Reducer } from 'redux';

  import type { ActionAny } from '../action';
  import type { StateRoot } from '../state';
  import { reducerExample } from './parts';

  export const rootReducer = combineReducers({
    example: reducerExample,
  }) as Reducer<StateRoot, ActionAny, Partial<StateRoot>>;
  ```

#### Add Index Files

- To `state-reducer/parts/` directory, export all from `example.ts`.
- To `state-reducer/` directory, export all from `parts/` and `app.ts`.

### Add `state-select` Code

- Create `state-select/` directory in `src/store/` directory.
- Create `state-select/parts/` directory in `src/store/` directory.

#### Add `example.ts` File

- Inside `state-select/parts/` directory, with content:

  ```ts
  import type { StateExample, StateRoot } from '../../state';

  export function selectExample(root: StateRoot): StateExample {
    return root.example;
  }

  export function selectExampleValue(root: StateRoot): number {
    return selectExample(root).value;
  }

  export function selectExampleLastUpdatedAt(root: StateRoot): string | undefined {
    return selectExample(root).lastUpdatedAt;
  }
  ```

#### Add `app.ts` File

- Inside `state-select/` directory, with content:

  ```ts
  import type { StateRoot } from '../state';

  export function selectRoot(root: StateRoot): StateRoot {
    return root;
  }
  ```

#### Add Index Files

- To `state-select/parts/` directory, export all from `example.ts`.
- To `state-select/` directory, export all from `parts/` and `app.ts`.

### Base Store Files

#### Add `types.ts` File

- Inside `store/` directory, with content:

  ```ts
  import type { Dispatch, Store } from 'redux';

  import type { ActionAny } from './action';
  import type { StateRoot } from './state';

  export type AppStore = Store<StateRoot, ActionAny, unknown>;
  export type AppDispatch = Dispatch<ActionAny>;
  ```

#### Add `hooks.ts` File

- Inside `store/` directory, with content:

  ```ts
  import { useDispatch, useSelector, useStore } from 'react-redux';

  import type { StateRoot } from './state';
  import type { AppDispatch, AppStore } from './types';

  export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
  export const useAppSelector = useSelector.withTypes<StateRoot>();
  export const useAppStore = useStore.withTypes<AppStore>();
  ```

#### Add `create-app-store.ts` File

- Inside `store/` directory, with content:

  ```ts
  import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension';
  import { legacy_createStore as createStore } from 'redux';

  import type { AppDependencies } from '@/dependencies';

  import { STATE_INITIAL_ROOT } from './state-initial';
  import { rootReducer } from './state-reducer';
  import type { AppStore } from './types';

  export function createAppStore(_dependencies: AppDependencies): AppStore {
    const composeEnhancers = composeWithDevToolsDevelopmentOnly({});
    const enhancer = composeEnhancers();

    const store = createStore(rootReducer, STATE_INITIAL_ROOT, enhancer);

    return store;
  }
  ```

### Add Index File

- Export all directories and files from `store/` directory:

  ```ts
  export * from './action-type';
  export * from './action';
  export * from './action-creator';
  export * from './state';
  export * from './state-initial';
  export * from './state-reducer';
  export * from './state-select';
  export * from './create-app-store';
  export * from './hooks';
  export * from './types';
  ```

## Update Application to Use Redux

### Update `run.tsx`

- Like this:

  ```tsx
  export async function run(): Promise<void> {
    // ...
    const dependencies = createAppDependencies(/* ... */);
    const store = createAppStore(dependencies);

    const value = createAppContextValue(env, dependencies);

    // this or something similar, put store provider above context provider
    const content = (
      <StrictMode>
        <Provider store={store}>
          <AppContext.Provider value={value}>
            <RouterProvider router={router} />
          </AppContext.Provider>
        </Provider>
      </StrictMode>
    );

    // ...
  }
  ```

## Finalize

- Format using `bun run fix`.
- Commit with "setup redux".
