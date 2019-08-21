// prettier-ignore
import { Format, Station, StationDetail, StationNote, StationSummary, SyndicatedTalent, Talent } from "radio-app-2-shared";
// prettier-ignore
import { groupByProperty, IGroupedEntity, ITypedEntity, readSheetData } from "../util";
import CacheConstants from "./cache-constants";
import { getScriptCache } from "./cache-wrapper";
// prettier-ignore
import { getSyndicatedTalentByStation } from "./syndicated-talent";
import { getTalentByStation } from "./talent";

const ScriptCache = getScriptCache();

export function resetStationsCache(
  talentByStation: IGroupedEntity<Talent>,
  syndicatedTalentByStation: IGroupedEntity<SyndicatedTalent>
): IGroupedEntity<StationSummary> {
  // emptyStationsCache();
  return loadStations(talentByStation, syndicatedTalentByStation).allStations;
}

function emptyStationsCache(): void {
  const stationsByCountry = ScriptCache.get<string[]>(
    CacheConstants.stationsByCountry
  );
  if (stationsByCountry != null) {
    stationsByCountry.forEach(c =>
      ScriptCache.remove(`${CacheConstants.stationsByCountry}_${c}`)
    );
    ScriptCache.remove(CacheConstants.stationsByCountry);
  }
}

function loadStations(
  talentByStation?: IGroupedEntity<Talent>,
  syndicatedTalentByStation?: IGroupedEntity<SyndicatedTalent>
): { countries: string[]; allStations: IGroupedEntity<StationSummary> } {
  console.log({ message: "loading stations" });

  const stations = readSheetData("Station")
    .map(s => new StationSummary(s))
    .filter(s => s.isValid());

  const notes = readSheetData("StationNote")
    .map(n => new StationNote(n))
    .filter(n => n.isValid());

  const formats = readSheetData("Format")
    .map(f => new Format(f))
    .filter(f => f.isValid());

  const notesByStation = notes.reduce(
    (res, n) => {
      res[n.stationId] = n;
      return res;
    },
    {} as ITypedEntity<StationNote>
  );

  const formatsById = formats.reduce(
    (res, f) => {
      res[f.id] = f;
      return res;
    },
    {} as ITypedEntity<Format>
  );

  stations.forEach(s => {
    const talent =
      talentByStation != null
        ? talentByStation[s.id]
        : getTalentByStation(s.id);
    const syndicated =
      syndicatedTalentByStation != null
        ? syndicatedTalentByStation[s.id]
        : getSyndicatedTalentByStation(s.id);

    const note = notesByStation != null ? notesByStation[s.id] : undefined;

    if (talent != null) {
      s.talent = talent.length;
      s.talentNames = talent.map(t => t.name);
    }
    if (syndicated != null) {
      s.syndicated = syndicated.length;
    }

    if (notesByStation != null) {
      s.note = notesByStation[s.id];
    }

    s.format = formatsById[s.formatId];
  });

  const stationsByCountry = groupByProperty(stations, "countryId");

  const countriesWithStations = Object.keys(stationsByCountry);
  countriesWithStations.forEach(c =>
    ScriptCache.put(
      `${CacheConstants.stationsByCountry}_${c}`,
      stationsByCountry[c]
    )
  );
  ScriptCache.put(CacheConstants.stationsByCountry, countriesWithStations);

  return { countries: countriesWithStations, allStations: stationsByCountry };
}

export function getStationsByCountry(
  countryId: string
): StationSummary[] | undefined {
  let cachedCountries = ScriptCache.get<string[]>(
    CacheConstants.stationsByCountry
  );

  if (cachedCountries == null) {
    cachedCountries = loadStations().countries;
  }

  if (cachedCountries != null && cachedCountries.includes(countryId)) {
    return ScriptCache.get<StationSummary[]>(
      `${CacheConstants.stationsByCountry}_${countryId}`
    );
  }

  return undefined;
}

export function getStation(
  countryId: string,
  stationId: string
): StationDetail | undefined {
  const stationsInCountry = getStationsByCountry(countryId);
  if (stationsInCountry != null) {
    const station = stationsInCountry.find(s => s.id === stationId);

    if (station != null) {
      const stationDetail = (station as Station) as StationDetail;
      stationDetail.talent = getTalentByStation(stationDetail.id) || [];

      const syndicatedTalent =
        getSyndicatedTalentByStation(stationDetail.id) || [];
      const talent: ITypedEntity<Talent> | undefined = ScriptCache.get(
        CacheConstants.talent
      );
      console.log({
        message: "syndicated talent",
        syndicated: syndicatedTalent,
        talent
      });
      if (talent != null) {
        stationDetail.syndicatedTalent = syndicatedTalent.map(
          st => talent[st.showId]
        );
      }

      return stationDetail;
    }
  }

  return undefined;
}
