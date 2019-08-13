export default class Format {
  public static columnMap: string[] = [
    "id",
    "name",
    "monitorId",
    "code",
    "note",
    "deleted"
  ];

  public id: string = "";
  public name: string = "";
  public monitorId: string = "";
  public code: string = "";
  public note: string = "";
  public deleted: boolean = false;

  [key: string]: any;

  constructor(row: object[]) {
    for (let i: number = 0; i < Format.columnMap.length; i++) {
      if (row[i]) {
        const propertyName = Format.columnMap[i];
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
