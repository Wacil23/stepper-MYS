type AllStylableProps<
  Props,
  RequiredKeys extends keyof Props,
  NullableKeys extends keyof Props,
> = Required<Pick<Props, RequiredKeys>> & Pick<Props, NullableKeys>;

export type StylableProps<
  Props,
  RequiredKeys extends keyof Props,
  NullableKeys extends keyof Props = never,
> = {
  [K in keyof AllStylableProps<
    Props,
    RequiredKeys,
    NullableKeys
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  > as `$${K}`]: AllStylableProps<Props, RequiredKeys, NullableKeys>[K];
};

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;
type Prev = [
  never,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  ...Array<0>,
];
export type NestedPropPaths<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends Record<string, unknown>
    ? {
        [K in keyof T]-?: K extends string | number
          ? `${K}` | Join<K, NestedPropPaths<T[K], Prev[D]>>
          : never;
      }[keyof T]
    : "";
