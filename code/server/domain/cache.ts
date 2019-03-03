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

export class Cache {
    public static reset() {
        Cache.clear();
        Cache.load();
    }

    private static clear() {
        Monitors.clear();
        Formats.clear();
        Countries.clear();
        Stations.clear();
        Talents.clear();
        SyndicatedShows.clear();
    }

    private static load() {
        var monitors = Monitors.load();
        var formats = Formats.load();
        var countries = Countries.load();
        var stations = Stations.load();
        var talent = Talents.load();
        var syndicatedTalent = SyndicatedShows.load();

        var monitorsByCountry = Util.groupBy(monitors, "countryId");
        Object.keys(monitorsByCountry).forEach(c => Monitors.cacheByCountry(c, monitorsByCountry[c]));

        var formatSummaries: FormatSummary[] = formats.map(f => 
            {
                var monitor = monitor.find(m => m.id === f.monitorId);
                return Object.assign({}, f, {countryId: monitor.countryId, monitor: monitor.name});
            }
        );
        var formatsByCountry = Util.groupBy(formatSummaries, "countryId");
        Object.keys(formatsByCountry).forEach(c => Formats.cacheByCountry(c, formatsByCountry[c]));

        var talentByStation = Util.groupBy(talent, "stationId");
        Object.keys(talentByStation).forEach(s => Talents.cacheByStation(s, talentByStation[s]));

        var syndicatedTalentByStation = Util.groupBy(syndicatedTalent, "stationId");
        Object.keys(syndicatedTalentByStation).forEach(s => SyndicatedShows.cacheByStation(s, syndicatedTalentByStation[s]));

        var stationSummaries = stations.map(s => {
            var talent = talentByStation[s.id] || [];
            var syndicatedTalent = syndicatedTalentByStation[s.id] || [];
            return Object.assign({}, s, { talent: talent.length, syndicated: syndicatedTalent.length });
        });
        var stationsByCountry = Util.groupBy(stations, "countryId");
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