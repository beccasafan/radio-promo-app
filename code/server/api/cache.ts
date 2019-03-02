import { Cache } from "../domain/cache";
import { Util } from "../../common/util/util";

export class CacheApi {
    public static doGet(e: any): GoogleAppsScript.HTML.HtmlOutput|GoogleAppsScript.Content.TextOutput {
        var action = e.parameter.action.toLowerCase();
        
        switch (action) {
            case "reset":
                Cache.reset();
                return ContentService.createTextOutput("Done.");
        }
    }
}

function reset() {
    Cache.reset();
}