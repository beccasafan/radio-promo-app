import getJSON from 'src/logic/api';
import { TweetsByLanguage } from 'radio-app-2-shared';

export function getTweetsByLanguages(languages: string[]): Promise<TweetsByLanguage> {
    return getJSON<TweetsByLanguage>({
        directFunction: "getTweetsByLanguages",
        url: `?item=getTweetsByLanguages&languages=${languages}`,
        parameters: [languages]
    });
}