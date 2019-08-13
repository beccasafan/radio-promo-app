export default class Monitor {
  public static columnMap: string[] = [
    "id",
    "name",
    "code",
    "countryId",
    "note",
    "deleted"
  ];

  public id: string = "";
  public name: string = "";
  public code: string = "";
  public countryId: string = "";
  public note: string = "";
  public deleted: boolean = false;

  [key: string]: any;

  constructor(row: object[]) {
    for (let i: number = 0; i < Monitor.columnMap.length; i++) {
      if (row[i]) {
        const propertyName = Monitor.columnMap[i];
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
