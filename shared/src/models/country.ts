export default class Country {
  public static columnMap: string[] = [
    "id",
    "name",
    "code",
    "languageId",
    "deleted"
  ];

  public id: string = "";
  public name: string = "";
  public code: string = "";
  public languageId: string = "";
  public deleted: boolean = false;

  [key: string]: any;

  constructor(row: object[]) {
    for (let i: number = 0; i < Country.columnMap.length; i++) {
      if (row[i]) {
        const propertyName = Country.columnMap[i];
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
