import Tweet from "./tweet";

export default class TweetsByLanguage {
  [languageId: string]: Tweet[];
}
