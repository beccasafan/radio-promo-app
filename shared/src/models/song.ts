export default class Song {
  public static columnMap: string[] = [
    "id",
    "title",
    "oneD",
    "artist",
    "code",
    "release",
    "twitter",
    "hashtag",
    "note",
    "active",
    "deleted"
  ];

  public id: string = "";
  public title: string = "";
  public oneD: string = "";
  public artist: string = "";
  public code: string = "";
  public release!: Date;
  public twitter: string = "";
  public hashtag: string = "";
  public note: string = "";
  public active: boolean = false;
  public deleted: boolean = false;

  [key: string]: any;

  constructor(row: object[]) {
    for (let i: number = 0; i < Song.columnMap.length; i++) {
      if (row[i]) {
        const propertyName = Song.columnMap[i];

        switch (propertyName) {
          case "deleted":
          case "active":
            this[propertyName] = row[i].toString() === "Y";
            break;
          case "release":
            this[propertyName] = new Date(row[i].toString());
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
