import { FormatSummary, Monitor } from "radio-app-2-shared";
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

  const monitors = readSheetData("Monitor")
    .map(m => new Monitor(m))
    .filter(m => m.isValid());
  let formats = readSheetData("Format")
    .map(f => new FormatSummary(f))
    .filter(f => f.isValid());

  formats.forEach(f => {
    const monitor = monitors.find(m => m.id === f.monitorId);
    if (monitor == null) {
      return null;
    }
    f.countryId = monitor.countryId;
  });
  formats = formats.filter(f => f != null);

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

export function getFormatsByCountry(
  countryId: string
): FormatSummary[] | undefined {
  let cachedCountries = ScriptCache.get<string[]>(
    CacheConstants.formatsByCountry
  );

  if (cachedCountries == null) {
    cachedCountries = loadFormats();
  }

  if (cachedCountries != null && cachedCountries.includes(countryId)) {
    return ScriptCache.get<FormatSummary[]>(
      `${CacheConstants.formatsByCountry}_${countryId}`
    );
  }

  return undefined;
}
