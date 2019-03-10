import { Station } from "../../common/models/stations/station";
import { StationSummary } from "../../common/models/stations/stationSummary";
import { StationDetail } from "../../common/models/stations/stationDetail";
import { CacheWrapper } from "../util/cache";
import { CacheConstants } from "../util/constants";
import { Talents } from "./talent";
import { SyndicatedShows } from "./syndicated";
import { SyndicatedTalent } from "../../common/models/syndicated/syndicated";
import { Util } from "../../common/util/util";
import { Talent } from "../../common/models/talent/talent";

export class Stations {
    public static get(): Station[] {
        return CacheWrapper.ScriptCache.get<Station[]>(CacheConstants.Stations) || Stations.load();
    }

    public static load(cache: boolean = true): Station[] {
        var data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Station").getDataRange().getValues().slice(1);
        var stations = data.map(s => new Station(s)).filter(s => s.isValid());

        if (cache) {
            var chunks = CacheWrapper.ScriptCache.put(CacheConstants.Stations, stations);
        }
        return stations;
    }

    public static getByCountry(countryId: string): StationSummary[] {
        var stationsInCountry = CacheWrapper.ScriptCache.get<StationSummary[]>(`${CacheConstants.StationsByCountry}_${countryId}`);
        if (stationsInCountry == null) {
            stationsInCountry = Stations.loadByCountry(countryId);
        }

        return stationsInCountry;
    }

    public static loadByCountry(countryId: string): StationSummary[] {
        var talent = Talents.get();
        var talentByStation = Util.groupByProperty(talent, "stationId");
        var syndicatedTalent = SyndicatedShows.get();
        var syndicatedTalentByStation = Util.groupByProperty(syndicatedTalent, "stationId");

        var stationsInCountry = Stations.get().filter(s => s.countryId === countryId);
        var stationSummaries = stationsInCountry.map(s => {
            var talent = talentByStation[s.id] || ([] as Talent[]);
            var syndicatedTalent = syndicatedTalentByStation[s.id] || [];
            return Object.assign({}, s, { talent: talent.length, syndicated: syndicatedTalent.length, talentNames: talent.map(t => t.name) });
        });


        Stations.cacheByCountry(countryId, stationSummaries);

        return stationSummaries;
    }

    public static cacheByCountry(countryId: string, data: StationSummary[], cacheMain: boolean = true) {
        var chunks = CacheWrapper.ScriptCache.put(`${CacheConstants.StationsByCountry}_${countryId}`, data);

        if (cacheMain) {
            var cachedCountries = CacheWrapper.ScriptCache.get<string[]>(CacheConstants.StationsByCountry) || [];
            var countryIsCached = cachedCountries.find(c => c === countryId) != null;

            if (!countryIsCached) {
                cachedCountries.push(countryId);
                CacheWrapper.ScriptCache.put(CacheConstants.StationsByCountry, cachedCountries);
            }
        }
    }

    public static cacheCachedList(countryIds: string[]) {
        CacheWrapper.ScriptCache.put(CacheConstants.StationsByCountry, countryIds);
    }

    public static getByCode(code: string): StationDetail {
        var station = Stations.get().find(s => s.code === code);
        var talent = Talents.getByStation(station.id);
        var syndicatedTalent = SyndicatedShows.getByStation(station.id).map(t => Talents.getById(t.showId));
        var detail = Object.assign({}, station, { talent: talent, syndicatedTalent: syndicatedTalent });
        return detail;
    }

    public static clear() {
        CacheWrapper.ScriptCache.remove(CacheConstants.Stations);

        var stationsByCountry = CacheWrapper.ScriptCache.get<string[]>(CacheConstants.StationsByCountry);
        if (stationsByCountry != null) {
            stationsByCountry.forEach(c => CacheWrapper.ScriptCache.remove(`${CacheConstants.StationsByCountry}_${c}`));
            CacheWrapper.ScriptCache.remove(CacheConstants.StationsByCountry);
        }
    }
}