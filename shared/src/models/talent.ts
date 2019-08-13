export default class Talent {
  public static columnMap: string[] = [
    "id",
    "stationId",
    "name",
    "code",
    "twitter",
    "hashtag",
    "instagram",
    "facebook",
    "email",
    "schedule",
    "note",
    "active",
    "deleted"
  ];

  public id: string = "";
  public stationId: string = "";
  public name: string = "";
  public code: string = "";
  public twitter: string = "";
  public hashtag: string = "";
  public instagram: string = "";
  public facebook: string = "";
  public email: string = "";
  public schedule: string = "";
  public note: string = "";
  public active: boolean = false;
  public deleted: boolean = false;

  [key: string]: any; // Add index signature

  constructor(row: object[]) {
    for (let i: number = 0; i < Talent.columnMap.length; i++) {
      if (row[i]) {
        const propertyName = Talent.columnMap[i];

        switch (propertyName) {
          case "active":
          case "deleted":
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
