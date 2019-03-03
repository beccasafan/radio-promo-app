import { Util } from "../../common/util/util";

export class Monitor {
    public id: string;
    public name: string;
    public code: string;
    public countryId: string;
    public note: string;
    public deleted: boolean;

    [key:string]: any;

    public static columnMap: string[] = ["id", "name", "code", "countryId", "note", "deleted"];

    constructor(row: Object[]) {
        for (var i: number = 0; i < Monitor.columnMap.length; i++) {
            if (!Util.isEmpty(row[i])) {
                var propertyName = Monitor.columnMap[i];
                this[propertyName] = propertyName == "deleted" ? row[i] === "Y" : row[i].toString();
            }
        }
    }

    public isValid = (): boolean => this.id != null && !this.deleted;
}