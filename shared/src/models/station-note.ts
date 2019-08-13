export default class StationNote {
  public static columnMap: string[] = [
    "id",
    "stationId",
    "twitterClout",
    "instagramClout",
    "stationCred",
    "programmingTips",
    "preferredContact",
    "app",
    "general",
    "harry",
    "liam",
    "louis",
    "niall",
    "zayn",
    "active",
    "deleted"
  ];

  public id: string = "";
  public stationId: string = "";
  public twitterClout: string = "";
  public instagramClout: string = "";
  public stationCred: string = "";
  public programmingTips: string = "";
  public preferredContact: string = "";
  public app: boolean = false;
  public general: string = "";
  public harry: string = "";
  public liam: string = "";
  public louis: string = "";
  public niall: string = "";
  public zayn: string = "";
  public active: boolean = false;
  public deleted: boolean = false;

  [key: string]: any; // Add index signature

  constructor(row: object[]) {
    for (let i: number = 0; i < StationNote.columnMap.length; i++) {
      if (row[i]) {
        const propertyName = StationNote.columnMap[i];

        switch (propertyName) {
          case "app":
          case "deleted":
          case "active":
            this[propertyName] = row[i].toString() === "Y";
            break;
          default:
            this[propertyName] = row[i].toString();
            break;
        }
      }
    }
  }

  public isValid = (): boolean =>
    this.id != null && this.id !== "" && !this.deleted && this.active;
}
