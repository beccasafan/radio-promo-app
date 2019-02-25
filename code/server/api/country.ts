import { Util } from "./../../common/util/util";
import { Countries } from "./../domain/countries";

export class CountryApi {
    public static doGet(e: any): GoogleAppsScript.HTML.HtmlOutput {
        var action = e.parameter.action.toLowerCase();
        
        switch (action) {
            case "get":
                return Util.createJSONOutput(Countries.get());
            case "load":
                return Util.createJSONOutput(Countries.load());
            case "summarize":
                return Util.createJSONOutput(Countries.summarize());
        }
    }
}

function getCountrySummaries() {
    return Countries.summarize();
}