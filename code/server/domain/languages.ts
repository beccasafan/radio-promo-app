import { Language } from "./../../common/models/language";
import { CacheWrapper } from "../util/cache";
import { CacheConstants } from "../util/constants";

export class Languages {
    public static get(): Language[] {
        return CacheWrapper.ScriptCache.get<Language[]>(CacheConstants.Languages) || Languages.load();
    }
    
    public static load(): Language[] {
        var data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Language").getDataRange().getValues().slice(1);
        var languages = data.map(s => new Language(s)).filter(s => s.isValid());
        
        var chunks = CacheWrapper.ScriptCache.put(CacheConstants.Languages, languages);
        
        return languages;
    }
}