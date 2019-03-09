import { Util } from "./../../common/util/util";
import { Talents } from "./../domain/talent";

export class TalentApi {
    public static doGet(e: any): GoogleAppsScript.Content.TextOutput {
        var action = e.parameter.action.toLowerCase();
        var callback = e.parameter.callback;

        switch (action) {
            case "getByStation":
                return Util.createJSONOutput(Talents.getByStation(e.parameter.station), callback);
        }
    }
}

function getTalentByStation(station) {
    return Talents.getByStation(station);
}