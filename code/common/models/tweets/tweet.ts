import { Util } from "../../util/util";

export class Tweet {
    public id: string;
    public platformId: string;
    public languageId: string;
    public text: string;

    [key:string]: any;

    public static columnMap: string[] = ["id", "platformId", "languageId", "text"];

    constructor(row: Object[]) {
        for (var i: number = 0; i < Tweet.columnMap.length; i++) {
            if (!Util.isEmpty(row[i])) {
                var propertyName = Tweet.columnMap[i];
                this[propertyName] = row[i].toString();
            }
        }
    }

    public isValid = (): boolean => this.id != null && this.platformId === "twitter";
}