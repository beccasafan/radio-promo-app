///<reference path="../../common/util/util.ts" />

import { Util } from "./../../common/util/util";
import { Stations } from "./../domain/stations";

export class StationApi {
    public static doGet(e: any): GoogleAppsScript.HTML.HtmlOutput {
        var action = e.parameter.action.toLowerCase();
        
        switch (action) {
            case "get":
                return Util.createJSONOutput(Stations.get());
            case "load":
                return Util.createJSONOutput(Stations.load());
        }
    }
}

function getStationsByCountry(country: string) {
    return Stations.getByCountry(country);
}

function getStation(code: string) {
    return Stations.getByCode(code);
}