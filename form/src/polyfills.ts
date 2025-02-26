// polyfills.ts
if (!Array.prototype.find) {
    Array.prototype.find = function (callback: (value: any, index: number, obj: any[]) => boolean, thisArg?: any) {
      if (this == null) {
        throw new TypeError('"this" is null or undefined');
      }
      const o = Object(this);
      const len = o.length >>> 0;
      if (typeof callback !== "function") {
        throw new TypeError("callback must be a function");
      }
      let k = 0;
      while (k < len) {
        const kValue = o[k];
        if (callback.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        k++;
      }
      return undefined;
    };
  }
  