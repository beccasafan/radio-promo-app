import { Util } from "./../../common/util/util";
import { Countries } from "./../domain/countries";

export class CountryApi {
    public static doGet(e: any): GoogleAppsScript.Content.TextOutput {
        var action = e.parameter.action.toLowerCase();
        var callback = e.parameter.callback;
        switch (action) {
            case "summarize":
                return Util.createJSONOutput(Countries.summarize(), callback);
        }
    }
}

function getCountrySummaries() {
    return Countries.summarize();
}