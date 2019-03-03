import { Countries } from "./countries";
import { Stations } from "./stations";
import { Talents } from "./talent";
import { CacheWrapper } from "../util/cache";
import { CacheConstants } from "../util/constants";
import { SyndicatedShows } from "./syndicated";

export class Cache {
    public static reset() {
        Cache.clear();
        Cache.load();
    }

    private static clear() {
        Countries.clear();
        Stations.clear();
        Talents.clear();
        SyndicatedShows.clear();
    }

    private static load() {
        var countries = Countries.load();
        var stations = Stations.load();
        var talent = Talents.load();
        var syndicatedTalent = SyndicatedShows.load();

        var talentByStation = talent.reduce((talentByStation, talent) => {
            var stationGroup = talentByStation[talent.stationId] || [];
            stationGroup.push(talent);
            talentByStation[talent.stationId] = stationGroup;
            return talentByStation;
        }, {});

        Object.keys(talentByStation).forEach(s => Talents.cacheByStation(s, talentByStation[s]));

        var syndicatedTalentByStation = syndicatedTalent.reduce((syndicatedTalentByStation, syndicatedTalent) => {
            var stationGroup = syndicatedTalentByStation[syndicatedTalent.stationId] || [];
            stationGroup.push(syndicatedTalent);
            syndicatedTalentByStation[syndicatedTalent.stationId] = stationGroup;
            return syndicatedTalentByStation;
        }, {})

        var stationsByCountry = stations.reduce((stationsByCountry, s) => {
            var countryGroup = stationsByCountry[s.countryId] || [];
            var station = Object.assign({}, s, { talent: (talentByStation[s.id] || []).length, syndicated: (syndicatedTalentByStation[s.id] || []).length });

            countryGroup.push(station);
            stationsByCountry[station.countryId] = countryGroup;
            return stationsByCountry;
        }, {});

        Object.keys(stationsByCountry).forEach(c => Stations.cacheByCountry(c, stationsByCountry[c]));

        console.log("talent by station", talentByStation);
        console.log("stations by country", stationsByCountry);
    }

    public static peek(key: string) {
        return CacheWrapper.ScriptCache.get(key);
    }
}