import { Countries } from "./countries";
import { Stations } from "./stations";
import { Talents } from "./talent";
import { CacheWrapper } from "../util/cache";
import { CacheConstants } from "../util/constants";
import { SyndicatedShows } from "./syndicated";
import { Monitors } from "./monitors";
import { Formats } from "./formats";
import { Util } from "../../common/util/util";

import { FormatSummary } from "./../../common/models/formats/formatSummary";
import { Languages } from "./languages";
import { Tweets } from "./tweets";

export class Cache {
    public static reset() {
        console.log("Resetting cache")
        Cache.clear();
        Cache.load();
    }

    private static clear() {
        console.log("Clearing");
        Languages.clear();
        Tweets.clear();
        Monitors.clear();
        Formats.clear();
        Countries.clear();
        Stations.clear();
        Talents.clear();
        SyndicatedShows.clear();
        console.log("Cleared");
    }

    private static load() {
        console.log("Loading");
        var languages = Languages.load();
        var tweets = Tweets.load();
        var monitors = Monitors.load();
        var formats = Formats.load();
        var countries = Countries.load();
        var stations = Stations.load();
        var talent = Talents.load();
        var syndicatedTalent = SyndicatedShows.load();

        // no additional processing for languages
        
        var tweetsByLanguage = Util.groupByProperty(tweets, "languageId");
        var languagesWithTweets = Object.keys(tweetsByLanguage);
        languagesWithTweets.forEach(l => Tweets.cacheByLanguage(l, tweetsByLanguage[l], false));
        Tweets.cacheCachedList(languagesWithTweets);
        
        var monitorsByCountry = Util.groupByProperty(monitors, "countryId");
        var countriesWithMonitor = Object.keys(monitorsByCountry);
        countriesWithMonitor.forEach(c => Monitors.cacheByCountry(c, monitorsByCountry[c], false));
        Monitors.cacheCachedList(countriesWithMonitor);

        var formatSummaries: FormatSummary[] = formats.map(f => 
            {
                var monitor = monitors.find(m => m.id === f.monitorId);
                return Object.assign({}, f, {countryId: monitor.countryId, monitor: monitor.name});
            }
        );
        var formatsByCountry = Util.groupByProperty(formatSummaries, "countryId");
        var countriesWithFormat = Object.keys(formatsByCountry);
        countriesWithFormat.forEach(c => Formats.cacheByCountry(c, formatsByCountry[c], false));
        Formats.cacheCachedList(countriesWithFormat);

        var talentByStation = Util.groupByProperty(talent, "stationId");
        var stationsWithTalent = Object.keys(talentByStation);
        stationsWithTalent.forEach(s => Talents.cacheByStation(s, talentByStation[s], false));
        Talents.cacheCachedList(stationsWithTalent);

        var syndicatedTalentByStation = Util.groupByProperty(syndicatedTalent, "stationId");
        var stationsWithSyndicatedTalent = Object.keys(syndicatedTalentByStation);
        stationsWithSyndicatedTalent.forEach(s => SyndicatedShows.cacheByStation(s, syndicatedTalentByStation[s], false));
        SyndicatedShows.cacheCachedList(stationsWithSyndicatedTalent);

        var stationSummaries = stations.map(s => {
            var talent = talentByStation[s.id] || [];
            var syndicatedTalent = syndicatedTalentByStation[s.id] || [];
            return Object.assign({}, s, { talent: talent.length, syndicated: syndicatedTalent.length });
        });
        var stationsByCountry = Util.groupByProperty(stationSummaries, "countryId");
        var countriesWithStations = Object.keys(stationsByCountry);
        countriesWithStations.forEach(c => Stations.cacheByCountry(c, stationsByCountry[c], false));
        Stations.cacheCachedList(countriesWithStations);

        var countrySummaries = countries.map(c => {
            var stations = stationsByCountry[c.id] || [];
            return Object.assign({}, c, { stations: stations.length })
        }).filter(c => c.stations > 0);
        CacheWrapper.ScriptCache.put(CacheConstants.CountrySummaries, countrySummaries);
        console.log("Loaded");
    }

    public static peek(key: string) {
        return CacheWrapper.ScriptCache.get(key);
    }
}