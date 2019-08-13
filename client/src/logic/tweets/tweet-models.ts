import { Tweet } from "radio-app-2-shared";

export default interface NormalizedTweetsByLanguage {
    id: string;
    items: Tweet[];
}