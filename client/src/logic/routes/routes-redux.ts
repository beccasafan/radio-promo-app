import { getFactories } from "../helpers/helper";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { RouteData } from "./route-models";
import { parseUrl } from "src/route";
import { History } from 'history';

const initial: RouteData = {
    country: "US",
    page: undefined,
    pageSize: undefined,
    format: undefined,
    artist: undefined,
    song: undefined,
    history: undefined,
    userGuide: false
};

const factory = getFactories<RouteData>("routes");

const getFromRoute = factory.sync<History>("get-from-route");
const handleGetFromRoute = (state: RouteData, history: History): RouteData => {
    const data = parseUrl();
    const routeInfo = data.data;
    routeInfo.history = history
    
    document.title = data.title;

    return routeInfo;
}

const reducer = reducerWithInitialState(initial)
    .case(getFromRoute, handleGetFromRoute)
    ;

const actions = { getFromRoute };
export { actions, reducer };