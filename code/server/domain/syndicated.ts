import { SyndicatedTalent } from "../../common/models/syndicated/syndicated";
import { CacheWrapper } from "../util/cache";
import { CacheConstants } from "../util/constants";
import { SyndicatedTalentSummary } from "../../common/models/syndicated/syndicatedSummary";

export class SyndicatedShows {
    public static get(): SyndicatedTalent[] {
        var shows = CacheWrapper.ScriptCache.get<SyndicatedTalent[]>(CacheConstants.SyndicatedTalent);
        if (shows == null) {
            shows = SyndicatedShows.load();
        }

        return shows;
    }

    public static getByStation(stationId: string): SyndicatedTalent[] {
        var syndicatedTalentInStation = CacheWrapper.ScriptCache.get<SyndicatedTalent[]>(`${CacheConstants.SyndicatedTalentByStation}_${stationId}`);
        if (syndicatedTalentInStation == null) {
            syndicatedTalentInStation = SyndicatedShows.loadByStation(stationId);
        }

        return syndicatedTalentInStation;
    }

    public static cacheByStation(stationId: string, data: SyndicatedTalent[], cacheMain: boolean = true) {
        var chunks = CacheWrapper.ScriptCache.put(`${CacheConstants.SyndicatedTalentByStation}_${stationId}`, data);

        if (cacheMain) {
            var cachedStations = CacheWrapper.ScriptCache.get<string[]>(CacheConstants.SyndicatedTalentByStation) || [];
            var stationIsCached = cachedStations.find(s => s === stationId) != null;

            if (stationIsCached) {
                cachedStations.push(stationId);
                CacheWrapper.ScriptCache.put(CacheConstants.SyndicatedTalentByStation, cachedStations);
            }
        }
    }

    public static cacheCachedStationList(stationIds: string[]) {
        CacheWrapper.ScriptCache.put(CacheConstants.SyndicatedTalentByStation, stationIds);
    }

    public static cacheByCountry(countryId: string, data: SyndicatedTalentSummary[], cacheMain: boolean = true) {
        var chunk = CacheWrapper.ScriptCache.put(`${CacheConstants.SyndicatedTalentByCountry}_${countryId}`, data);

        if (cacheMain) {
            var cachedCountries = CacheWrapper.ScriptCache.get<string[]>(CacheConstants.SyndicatedTalentByCountry) || [];
            var countryIsCached = cachedCountries.find(c => c === countryId) != null;

            if (!countryIsCached) {
                cachedCountries.push(countryId);
                CacheWrapper.ScriptCache.put(CacheConstants.SyndicatedTalentByCountry, cachedCountries);
            }
        }
    }

    public static cacheCachedCountryList(countryIds: string[]) {
        CacheWrapper.ScriptCache.put(CacheConstants.SyndicatedTalentByCountry, countryIds);
    }

    public static load(): SyndicatedTalent[] {
        var data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("SyndicatedTalent").getDataRange().getValues().slice(1);
        var syndicatedTalent = data.map(t => new SyndicatedTalent(t)).filter(s => s.isValid());

        var chunks = CacheWrapper.ScriptCache.put(CacheConstants.SyndicatedTalent, syndicatedTalent);

        return syndicatedTalent;
    }

    public static loadByStation(stationId: string): SyndicatedTalent[] {
        var syndicatedTalentInStation = SyndicatedShows.get().filter(t => t.stationId === stationId);

        SyndicatedShows.cacheByStation(stationId, syndicatedTalentInStation);

        return syndicatedTalentInStation;
    }
    
    public static clear() {
        CacheWrapper.ScriptCache.remove(CacheConstants.SyndicatedTalent);

        var syndicatedTalentByStation = CacheWrapper.ScriptCache.get<string[]>(CacheConstants.SyndicatedTalentByStation);
        if (syndicatedTalentByStation != null) {
            syndicatedTalentByStation.forEach(s => CacheWrapper.ScriptCache.remove(`${CacheConstants.SyndicatedTalentByStation}_${s}`));
            CacheWrapper.ScriptCache.remove(CacheConstants.SyndicatedTalentByStation);
        }
        
        var syndicatedTalentByCountry = CacheWrapper.ScriptCache.get<string[]>(CacheConstants.SyndicatedTalentByCountry);
        if (syndicatedTalentByCountry != null) {
            syndicatedTalentByCountry.forEach(c => CacheWrapper.ScriptCache.remove(`${CacheConstants.SyndicatedTalentByCountry}_${c}`));
            CacheWrapper.ScriptCache.remove(CacheConstants.SyndicatedTalentByCountry);
        }
    }
}