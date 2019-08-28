export default class Format {
  public static columnMap: string[] = [
    "id",
    "name",
    "countryId",
    "code",
    "note",
    "active",
    "deleted"
  ];

  public id: string = "";
  public name: string = "";
  public countryId: string = "";
  public code: string = "";
  public note: string = "";
  public active: boolean = false;
  public deleted: boolean = false;

  [key: string]: any;

  constructor(row: object[]) {
    for (let i: number = 0; i < Format.columnMap.length; i++) {
      if (row[i]) {
        const propertyName = Format.columnMap[i];
        switch (propertyName) {
          case "deleted":
          case "active":
            this[propertyName] = row[i].toString() === "Y";
            break;
          default:
            this[propertyName] = row[i].toString();
        }
      }
    }
  }

  public isValid = (): boolean =>
    this.id != null && this.id !== "" && !this.deleted && this.active;
}
