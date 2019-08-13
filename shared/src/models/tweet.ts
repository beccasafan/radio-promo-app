export default class Tweet {
  public static columnMap: string[] = [
    "id",
    "platformId",
    "languageId",
    "text",
    "artist",
    "song"
  ];

  public id: string = "";
  public platformId: string = "";
  public languageId: string = "";
  public text: string = "";
  public artist: string = "";
  public song: string = "";

  [key: string]: any;

  constructor(row: object[]) {
    for (let i: number = 0; i < Tweet.columnMap.length; i++) {
      if (row[i]) {
        const propertyName = Tweet.columnMap[i];
        this[propertyName] = row[i].toString();
      }
    }
  }

  public isValid = (): boolean =>
    this.id != null && this.id !== "" && this.platformId === "twitter";
}
