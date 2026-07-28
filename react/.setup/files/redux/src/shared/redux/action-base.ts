import type { Action } from 'redux';

export interface ActionBase<TType extends string, TPayload> extends Action<TType> {
  readonly type: TType;
  readonly payload: TPayload;
}
