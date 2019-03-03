import { Search } from "../domain/search";

function getSearchOptions(countryId: string) {
    return Search.getSearchOptions(countryId);
}