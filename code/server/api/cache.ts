import { Cache } from "../domain/cache";
import { Util } from "../../common/util/util";

export class CacheApi {
    public static doGet(e: any): GoogleAppsScript.HTML.HtmlOutput|GoogleAppsScript.Content.TextOutput {
        var action = e.parameter.action.toLowerCase();
        
        switch (action) {
            case "clear":
                Cache.clear();
                return Util.createJSONOutput("done");
            case "reset":
                Cache.reset();
                return Util.createJSONOutput("done");
            case "peek":
                return Util.createJSONOutput(Cache.peek(e.parameter.key));
        }
    }
}

function reset() {
    Cache.reset();
}

function peek(key) {
    return Cache.peek(key);
}