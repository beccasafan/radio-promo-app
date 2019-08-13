import { CountrySummary } from "radio-app-2-shared";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { getFactories } from "../helpers/helper";
import { getCountries as getCountriesApi } from './countries-api';
import { Success, Failure } from "typescript-fsa";
import { IAJAXState } from "../helpers/types";
import NormalizedEntity from "../helpers/normalized-entity";

class CountriesState extends IAJAXState<CountrySummary> {}

const factories = getFactories<CountriesState>("countries");
const getCountries = factories.async<{}, CountrySummary[]>(
    "get-countries",
    async () => {
        return await getCountriesApi();
    }
);

const handleGetCountriesDone = (state: CountriesState, response: Success<{}, CountrySummary[]>): CountriesState => ({
    ...state, 
    items: state.items.addItems(response.result)
});


const reducer = reducerWithInitialState(new CountriesState())
    .case(getCountries.async.done, handleGetCountriesDone)
;

const actions = { getCountries };
export { reducer, actions };