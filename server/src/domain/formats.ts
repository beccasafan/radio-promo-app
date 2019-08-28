import { Format } from "radio-app-2-shared";
import { groupByProperty, readSheetData } from "../util";
import CacheConstants from "./cache-constants";
import { getScriptCache } from "./cache-wrapper";

const ScriptCache = getScriptCache();

export function resetFormatsCache(): void {
  // emptyFormatsCache();
  loadFormats();
}

function emptyFormatsCache(): void {
  const formatsByCountry = ScriptCache.get<string[]>(
    CacheConstants.formatsByCountry
  );
  if (formatsByCountry != null) {
    formatsByCountry.forEach(c =>
      ScriptCache.remove(`${CacheConstants.formatsByCountry}_${c}`)
    );
    ScriptCache.remove(CacheConstants.formatsByCountry);
  }
}

function loadFormats(): string[] {
  console.log({ message: "loading formats" });

  const formats = readSheetData("Format")
    .map(f => new Format(f))
    .filter(f => f.isValid());

  const formatsByCountry = groupByProperty(formats, "countryId");
  const countriesWithFormats = Object.keys(formatsByCountry);
  countriesWithFormats.forEach(c =>
    ScriptCache.put(
      `${CacheConstants.formatsByCountry}_${c}`,
      formatsByCountry[c]
    )
  );
  ScriptCache.put(CacheConstants.formatsByCountry, countriesWithFormats);

  return countriesWithFormats;
}

export function getFormatsByCountry(countryId: string): Format[] | undefined {
  let cachedCountries = ScriptCache.get<string[]>(
    CacheConstants.formatsByCountry
  );

  if (cachedCountries == null) {
    cachedCountries = loadFormats();
  }

  if (cachedCountries != null && cachedCountries.includes(countryId)) {
    return ScriptCache.get<Format[]>(
      `${CacheConstants.formatsByCountry}_${countryId}`
    );
  }

  return undefined;
}
