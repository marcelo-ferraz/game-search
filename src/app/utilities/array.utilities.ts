export class ArrayUtilities {
  private static _proto = Array.prototype;

  private static add2Array(name: string, value: Function) {
    if (ArrayUtilities._proto.hasOwnProperty(name)) {
      return;
    }

    Object.defineProperty(ArrayUtilities._proto, name, {
      configurable: true,
      enumerable: true,
      writable: true,
      value: value
    });
  }

  private static onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  public static addDistinct () {
    this.add2Array('distinct', function  distinct () {
      return this.filter(ArrayUtilities.onlyUnique);
    });
  }

  public static addSelectMany () {
    this.add2Array('selectMany', function selectMany(selector) {
      return this
        .map(selector)
        .filter(item => item)
        .reduce(
          (acc, cur) => acc.concat(cur),
          []
        );
    });
  }
}
