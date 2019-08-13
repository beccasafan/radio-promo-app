export default class Artist {
  public static columnMap: string[] = ["id", "name", "code"];

  public id: string = "";
  public name: string = "";
  public code: string = "";

  [key: string]: any;

  constructor(row: object[]) {
    for (let i: number = 0; i < Artist.columnMap.length; i++) {
      if (row[i]) {
        const propertyName = Artist.columnMap[i];

        this[propertyName] = row[i].toString();
      }
    }
  }

  public isValid = (): boolean => this.id != null && this.id !== "";
}
