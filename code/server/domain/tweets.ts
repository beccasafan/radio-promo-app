import { Tweet } from "../../common/models/tweets/tweet";
import { CacheWrapper } from "../util/cache";
import { CacheConstants } from "../util/constants";
import { TweetsByLanguage } from "../../common/models/tweets/tweets";

export class Tweets {
    public static get(): Tweet[] {
        return CacheWrapper.ScriptCache.get<Tweet[]>(CacheConstants.Tweets) || Tweets.load();
    }

    public static load(): Tweet[] {
        var data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("SocialMediaTemplates").getDataRange().getValues().splice(1);
        var tweets = data.map(t => new Tweet(t)).filter(t => t.isValid());

        var chunks = CacheWrapper.ScriptCache.put(CacheConstants.Tweets, tweets);

        return tweets;
    }

    public static getByLanguage(languageId: string): Tweet[] {
        var tweetsInLanguage = CacheWrapper.ScriptCache.get<Tweet[]>(`${CacheConstants.TweetsByLanguage}_${languageId}`);
        if (tweetsInLanguage == null) {
            tweetsInLanguage = Tweets.loadByLanguage(languageId);
        }

        return tweetsInLanguage;
    }

    public static getByLanguages(languageIds: string[]): TweetsByLanguage {
        var result = {};
        languageIds.forEach(languageId => result[languageId] = Tweets.getByLanguage(languageId));

        return result;
    }

    public static loadByLanguage(languageId: string): Tweet[] {
        var tweetsInLanguage = Tweets.get().filter(t => t.languageId === languageId);

        Tweets.cacheByLanguage(languageId, tweetsInLanguage);

        return tweetsInLanguage;
    }

    public static cacheByLanguage(languageId: string, data: Tweet[], cacheMain: boolean = true) {
        var chunks = CacheWrapper.ScriptCache.put(`${CacheConstants.TweetsByLanguage}_${languageId}`, data);

        if (cacheMain) {
            var cachedLanguages = CacheWrapper.ScriptCache.get<string[]>(CacheConstants.TweetsByLanguage) || [];
            var languageIsCached = cachedLanguages.find(l => l === languageId) != null;

            if (!languageIsCached) {
                cachedLanguages.push(languageId);
                CacheWrapper.ScriptCache.put(CacheConstants.TweetsByLanguage, cachedLanguages);
            }
        }
    }

    public static cacheCachedList(languageIds: string[]) {
        CacheWrapper.ScriptCache.put(CacheConstants.TweetsByLanguage, languageIds);
    }

    public static clear() {
        CacheWrapper.ScriptCache.remove(CacheConstants.Tweets);
    }
}