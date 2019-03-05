import { Tweet } from "./tweet";

export class TweetsByLanguage {
    [languageId: string]: Tweet[]
}