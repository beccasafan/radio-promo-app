import { Tweet, TweetsByLanguage } from "radio-app-2-shared";
import { groupByProperty, IGroupedEntity, readSheetData } from "../util";
import CacheConstants from "./cache-constants";
import { getScriptCache } from "./cache-wrapper";

const ScriptCache = getScriptCache();

export function resetTweetCache(): void {
  // emptyTweetsCache();
  loadTweets();
}

function emptyTweetsCache(): void {
  const tweetsByLanguage = ScriptCache.get<string[]>(
    CacheConstants.tweetsByLanguage
  );
  if (tweetsByLanguage != null) {
    tweetsByLanguage.forEach(l =>
      ScriptCache.remove(`${CacheConstants.tweetsByLanguage}_${l}`)
    );
    ScriptCache.remove(CacheConstants.tweetsByLanguage);
  }
}

function loadTweets(): string[] {
  console.log({ message: "loading tweets" });

  const tweets = readSheetData("SocialMediaTemplates")
    .map(t => new Tweet(t))
    .filter(t => t.isValid());

  const tweetsByLanguage = groupByProperty(tweets, "languageId");
  const languagesWithTweets = Object.keys(tweetsByLanguage);
  languagesWithTweets.forEach(l => {
    ScriptCache.put(
      `${CacheConstants.tweetsByLanguage}_${l}`,
      tweetsByLanguage[l]
    );
  });

  ScriptCache.put(CacheConstants.tweetsByLanguage, languagesWithTweets);

  return languagesWithTweets;
}

export function getTweetsByLanguage(languageId: string): Tweet[] | undefined {
  let cachedLanguages = ScriptCache.get<string[]>(
    CacheConstants.tweetsByLanguage
  );

  if (cachedLanguages == null) {
    cachedLanguages = loadTweets();
  }

  if (cachedLanguages != null && cachedLanguages.includes(languageId)) {
    return ScriptCache.get<Tweet[]>(
      `${CacheConstants.tweetsByLanguage}_${languageId}`
    );
  }

  return undefined;
}
