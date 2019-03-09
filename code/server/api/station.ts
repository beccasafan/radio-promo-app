///<reference path="../../common/util/util.ts" />

import { Util } from "./../../common/util/util";
import { Stations } from "./../domain/stations";

export class StationApi {
    public static doGet(e: any): GoogleAppsScript.Content.TextOutput {
        var action = e.parameter.action.toLowerCase();
        var callback = e.parameter.callback;
        switch (action) {
            case "getbycountry":
                return Util.createJSONOutput(Stations.getByCountry(e.parameter.country), callback);
            case "getstation":
                return Util.createJSONOutput(Stations.getByCode(e.parameter.code), callback);
        }
    }
}

function getStationsByCountry(country: string) {
    return Stations.getByCountry(country);
}

function getStation(code: string) {
    return Stations.getByCode(code);
}