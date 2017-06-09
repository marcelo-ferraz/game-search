export class ArrayUtilities {

  private static onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  private static distinct () {
    return (<any>this).filter(this.onlyUnique);
  }

  private static selectMany(selector) {
    return (<any> this)
      .map(selector)
      .reduce(
        (acc, cur) => acc.concat(cur),
        []
      );
  }

  public static addDistinct () {
    const proto = Array.prototype;

    if (proto.hasOwnProperty('distinct')) {
      return;
    }

    Object.defineProperty(proto, 'distinct', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: ArrayUtilities.distinct
    });
  }

  public static addFlatten () {
    const proto = Array.prototype;

    if (proto.hasOwnProperty('selectMany')) {
      return;
    }

    Object.defineProperty(proto, 'selectMany', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: ArrayUtilities.selectMany
    });
  }
}
