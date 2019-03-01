import { Station } from "../../common/models/stations/station";
import { StationDetail } from "../../common/models/stations/stationDetail";
import { CacheWrapper } from "../util/cache";
import { CacheConstants } from "../util/constants";

export class Stations {
    public static get(): Station[] {
        return CacheWrapper.ScriptCache.get<Station[]>(CacheConstants.Stations) || Stations.load();
    }

    public static getByCountry(countryId: string): Station[] {
        return CacheWrapper.ScriptCache.get<Station[]>(`${CacheConstants.StationsByCountry}_${countryId}`) || Stations.loadByCountry(countryId);
    }

    public static loadByCountry(countryId: string): Station[] {
        var stationsInCountry = Stations
            .get()
            .filter(s => s.countryId === countryId)
            ;

        var chunks = CacheWrapper.ScriptCache.put(`${CacheConstants.StationsByCountry}_${countryId}`, stationsInCountry);
        
        return stationsInCountry;
    }

    public static getByCode(code: string): StationDetail {
        var station = Stations.get().find(s => s.code === code) as StationDetail;

        return station;
    }

    public static load(): Station[] {
        console.log("resetting stations");
        var data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Station").getDataRange().getValues().slice(1);
        var stations = data.map(s => new Station(s)).filter(s => s.isValid());
        console.log("loaded " + stations.length + " stations");
        var chunks = CacheWrapper.ScriptCache.put(CacheConstants.Stations, stations);

        return stations;
    }
}