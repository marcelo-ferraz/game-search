
export abstract class ArrayExtended<T> extends Array {
  public abstract distinct();
  public abstract selectMany<R>(selector: (T) => R);
}
