// prettier-ignore
import {  CountrySummary,  StationSummary} from "radio-app-2-shared";
import { IGroupedEntity, readSheetData } from "../util";
import CacheConstants from "./cache-constants";
import { getScriptCache } from "./cache-wrapper";
import { getStationsByCountry } from "./stations";

const ScriptCache = getScriptCache();

export function resetCountriesCache(
  stationsByCountry: IGroupedEntity<StationSummary>
): void {
  // emptyCountriesCache();
  loadCountries(stationsByCountry);
}

function emptyCountriesCache(): void {
  ScriptCache.remove(CacheConstants.countrySummaries);
}

function loadCountries(
  stationsByCountry?: IGroupedEntity<StationSummary>
): CountrySummary[] {
  console.log({ message: "loading countries" });

  const countries = readSheetData("Country")
    .map(c => new CountrySummary(c))
    .filter(c => c.isValid());

  countries.forEach(c => {
    const stations =
      (stationsByCountry != null
        ? stationsByCountry[c.id]
        : getStationsByCountry(c.id)) || [];
    c.stations = stations.length;
  });

  ScriptCache.put(CacheConstants.countrySummaries, countries);

  return countries;
}

export function getCountries(): CountrySummary[] {
  return (
    ScriptCache.get<CountrySummary[]>(CacheConstants.countrySummaries) ||
    loadCountries()
  );
}
