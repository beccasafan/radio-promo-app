import { Station } from "../../common/models/stations/station";
import { StationSummary } from "../../common/models/stations/stationSummary";
import { StationDetail } from "../../common/models/stations/stationDetail";
import { CacheWrapper } from "../util/cache";
import { CacheConstants } from "../util/constants";
import { Talents } from "./talent";

export class Stations {
    public static get(): Station[] {
        var stations = CacheWrapper.ScriptCache.get<Station[]>(CacheConstants.Stations);
        if (stations == null) {
            stations = Stations.load();
        }

        return stations;
    }

    public static getByCountry(countryId: string): StationSummary[] {
        var stationsInCountry = CacheWrapper.ScriptCache.get<StationSummary[]>(`${CacheConstants.StationsByCountry}_${countryId}`);
        if (stationsInCountry == null) {
            var stations = Stations.loadByCountry(countryId);

            stationsInCountry = stations.map(s => {
                var talent = Talents.getByStation(station.id);
                var station = Object.assign({}, s, { talent: talent != null ? talent.length : 0});
                return station;
            });
        }

        return stationsInCountry;
    }

    public static loadByCountry(countryId: string): Station[] {
        var stationsInCountry = Stations.get().filter(s => s.countryId === countryId);

        var chunks = CacheWrapper.ScriptCache.put(`${CacheConstants.StationsByCountry}_${countryId}`, stationsInCountry);

        var cachedCountries = CacheWrapper.ScriptCache.get<string[]>(CacheConstants.StationsByCountry) || [];
        var countryIsCached = cachedCountries.find(c => c === countryId) != null;

        if (!countryIsCached) {
            cachedCountries.push(countryId);
            CacheWrapper.ScriptCache.put(CacheConstants.StationsByCountry, cachedCountries);
        }

        return stationsInCountry;
    }

    public static getByCode(code: string): StationDetail {
        var station = Stations.get().find(s => s.code === code) as StationDetail;

        return station;
    }

    public static load(): Station[] {
        var data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Station").getDataRange().getValues().slice(1);
        var stations = data.map(s => new Station(s)).filter(s => s.isValid());

        var chunks = CacheWrapper.ScriptCache.put(CacheConstants.Stations, stations);

        return stations;
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