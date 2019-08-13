import { getFactories } from "../helpers/helper";
import { getSearchOptions as getSearchOptionsApi } from 'src/logic/search/search-api';
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Success, Failure } from "typescript-fsa";
import { setRouteData } from "src/route";
import { stat } from "fs";
import { Format } from "radio-app-2-shared";
import NormalizedEntity from "../helpers/normalized-entity";

export interface SearchState {
    formats: NormalizedEntity<Format>;
    isLoading: boolean;
    hasError: boolean;
}
interface SearchOptions {
    formats: Format[];
}
const factories = getFactories<SearchState>("search");
const getSearchOptions = factories.async<string, SearchOptions>(
    "get-search-options",
    async (countryId): Promise<SearchOptions> => {
        return getSearchOptionsApi<SearchOptions>(countryId);
    }
);

const handleGetSearchOptionsStarted = (state: SearchState, countryId: string): SearchState => ({
    ...state,
    formats: new NormalizedEntity<Format>(),
    isLoading: true,
    hasError: false
});

const handleGetSearchOptionsDone = (state: SearchState, response: Success<string, SearchOptions>): SearchState => ({
    ...state,
    formats: state.formats.addItems(response.result.formats),
    isLoading: false,
    hasError: false
});

const handleGetSearchOptionsFailed = (state: SearchState, response: Failure<string, Error>): SearchState => ({
    ...state,
    isLoading: false,
    hasError: true
});

const reducer = reducerWithInitialState(<SearchState>{formats: new NormalizedEntity<Format>(), hasError: false, isLoading: false})
    .case(getSearchOptions.async.started, handleGetSearchOptionsStarted)
    .case(getSearchOptions.async.failed, handleGetSearchOptionsFailed)
    .case(getSearchOptions.async.done, handleGetSearchOptionsDone)
;

const actions = { getSearchOptions };
export { reducer, actions };