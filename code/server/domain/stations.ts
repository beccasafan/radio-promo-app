import { Station } from "../../common/models/stations/station";
import { StationDetail } from "../../common/models/stations/stationDetail";
import { CacheWrapper } from "../util/cache";
import { CacheConstants } from "../util/constants";

export class Stations {
    public static get(): Station[] {
        var stations = CacheWrapper.ScriptCache.get<Station[]>(CacheConstants.Stations);
        if (stations == null) {
            console.log("Stations not in cache");
            stations = Stations.load();
        }

        return stations;
    }

    public static getByCountry(countryId: string): Station[] {
        var stationsInCountry = CacheWrapper.ScriptCache.get<Station[]>(`${CacheConstants.StationsByCountry}_${countryId}`);
        if (stationsInCountry == null) {
            console.log("Stations by Country " + countryId + " not in cache");
            Stations.loadByCountry(countryId);
        }

        return stationsInCountry;
    }

    public static loadByCountry(countryId: string): Station[] {
        var stationsInCountry = Stations
            .get()
            .filter(s => s.countryId === countryId)
            ;

        var chunks = CacheWrapper.ScriptCache.put(`${CacheConstants.StationsByCountry}_${countryId}`, stationsInCountry);

        var cachedCountries = CacheWrapper.ScriptCache.get<string[]>(CacheConstants.StationsByCountry) || [];
        var countryIsCached = cachedCountries.find(c => c === countryId) != null;

        if (!countryIsCached) {
            console.log("stations by country main key not cached " + countryId);
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