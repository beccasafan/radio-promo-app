import { Util } from "../../util/util";

export class SyndicatedTalent {
    public id: string;
    public showId: string;
    public stationId: string;
    public note: string;
    public active: boolean;
    public deleted: boolean;

    [key:string]: any; // Add index signature
    
    public static columnMap: string[] = ["id", "showId", "stationId", "note", "active", "deleted"];

    constructor(row: Object[]) {
        for (var i: number = 0; i < SyndicatedTalent.columnMap.length; i++) {
            if (!Util.isEmpty(row[i])) {
                var propertyName = SyndicatedTalent.columnMap[i];
                this[propertyName] = propertyName == "active" || propertyName == "deleted" ? row[i] === "Y" : row[i].toString();
            }
        }
    }

    public isValid = (): boolean => this.id != null && !this.deleted && this.active;
}