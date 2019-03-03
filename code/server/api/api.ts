import { CdnApi } from "../api/cdn";
import { StationApi } from "../api/station";
import { CountryApi } from "../api/country";
import { CacheApi } from "./cache";
import { TalentApi } from "./talent";
import { Cache } from "../domain/cache";
import { Countries } from "../domain/countries";
import { Stations } from "../domain/stations";
import { Talents } from "../domain/talent";

function doGet(e: any): GoogleAppsScript.HTML.HtmlOutput | GoogleAppsScript.Content.TextOutput {
    var item = e.parameter.item.toLowerCase();

    switch (item) {
        case "cache":
            return CacheApi.doGet(e);
        case "cdn":
            return CdnApi.doGet(e);
        case "country":
            return CountryApi.doGet(e);
        case "station":
            return StationApi.doGet(e);
        case "talent":
            return TalentApi.doGet(e);
    }
}

function doPost(e: any) {

}

function getServerObjects() {
    return {
        Cache: Cache,
        Countries: Countries,
        Stations: Stations,
        Talent: Talents
    };
}