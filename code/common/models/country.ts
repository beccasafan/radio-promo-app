import { Util } from "../../common/util/util";

export class Country {
    public id: string;
    public name: string;
    public code: string;
    public languageId: string;
    public deleted: boolean;

    [key:string]: any;

    public static columnMap: string[] = ["id", "name", "code", "languageId", "deleted"];

    constructor(row: Object[]) {
        for (var i: number = 0; i < Country.columnMap.length; i++) {
            if (!Util.isEmpty(row[i])) {
                var propertyName = Country.columnMap[i];
                this[propertyName] = propertyName == "deleted" ? row[i] === "Y" : row[i].toString();
            }
        }
    }

    public isValid = (): boolean => this.id != null && !this.deleted;
}