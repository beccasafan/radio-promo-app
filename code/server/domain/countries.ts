import { Country } from "./../../common/models/country";
import { CountrySummary} from "./../../common/models/countrySummary";
import { Stations } from "./stations";

export class Countries {
    public static get(): Country[] {
        return CacheWrapper.ScriptCache.get<Country[]>(CacheConstants.Countries) || Countries.load();
    }

    public static summarize(): CountrySummary[] {
        var countries = Countries.get();
        var stations = Stations.get();

        var countByCountry = stations.reduce((counts, s) => {
            counts[s.countryId] = (counts[s.countryId] || 0) + 1;
            return counts;
        }, {});
        return countries.map(c => Object.assign({}, c, { stations: countByCountry[c.id] || 0 }));
    }

    public static load(): Country[] {
        var data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Country").getDataRange().getValues().slice(1);
        var countries = data.map(c => new Country(c)).filter(c => c.isValid());

        var chunks = CacheWrapper.ScriptCache.put(CacheConstants.Countries, countries);

        return countries;
    }
}