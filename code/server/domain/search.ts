import { SearchOptions } from "../../common/models/search";
import { Formats } from "./formats";

export class Search {

    public static getSearchOptions(countryId: string): SearchOptions {
        console.log("getting search options for " + countryId);
        var formats = Formats.getByCountry(countryId);
        var result = {
            formats: formats
        };

        return result;
    }
}