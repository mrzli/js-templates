import type { Action } from 'redux';
import { ofType, type Epic } from 'redux-observable';
import { EMPTY, Observable, concat, defer, from, of } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  finalize,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

import type { ApiRequestOptions } from '@/shared/api';
import { ensureNever } from '@/shared/assert';

import type { RequestEpicParams, RequestEpicParamsInternal } from './types';

export function requestEpic<TActionAny extends Action, TState, TDependencies, TResult>(
  params: RequestEpicParams<TActionAny, TState, TDependencies, TResult>,
): Epic<TActionAny, TActionAny, TState, TDependencies> {
  return requestEpicInternal(
    params as unknown as RequestEpicParamsInternal<
      TActionAny,
      TActionAny,
      TState,
      TDependencies,
      TResult
    >,
  );
}

function requestEpicInternal<
  TActionAny extends Action,
  TAction extends TActionAny,
  TState,
  TDependencies,
  TResult,
>(
  params: RequestEpicParamsInternal<TActionAny, TAction, TState, TDependencies, TResult>,
): Epic<TActionAny, TActionAny, TState, TDependencies> {
  const { type, strategy, request, pending, success, failure } = params;

  return (action$, state$, dependencies) => {
    const requestAction$ = action$.pipe(
      ofType<TActionAny, TAction['type'], TAction>(type),
      withLatestFrom(state$),
    );

    const createRequest = ([action, state]: [TAction, TState]): Observable<TActionAny> => {
      const controller = new AbortController();
      const options: ApiRequestOptions = { signal: controller.signal };

      return concat(
        of(pending({ action, state, dependencies })),
        defer(() => {
          return from(request({ action, state, dependencies, options }));
        }).pipe(
          map((result) => {
            return success({ action, state, dependencies, result });
          }),
          catchError((error: unknown) => {
            if (error instanceof Error && error.name === 'AbortError') {
              return EMPTY;
            }

            const message = error instanceof Error ? error.message : 'Unknown error';

            return of(failure({ action, state, dependencies, message }));
          }),
          finalize(() => {
            controller.abort();
          }),
        ),
      );
    };

    switch (strategy) {
      case 'latest': {
        return requestAction$.pipe(switchMap(createRequest));
      }
      case 'queue': {
        return requestAction$.pipe(concatMap(createRequest));
      }
      case 'ignore': {
        return requestAction$.pipe(exhaustMap(createRequest));
      }
      case 'parallel': {
        return requestAction$.pipe(mergeMap(createRequest));
      }
      default: {
        return ensureNever(strategy);
      }
    }
  };
}
