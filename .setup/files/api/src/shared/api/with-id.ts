export type WithId<TId extends string | number, TData extends Record<string, unknown>> = TData & {
  readonly id: TId;
};

export type WithStringId<TData extends Record<string, unknown>> = WithId<string, TData>;
export type WithNumberId<TData extends Record<string, unknown>> = WithId<number, TData>;
