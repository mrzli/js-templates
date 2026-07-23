import type { Action } from 'redux';

import type { ApiRequestOptions } from '@/shared/api';

import type { RequestEpicStrategy } from './request-epic-strategy';

export interface RequestEpicRequestParams<
  TActionAny extends Action,
  TAction extends TActionAny,
  TState,
  TDependencies,
> {
  readonly action: TAction;
  readonly state: TState;
  readonly dependencies: TDependencies;
  readonly options: ApiRequestOptions;
}

export interface RequestEpicPendingParams<
  TActionAny extends Action,
  TAction extends TActionAny,
  TState,
  TDependencies,
> {
  readonly action: TAction;
  readonly state: TState;
  readonly dependencies: TDependencies;
}

export interface RequestEpicSuccessParams<
  TActionAny extends Action,
  TAction extends TActionAny,
  TState,
  TDependencies,
  TResult,
> {
  readonly action: TAction;
  readonly state: TState;
  readonly dependencies: TDependencies;
  readonly result: TResult;
}

export interface RequestEpicFailureParams<
  TActionAny extends Action,
  TAction extends TActionAny,
  TState,
  TDependencies,
> {
  readonly action: TAction;
  readonly state: TState;
  readonly dependencies: TDependencies;
  readonly message: string;
}

export interface RequestEpicParamsInternal<
  TActionAny extends Action,
  TAction extends TActionAny,
  TState,
  TDependencies,
  TResult,
> {
  readonly type: TAction['type'];
  readonly strategy: RequestEpicStrategy;
  readonly request: (
    params: RequestEpicRequestParams<TActionAny, TAction, TState, TDependencies>,
  ) => Promise<TResult>;
  readonly pending: (
    params: RequestEpicPendingParams<TActionAny, TAction, TState, TDependencies>,
  ) => TActionAny;
  readonly success: (
    params: RequestEpicSuccessParams<TActionAny, TAction, TState, TDependencies, TResult>,
  ) => TActionAny;
  readonly failure: (
    params: RequestEpicFailureParams<TActionAny, TAction, TState, TDependencies>,
  ) => TActionAny;
}

export type RequestEpicParams<
  TActionAny extends Action,
  TState,
  TDependencies,
  TResult,
  TAction extends TActionAny = TActionAny,
> = TAction extends unknown
  ? RequestEpicParamsInternal<TActionAny, TAction, TState, TDependencies, TResult>
  : never;
