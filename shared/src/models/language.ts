export default class Language {
  public static columnMap: string[] = ["id", "name", "code", "deleted"];

  public id: string = "";
  public name: string = "";
  public code: string = "";
  public deleted: boolean = false;

  [key: string]: any;

  constructor(row: object[]) {
    for (let i: number = 0; i < Language.columnMap.length; i++) {
      if (row[i]) {
        const propertyName = Language.columnMap[i];
        this[propertyName] =
          propertyName === "deleted"
            ? row[i].toString() === "Y"
            : row[i].toString();
      }
    }
  }

  public isValid = (): boolean =>
    this.id != null && this.id !== "" && !this.deleted;
}
