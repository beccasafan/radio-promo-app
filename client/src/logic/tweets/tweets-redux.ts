import { getTweetsByLanguages as getTweetsByLanguageApi } from 'src/logic/tweets/tweets-api';
import { IAJAXState } from "../helpers/types";
import { getFactories } from "../helpers/helper";
import { TweetsByLanguage } from "radio-app-2-shared";
import { Success } from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import NormalizedTweetsByLanguage from "./tweet-models";
import { AppState } from '../store';
import { setTweets } from '../helpers/twitter';

export class TweetsState extends IAJAXState<NormalizedTweetsByLanguage> {}

const factories = getFactories<TweetsState>("tweets");
const getTweetsByLanguage = factories.async<string[], TweetsByLanguage>(
    "get-tweets-by-language",
    async (languages) => {
        return await getTweetsByLanguageApi(languages);
    },
);

const handleGetTweetsByLanguagesDone = (state: TweetsState, response: Success<string[], TweetsByLanguage>): TweetsState => {
    const tweetsByLanguage = Object.keys(response.result).map(k => ({ id: k, items: response.result[k]}));
    const items = state.items.addItems(tweetsByLanguage);
    setTweets(items);
    return ({
        ...state,
        items: items
    });
};

const stationsState = new TweetsState();
const reducer = reducerWithInitialState(stationsState)
    .case(getTweetsByLanguage.async.done, handleGetTweetsByLanguagesDone)
;

const actions = { getTweetsByLanguage };
export { reducer, actions };