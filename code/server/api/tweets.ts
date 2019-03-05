import { Tweet } from "../../common/models/tweets/tweet";
import { TweetsByLanguage } from "../../common/models/tweets/tweets";
import { Tweets } from "../domain/tweets";

function getTweetsByLanguage(languageIds): TweetsByLanguage {
    return Tweets.getByLanguages(languageIds);
}