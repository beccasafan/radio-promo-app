import { Country } from "../../common/models/countries/country";
import { CountrySummary} from "../../common/models/countries/countrySummary";
import { Stations } from "./stations";

export class Countries {
    public static get(): Country[] {
        return CacheWrapper.ScriptCache.get<Country[]>(CacheConstants.Countries) || Countries.load();
    }

    public static summarize(): CountrySummary[] {
        var countries = Countries.get();
        
        return countries.map(c => { 
            var stations = Stations.getByCountry(c.id);
            return Object.assign({}, c, { stations: (stations != null ? stations.length : 0) || 0 })
        }).filter(c => c.stations > 0);
    }

    public static load(): Country[] {
        var data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Country").getDataRange().getValues().slice(1);
        var countries = data.map(c => new Country(c)).filter(c => c.isValid());

        var chunks = CacheWrapper.ScriptCache.put(CacheConstants.Countries, countries);

        return countries;
    }
}