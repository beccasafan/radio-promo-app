///<reference path="../../common/models/station.ts" />
///<reference path="../util/cache.ts" />
///<reference path="../util/constants.ts" />

import { Station } from "./../../common/models/station";

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

    public static load(): Station[] {
        var data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Station").getDataRange().getValues().slice(1);
        var stations = data.map(s => new Station(s)).filter(s => s.isValid());

        var chunks = CacheWrapper.ScriptCache.put(CacheConstants.Stations, stations);

        return stations;
    }
}