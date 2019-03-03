import { CacheWrapper } from "../util/cache";
import { Format } from "../../common/models/formats/format";
import { CacheConstants } from "../util/constants";
import { FormatSummary } from "../../common/models/formats/formatSummary";
import { Monitors } from "./monitors";

export class Formats {
    public static get(): Format[] {
        var formats = CacheWrapper.ScriptCache.get<Format[]>(CacheConstants.Formats);
        if (formats == null) {
            formats = Formats.load();
        }

        return formats;
    }

    public static getByCountry(countryId: string): Format[] {
        var formatsInCountry = CacheWrapper.ScriptCache.get<Format[]>(`${CacheConstants.FormatsByCountry}_${countryId}`);
        if (formatsInCountry == null) {
            formatsInCountry = Formats.loadByCountry(countryId);
        }

        return formatsInCountry;
    }

    public static load(cache: boolean = true): Format[] {
        var data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Format").getDataRange().getValues().splice(1);
        var formats = data.map(t => new Format(t)).filter(t => t.isValid());

        if (cache) {
            var chunks = CacheWrapper.ScriptCache.put(CacheConstants.Formats, formats);
        }
        
        return formats;
    }

    public static loadByCountry(countryId: string): FormatSummary[] {
        var monitors = Monitors.get();
        
        var formatsInCountry = Formats.get().filter(f => f.countryId === countryId).map(f => {
            var monitor = monitors.find(m => m.id === f.monitorId);
            return Object.assign({}, f, {countryId: monitor.countryId, monitor: monitor.name});
        });

        Formats.cacheByCountry(countryId, formatsInCountry);

        return formatsInCountry;
    }

    public static cacheByCountry(stationId: string, data: FormatSummary[]) {
        var chunks = CacheWrapper.ScriptCache.put(`${CacheConstants.TalentByStation}_${stationId}`, data);

        var cachedStations = CacheWrapper.ScriptCache.get<string[]>(CacheConstants.TalentByStation) || [];
        var stationIsCached = cachedStations.find(s => s === stationId) != null;

        if (!stationIsCached) {
            cachedStations.push(stationId);
            CacheWrapper.ScriptCache.put(CacheConstants.TalentByStation, cachedStations);
        }
    }

    public static clear() {
        CacheWrapper.ScriptCache.remove(CacheConstants.Formats);

        var formatsByCountry = CacheWrapper.ScriptCache.get<string[]>(CacheConstants.FormatsByCountry);
        if (formatsByCountry != null) {
            formatsByCountry.forEach(c => CacheWrapper.ScriptCache.remove(`${CacheConstants.FormatsByCountry}_${c}`));
            CacheWrapper.ScriptCache.remove(CacheConstants.FormatsByCountry);
        }
    }
}