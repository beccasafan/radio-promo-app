import { Search } from "../domain/search";
import { Util } from "./../../common/util/util";

export class SearchApi {
    public static doGet(e: any): GoogleAppsScript.Content.TextOutput {
        var action = e.parameter.action.toLowerCase();
        var callback = e.parameter.callback;
        
        switch (action) {
            case "get":
                return Util.createJSONOutput(Search.getSearchOptions(e.parameter.country), callback);
        }
    }
}
function getSearchOptions(countryId: string) {
    return Search.getSearchOptions(countryId);
}