import { StationNote } from ".";

export default class Station {
  public static columnMap: string[] = [
    "id",
    "countryId",
    "code",
    "name",
    "languageId",
    "formatId",
    "location",
    "parentGroup",
    "website",
    "twitter",
    "hashtag",
    "instagram",
    "facebook",
    "email",
    "text",
    "phone",
    "whatsapp",
    "utc",
    "oldNote",
    "active",
    "deleted"
  ];

  public id: string = "";
  public countryId: string = "";
  public code: string = "";
  public name: string = "";
  public languageId: string = "";
  public formatId: string = "";
  public location: string = "";
  public parentGroup: string = "";
  public website: string = "";
  public twitter: string = "";
  public hashtag: string = "";
  public instagram: string = "";
  public facebook: string = "";
  public email: string = "";
  public text: string = "";
  public phone: string = "";
  public whatsapp: string = "";
  public utc?: number;
  public oldNote: string = "";
  public active: boolean = false;
  public deleted: boolean = false;

  public note?: StationNote;

  [key: string]: any; // Add index signature

  constructor(row: object[]) {
    for (let i: number = 0; i < Station.columnMap.length; i++) {
      if (row[i]) {
        const propertyName = Station.columnMap[i];

        switch (propertyName) {
          case "deleted":
          case "active":
            this[propertyName] = row[i].toString() === "Y";
            break;
          case "utc":
            this[propertyName] = Number(row[i].toString());
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
