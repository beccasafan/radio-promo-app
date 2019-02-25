import { Util } from "../../common/util/util";

export class Language {
    public id: string;
    public name: string;
    public code: string;
    public deleted: boolean;

    [key:string]: any;

    public static columnMap: string[] = ["id", "name", "code", "deleted"];

    constructor(row: Object[]) {
        for (var i: number = 0; i < Language.columnMap.length; i++) {
            if (!Util.isEmpty(row[i])) {
                var propertyName = Language.columnMap[i];
                this[propertyName] = propertyName == "deleted" ? row[i] === "Y" : row[i].toString();
            }
        }
    }

    public isValid = (): boolean => this.id != null && !this.deleted;
}