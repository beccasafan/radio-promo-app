import { Countries } from "./countries";
import { Stations } from "./stations";
import { Talents } from "./talent";
import { CacheWrapper } from "../util/cache";
import { CacheConstants } from "../util/constants";

export class Cache {
    public static reset() {
        Cache.clear();

        Cache.load();
    }

    private static clear() {
        Countries.clear();
        Stations.clear();
        Talents.clear();
    }

    private static load() {
        var countries = Countries.load();

        var stations = Stations.load();

        var talent = Talents.load();

        var talentByStation = talent.reduce((talentByStation, talent) => {
            var stationGroup = talentByStation[talent.stationId] || [];
            stationGroup.push(talent);
            talentByStation[talent.stationId] = stationGroup;
            return talentByStation;
        }, {});

        Object.keys(talentByStation).forEach(s => Talents.cacheByStation(s, talentByStation[s]));

        var stationsByCountry = stations.reduce((stationsByCountry, s) => {
            var countryGroup = stationsByCountry[s.countryId] || [];

            var talentCount = talentByStation[s.id];

            var station = Object.assign({}, s, { talent: talentCount });

            countryGroup.push(station);
            stationsByCountry[station.countryId] = countryGroup;
            return stationsByCountry;
        }, {});

        Object.keys(stationsByCountry).forEach(c => Stations.cacheByCountry(c, stationsByCountry[c]));

        console.log("talent by station", talentByStation);
        console.log("stations by country", stationsByCountry);
    }
}