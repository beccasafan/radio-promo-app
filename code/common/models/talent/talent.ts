import { Util } from "../../util/util";

export class Talent {
    public id: string;
    public stationId: string;
    public name: string;
    public code: string;
    public twitter: string;
    public hashtag: string;
    public instagram: string;
    public facebook: string;
    public email: string;
    public note: string;
    public active: boolean;
    public deleted: boolean;

    [key:string]: any; // Add index signature

    public static columnMap: string[]  = ["id", "stationId", "name", "code", "twitter", "hashtag", "instagram", "facebook", "email", "note", "active", "deleted"];

    constructor(row: Object[]) {
        for (var i: number = 0; i < Talent.columnMap.length; i++) {
            if (!Util.isEmpty(row[i])) {
                var propertyName = Talent.columnMap[i];
                this[propertyName] = propertyName == "active" || propertyName == "deleted" ? row[i] === "Y" : row[i].toString();
            }
        }
    }

    public isValid = (): boolean => this.id != null && !this.deleted && this.active;
}