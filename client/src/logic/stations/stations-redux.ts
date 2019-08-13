import { StationDetail, StationSummary } from "radio-app-2-shared";
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { getFactories } from "../helpers/helper";
import { Success, Failure } from "typescript-fsa";
import { getStationsByCountry as getStationsByCountryApi, getStationDetails as getStationDetailsApi } from './stations-api';
import { IAJAXState } from "../helpers/types";

export class StationsState extends IAJAXState<StationSummary> {
    detail?: StationDetail;
}

const factories = getFactories<StationsState>("stations");
const getStationsByCountry = factories.async<string, StationSummary[]>(
    "get-stations-by-country",
    async (countryId) => {
        return await getStationsByCountryApi(countryId);
    },
);

const getStationDetails = factories.async<{country: string, station: string}, StationDetail>(
    "get-station-detail",
    async (params) => {
        return getStationDetailsApi(params.country, params.station);
    }
)

const handleGetStationsByCountryDone = (state: StationsState, response: Success<string, StationSummary[]>): StationsState => ({
    ...state, 
    items: state.items.addItems(response.result)
});

const handleGetStationDetailsStarted = (state: StationsState, params: {country: string, station: string}) => ({
    ...state,
    detail: undefined
});

const handleGetStationDetailsDone = (state: StationsState, response: Success<{country: string, station: string}, StationDetail>): StationsState => ({
    ...state,
    detail: response.result
});

const stationsState = new StationsState();
const reducer = reducerWithInitialState(stationsState)
    .case(getStationsByCountry.async.done, handleGetStationsByCountryDone)
    .case(getStationDetails.async.started, handleGetStationDetailsStarted)
    .case(getStationDetails.async.done, handleGetStationDetailsDone)
;

const actions = { getStationsByCountry, getStationDetails };
export { reducer, actions };