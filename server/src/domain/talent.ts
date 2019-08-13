import { Talent } from "radio-app-2-shared";
import { groupByProperty, IGroupedEntity, readSheetData } from "../util";
import CacheConstants from "./cache-constants";
import { getScriptCache } from "./cache-wrapper";

const ScriptCache = getScriptCache();

export function resetTalentCache(): IGroupedEntity<Talent> {
  // emptyTalentCache();
  return loadTalent().allTalent;
}

function emptyTalentCache(): void {
  const talentByStation = ScriptCache.get<string[]>(
    CacheConstants.talentByStation
  );
  if (talentByStation != null) {
    talentByStation.forEach(c =>
      ScriptCache.remove(`${CacheConstants.talentByStation}_${c}`)
    );
    ScriptCache.remove(CacheConstants.talentByStation);
  }
}

function loadTalent(): {
  stations: string[];
  allTalent: IGroupedEntity<Talent>;
} {
  console.log({ message: "loading talent" });

  const talent = readSheetData("Talent")
    .map(t => new Talent(t))
    .filter(t => t.isValid());
  const talentByStation = groupByProperty(talent, "stationId");
  const stationsWithTalent = Object.keys(talentByStation);
  stationsWithTalent.forEach(s =>
    ScriptCache.put(
      `${CacheConstants.talentByStation}_${s}`,
      talentByStation[s]
    )
  );
  ScriptCache.put(CacheConstants.talentByStation, stationsWithTalent);

  const talentDictionary = talent.reduce(
    (map, t) => ((map[t.id] = t), map),
    {} as { [key: string]: Talent }
  );
  ScriptCache.put(CacheConstants.talent, talentDictionary);

  return {
    allTalent: talentByStation,
    stations: stationsWithTalent
  };
}

export function getTalentByStation(stationId: string): Talent[] | undefined {
  let cachedStations = ScriptCache.get<string[]>(
    CacheConstants.talentByStation
  );

  if (cachedStations == null) {
    cachedStations = loadTalent().stations;
  }

  if (cachedStations != null && cachedStations.includes(stationId)) {
    return ScriptCache.get<Talent[]>(
      `${CacheConstants.talentByStation}_${stationId}`
    );
  }

  return undefined;
}
