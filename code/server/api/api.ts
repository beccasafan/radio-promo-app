import { CdnApi } from "../api/cdn";
import { StationApi } from "../api/station";
import { CountryApi } from "../api/country";

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
    }
}

function doPost(e: any) {

}