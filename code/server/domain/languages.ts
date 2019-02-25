///<reference path="../../common/models/station.ts" />
///<reference path="../util/cache.ts" />
///<reference path="../util/constants.ts" />

import { Language } from "./../../common/models/language";

export class Languages {
    public static get(): Language[] {
        return CacheWrapper.ScriptCache.get<Language[]>(CacheConstants.Stations) || Languages.load();
    }
    
    public static load(): Language[] {
        var data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Language").getDataRange().getValues().slice(1);
        var stations = data.map(s => new Language(s)).filter(s => s.isValid());
        
        var chunks = CacheWrapper.ScriptCache.put(CacheConstants.Languages, stations);
        
        return stations;
    }
}