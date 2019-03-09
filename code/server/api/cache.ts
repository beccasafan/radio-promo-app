import { Cache } from "../domain/cache";
import { Util } from "../../common/util/util";

export class CacheApi {
    public static doGet(e: any): GoogleAppsScript.Content.TextOutput {
        var action = e.parameter.action.toLowerCase();
        var callback = e.parameter.callback;
        
        switch (action) {
            case "reset":
                Cache.reset();
                return Util.createJSONOutput("done", callback);
            case "peek":
                return Util.createJSONOutput(Cache.peek(e.parameter.key), callback);
        }
    }
}

function reset() {
    Cache.reset();
}

function peek(key) {
    return Cache.peek(key);
}