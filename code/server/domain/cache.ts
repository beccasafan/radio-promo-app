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
        Cache.clear();
        Cache.load();
    }

    private static clear() {
        Languages.clear();
        Monitors.clear();
        Formats.clear();
        Countries.clear();
        Stations.clear();
        Talents.clear();
        SyndicatedShows.clear();
    }

    private static load() {
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
        Object.keys(tweetsByLanguage).forEach(l => Tweets.cacheByLanguage(l, tweetsByLanguage[l]));
        
        var monitorsByCountry = Util.groupByProperty(monitors, "countryId");
        Object.keys(monitorsByCountry).forEach(c => Monitors.cacheByCountry(c, monitorsByCountry[c]));

        var formatSummaries: FormatSummary[] = formats.map(f => 
            {
                var monitor = monitors.find(m => m.id === f.monitorId);
                return Object.assign({}, f, {countryId: monitor.countryId, monitor: monitor.name});
            }
        );
        var formatsByCountry = Util.groupByProperty(formatSummaries, "countryId");
        Object.keys(formatsByCountry).forEach(c => Formats.cacheByCountry(c, formatsByCountry[c]));

        var talentByStation = Util.groupByProperty(talent, "stationId");
        Object.keys(talentByStation).forEach(s => Talents.cacheByStation(s, talentByStation[s]));

        var syndicatedTalentByStation = Util.groupByProperty(syndicatedTalent, "stationId");
        Object.keys(syndicatedTalentByStation).forEach(s => SyndicatedShows.cacheByStation(s, syndicatedTalentByStation[s]));

        var stationSummaries = stations.map(s => {
            var talent = talentByStation[s.id] || [];
            var syndicatedTalent = syndicatedTalentByStation[s.id] || [];
            return Object.assign({}, s, { talent: talent.length, syndicated: syndicatedTalent.length });
        });
        var stationsByCountry = Util.groupByProperty(stationSummaries, "countryId");
        Object.keys(stationsByCountry).forEach(c => Stations.cacheByCountry(c, stationsByCountry[c]));

        var countrySummaries = countries.map(c => {
            var stations = stationsByCountry[c.id] || [];
            return Object.assign({}, c, { stations: stations.length })
        }).filter(c => c.stations > 0);
        CacheWrapper.ScriptCache.put(CacheConstants.CountrySummaries, countrySummaries);
    }

    public static peek(key: string) {
        return CacheWrapper.ScriptCache.get(key);
    }
}