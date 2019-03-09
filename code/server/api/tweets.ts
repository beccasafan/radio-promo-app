import { Tweet } from "../../common/models/tweets/tweet";
import { TweetsByLanguage } from "../../common/models/tweets/tweets";
import { Tweets } from "../domain/tweets";
import { Util } from "../../common/util/util";

export class TweetApi {
    public static doGet(e: any): GoogleAppsScript.Content.TextOutput {
        var action = e.parameter.action.toLowerCase();
        var callback = e.parameter.callback;

        switch (action) {
            case "getbylanguages":
                return Util.createJSONOutput(Tweets.getByLanguages(e.parameters.languages), callback)
        }
    }
}
function getTweetsByLanguages(language): TweetsByLanguage {
    return Tweets.getByLanguages(language);
}