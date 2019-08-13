import thunkMiddleware, { ThunkMiddleware } from "redux-thunk";
import { AnyAction, createStore, combineReducers, applyMiddleware, Reducer } from "redux";
import { reducer as stationsReducer } from "./stations/stations-redux";
import { reducer as countriesReducer } from "./countries/countries-redux";
import { reducer as tweetsReducer } from "./tweets/tweets-redux";
import { reducer as searchReducer } from "src/logic/search/search-redux";
import { reducer as routesReducer } from 'src/logic/routes/routes-redux';
import { reducer as songsReducer } from 'src/logic/songs/songs-redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import handleAjaxReducer from "src/logic/helpers/reducers/ajax";
import loggingMiddleware from "./helpers/middleware/logging";

const thunk: ThunkMiddleware<AppState, AnyAction> = thunkMiddleware;

const reducers = {
    stations: handleAjaxReducer("stations", stationsReducer),
    countries: handleAjaxReducer("countries", countriesReducer),
    tweets: handleAjaxReducer("tweets", tweetsReducer),
    songs: handleAjaxReducer("songs", songsReducer),
    search: searchReducer,
    routes: routesReducer
};

const rootReducer = combineReducers(reducers);

export type AppState = ReturnType<typeof rootReducer>;

const composeEnhancers = composeWithDevTools({});
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, loggingMiddleware())));

export { store };