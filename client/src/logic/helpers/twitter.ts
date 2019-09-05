import { Tweet, Song, Station, Talent } from "radio-app-2-shared";
import NormalizedEntity from "./normalized-entity";
import NormalizedTweetsByLanguage from "../tweets/tweet-models";

let data: { [languageId: string]: { tweets: Tweet[]; index: number } };
let validData: { [languageId: string]: { tweets: Tweet[]; index: number } };
let song: Song;

export function setSong(s: Song) {
    song = s;

    filterTweets();
}

export function setTweets(tweetsByLanguage: NormalizedEntity<NormalizedTweetsByLanguage>) {
    data = tweetsByLanguage.allIds.reduce((res, languageId) => {
        const languageData = tweetsByLanguage.byId[languageId];
        if (languageData != null) {
            res[languageId] = { tweets: languageData.items, index: 0 };
        }
        return res;
    }, {} as { [languageId: string]: { tweets: Tweet[]; index: number } });

    filterTweets();
}

function filterTweets() {
    if (data == null || song == null) {
        return;
    }

    validData = {};
    Object.keys(data).forEach(language => {
        let tweets = data[language].tweets;

        tweets = tweets.filter(t => (!t.artist || t.artist === song.artist) && (!t.song || t.song === song.id));

        validData[language] = { tweets: tweets, index: 0 };
    });

}

export function getTweet(element: HTMLElement, station: Station, talent?: Talent) {
    let tweet = ".{{target}} {{artist}} {{hashtag}}";


    if (validData != null) {
        const languageData = validData[station.languageId];

        if (languageData != null) {
            validData[station.languageId].index = (languageData.index + 1) % languageData.tweets.length;
            tweet = languageData.tweets[validData[station.languageId].index].text;
        }
    }

    const baseTweet = tweet;

    const target = talent != null ? talent.twitter : station.twitter;
    if (tweet.indexOf("{{target}}") < 0) {
        tweet = `.@${target} ${tweet}`;
    }

    if (song == null) {
        tweet = `.@${target} `;
    }
    else {
        tweet = tweet
            .replace("{{username}}", `${song.twitter}`)
            .replace("{{artist}}", `${song.twitter}`)
            .replace("{{hashtag}}", `${song.hashtag}`)
            .replace("{{target}}", `@${target}`)
            ;
    }

    if (talent != null && talent.hashtag) {
        tweet += ` ${talent.hashtag.indexOf("#") >= 0 ? "" : "#"}${talent.hashtag}`;
    }
    if (station.hashtag) {
        tweet += ` ${station.hashtag.indexOf("#") >= 0 ? "" : "#"}${station.hashtag}`;
    }

    tweet = encodeURIComponent(tweet);
    const url = `https://twitter.com/intent/tweet?text=${tweet}`;
    $(".twitter", element).attr("href", url).data("tweet", baseTweet);
}

