Array.prototype.includes =
  Array.prototype.includes ||
  function(this: any, searchElement: any, fromIndex: number) {
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }

    // 1. Let O be ? ToObject(this value).
    const o = Object(this);

    // 2. Let len be ? ToLength(? Get(O, "length")).
    // tslint:disable-next-line:no-bitwise
    const len = o.length >>> 0;

    // 3. If len is 0, return false.
    if (len === 0) {
      return false;
    }

    // 4. Let n be ? ToInteger(fromIndex).
    //    (If fromIndex is undefined, this step produces the value 0.)
    // tslint:disable-next-line:no-bitwise
    const n = fromIndex | 0;

    // 5. If n ≥ 0, then
    //  a. Let k be n.
    // 6. Else n < 0,
    //  a. Let k be len + n.
    //  b. If k < 0, let k be 0.
    let k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    function sameValueZero(x: number, y: number) {
      return (
        x === y ||
        (typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y))
      );
    }

    // 7. Repeat, while k < len
    while (k < len) {
      // a. Let elementK be the result of ? Get(O, ! ToString(k)).
      // b. If SameValueZero(searchElement, elementK) is true, return true.
      if (sameValueZero(o[k], searchElement)) {
        return true;
      }
      // c. Increase k by 1.
      k++;
    }

    // 8. Return false
    return false;
  };

Array.prototype.find =
  Array.prototype.find ||
  function(
    this: any,
    callback: {
      call: (arg0: any, arg1: any, arg2: number, arg3: any) => void;
    }
  ) {
    if (this === null) {
      throw new TypeError("Array.prototype.find called on null or undefined");
    } else if (typeof callback !== "function") {
      throw new TypeError("callback must be a function");
    }
    const list = Object(this);
    // Makes sures is always has an positive integer as length.
    // tslint:disable-next-line:no-bitwise
    const length = list.length >>> 0;
    const thisArg = arguments[1];
    for (let i = 0; i < length; i++) {
      const element = list[i];
      if (callback.call(thisArg, element, i, list)) {
        return element;
      }
    }
  };

export function createJSONOutput(
  obj: any,
  callback: string
): GoogleAppsScript.Content.TextOutput {
  const output = ContentService.createTextOutput(
    `${callback}(${JSON.stringify(obj, null, 4)})`
  );
  output.setMimeType(ContentService.MimeType.JAVASCRIPT);

  return output;
}

export function groupByProperty<T extends IEntity>(
  data: T[],
  property: string
): IGroupedEntity<T> {
  return data.reduce(
    (groups: IGroupedEntity<T>, item: T) => {
      const groupKey = item[property];
      const group = groups[groupKey] || ([] as T[]);
      group.push(item);
      groups[groupKey] = group;
      return groups;
    },
    {} as IGroupedEntity<T>
  );
}

export function readSheetData(sheetName: string) {
  // const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const spreadsheet = SpreadsheetApp.openById(
    "11aO_2CC_9QHF28zr-k9HgEc2uLETRrPymdnzXGccDnI"
  );
  return spreadsheet
    .getSheetByName(sheetName)
    .getDataRange()
    .getValues()
    .splice(1);
}

export interface IGroupedEntity<T> {
  [key: string]: T[];
}

interface IEntity {
  [key: string]: string;
}

export interface ITypedEntity<T> {
  [key: string]: T;
}
