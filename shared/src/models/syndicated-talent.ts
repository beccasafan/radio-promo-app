export default class SyndicatedTalent {
  public static columnMap: string[] = [
    "id",
    "showId",
    "stationId",
    "schedule",
    "note",
    "active",
    "deleted"
  ];

  public id: string = "";
  public showId: string = "";
  public stationId: string = "";
  public schedule: string = "";
  public note: string = "";
  public active: boolean = false;
  public deleted: boolean = false;

  [key: string]: any; // Add index signature

  constructor(row: object[]) {
    for (let i: number = 0; i < SyndicatedTalent.columnMap.length; i++) {
      if (row[i]) {
        const propertyName = SyndicatedTalent.columnMap[i];
        this[propertyName] =
          propertyName === "active" || propertyName === "deleted"
            ? row[i].toString() === "Y"
            : row[i].toString();
      }
    }
  }

  public isValid = (): boolean =>
    this.id != null && this.id !== "" && !this.deleted && this.active;
}
