import { Util } from "./../../common/util/util";
import { Talents } from "./../domain/talent";

export class TalentApi {
    public static doGet(e: any): GoogleAppsScript.HTML.HtmlOutput {
        var action = e.parameter.action.toLowerCase();
        
        switch (action) {
            case "get":
                return Util.createJSONOutput(Talents.get());
            case "load":
                return Util.createJSONOutput(Talents.load());
        }
    }
}