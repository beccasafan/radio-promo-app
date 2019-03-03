import { Monitor } from "../../common/models/monitor";
import { CacheWrapper } from "../util/cache";
import { CacheConstants } from "../util/constants";

export class Monitors {
    public static get(): Monitor[] {
        var monitors = CacheWrapper.ScriptCache.get<Monitor[]>(CacheConstants.Monitors);
        if (monitors == null) {
            monitors = Monitors.load();
        }

        return monitors;
    }

    public static load(): Monitor[] {
        var data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Monitor").getDataRange().getValues().splice(1);
        var monitors = data.map(t => new Monitor(t)).filter(t => t.isValid());

        var chunks = CacheWrapper.ScriptCache.put(CacheConstants.Monitors, monitors);
        
        return monitors;
    }

    public static getByCountry(countryId): Monitor[] {
        var monitorsInCountry = CacheWrapper.ScriptCache.get<Monitor[]>(CacheConstants.MonitorsByCountry);
        if (monitorsInCountry == null) {
            monitorsInCountry = Monitors.loadByCountry(countryId);
        }

        return monitorsInCountry;
    }

    public static loadByCountry(countryId): Monitor[] {
        var monitorsInCountry = Monitors.get().filter(m => m.countryId === countryId);

        Monitors.cacheByCountry(countryId, monitorsInCountry);

        return monitorsInCountry;
    }

    public static cacheByCountry(countryId: string, data: Monitor[]) {
        var chunks = CacheWrapper.ScriptCache.put(`${CacheConstants.MonitorsByCountry}_${countryId}`, data);

        var cachedCountries = CacheWrapper.ScriptCache.get<string[]>(CacheConstants.MonitorsByCountry) || [];
        var countryIsCached = cachedCountries.find(c => c === countryId) != null;

        if (!countryIsCached) {
            cachedCountries.push(countryId);
            CacheWrapper.ScriptCache.put(CacheConstants.MonitorsByCountry, cachedCountries);
        }
    }

    
    public static clear() {
        CacheWrapper.ScriptCache.remove(CacheConstants.Monitors);

        var monitorsByCountry = CacheWrapper.ScriptCache.get<string[]>(CacheConstants.MonitorsByCountry);
        if (monitorsByCountry != null) {
            monitorsByCountry.forEach(c => CacheWrapper.ScriptCache.remove(`${CacheConstants.MonitorsByCountry}_${c}`));
            CacheWrapper.ScriptCache.remove(CacheConstants.MonitorsByCountry);
        }
    }
}