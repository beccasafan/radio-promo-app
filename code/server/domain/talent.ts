import { CacheWrapper } from "../util/cache";
import { Talent } from "../../common/models/talent/talent";
import { CacheConstants } from "../util/constants";

export class Talents {
    public static get(): Talent[] {
        var talent = CacheWrapper.ScriptCache.get<Talent[]>(CacheConstants.Talent);
        if (talent == null) {
            talent = Talents.load();
        }

        return talent;
    }

    public static getByStation(stationId: string): Talent[] {
        var talentInStation = CacheWrapper.ScriptCache.get<Talent[]>(`${CacheConstants.TalentByStation}_${stationId}`);
        if (talentInStation == null) {
            talentInStation = Talents.loadByStation(stationId);
        }

        return talentInStation;
    }

    public static load(): Talent[] {
        var data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Talent").getDataRange().getValues().splice(1);
        var talent = data.map(t => new Talent(t)).filter(t => t.isValid());

        var chunks = CacheWrapper.ScriptCache.put(CacheConstants.Talent, talent);

        return talent;
    }

    public static loadByStation(stationId: string): Talent[] {
        var talentInStation = Talents.get().filter(t => t.stationId === stationId);

        Talents.cacheByStation(stationId, talentInStation);

        return talentInStation;
    }

    public static cacheByStation(stationId: string, data: Talent[]) {
        var chunks = CacheWrapper.ScriptCache.put(`${CacheConstants.TalentByStation}_${stationId}`, data);

        var cachedStations = CacheWrapper.ScriptCache.get<string[]>(CacheConstants.TalentByStation) || [];
        var stationIsCached = cachedStations.find(s => s === stationId) != null;

        if (!stationIsCached) {
            cachedStations.push(stationId);
            CacheWrapper.ScriptCache.put(CacheConstants.TalentByStation, cachedStations);
        }
    }

    public static clear() {
        CacheWrapper.ScriptCache.remove(CacheConstants.Talent);

        var talentByStation = CacheWrapper.ScriptCache.get<string[]>(CacheConstants.TalentByStation);
        if (talentByStation != null) {
            talentByStation.forEach(s => CacheWrapper.ScriptCache.remove(`${CacheConstants.TalentByStation}_${s}`));
            CacheWrapper.ScriptCache.remove(CacheConstants.TalentByStation);
        }
    }
}