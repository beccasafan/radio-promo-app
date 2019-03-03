import { Util } from "../../util/util";

export class Format {
    public id: string;
    public name: string;
    public monitorId: string;
    public code: string;
    public note: string;
    public deleted: boolean;

    [key:string]: any;

    public static columnMap: string[] = ["id", "name", "monitorId", "code", "note", "deleted"];

    constructor(row: Object[]) {
        for (var i: number = 0; i < Format.columnMap.length; i++) {
            if (!Util.isEmpty(row[i])) {
                var propertyName = Format.columnMap[i];
                this[propertyName] = propertyName == "deleted" ? row[i] === "Y" : row[i].toString();
            }
        }
    }

    public isValid = (): boolean => this.id != null && !this.deleted;
}