import { Tweet } from "../../../common/models/tweets/tweet";
import { TweetsByLanguage } from "../../../common/models/tweets/tweets";
import { Util } from "../../../common/util/util";

export class TweetGenerator {
    private tweets: TweetsByLanguage;
    private currentIndex: number;

    constructor(tweets: TweetsByLanguage) {
        this.tweets = {};

        Object.keys(tweets).forEach(language => this.tweets[language] = Util.shuffle(tweets[language]));
    }

    get(languageId: string, target: string) {
        this.currentIndex = (this.currentIndex + 1) % this.tweets[languageId].length;
        var tweet = this.tweets[languageId][this.currentIndex].text;

        if (tweet.indexOf("{{target}}") < 0) {
            tweet = `.@${target} ${tweet}`;
        }

        tweet = tweet
            .replace("{{username}}", "@Louis_Tomlinson")
            .replace("{{artist}}", "@Louis_Tomlinson")
            .replace("{{hashtag}}", "#TwoOfUs")
            .replace("{{target}}", target)
        ;

        return tweet;
    }


}