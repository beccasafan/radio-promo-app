import { SyndicatedTalent } from "radio-app-2-shared";

// prettier-ignore
import { groupByProperty, IGroupedEntity, ITypedEntity, readSheetData } from "../util";

import CacheConstants from "./cache-constants";
import { getScriptCache } from "./cache-wrapper";

const ScriptCache = getScriptCache();

export function resetSyndicatedTalentCache(): IGroupedEntity<SyndicatedTalent> {
  // emptySyndicatedTalentCache();
  return loadSyndicatedTalent().allSyndicatedTalent;
}

function emptySyndicatedTalentCache(): void {
  const syndicatedTalentByStation = ScriptCache.get<string[]>(
    CacheConstants.syndicatedTalentByStation
  );
  if (syndicatedTalentByStation != null) {
    syndicatedTalentByStation.forEach(c =>
      ScriptCache.remove(`${CacheConstants.syndicatedTalentByStation}_${c}`)
    );
    ScriptCache.remove(CacheConstants.syndicatedTalentByStation);
  }
}

function loadSyndicatedTalent(): {
  stations: string[];
  allSyndicatedTalent: IGroupedEntity<SyndicatedTalent>;
} {
  console.log({ message: "loading syndicated talent" });

  const syndicatedTalent = readSheetData("syndicatedTalent")
    .map(t => new SyndicatedTalent(t))
    .filter(t => t.isValid());
  const syndicatedTalentByStation = groupByProperty(
    syndicatedTalent,
    "stationId"
  );
  const stationsWithsyndicatedTalent = Object.keys(syndicatedTalentByStation);
  stationsWithsyndicatedTalent.forEach(s =>
    ScriptCache.put(
      `${CacheConstants.syndicatedTalentByStation}_${s}`,
      syndicatedTalentByStation[s]
    )
  );
  ScriptCache.put(
    CacheConstants.syndicatedTalentByStation,
    stationsWithsyndicatedTalent
  );

  const syndicatedTalentDictionary = syndicatedTalent.reduce(
    (map, st) => ((map[st.id] = st), map),
    {} as ITypedEntity<SyndicatedTalent>
  );
  ScriptCache.put(CacheConstants.syndicatedTalent, syndicatedTalentDictionary);

  return {
    allSyndicatedTalent: syndicatedTalentByStation,
    stations: stationsWithsyndicatedTalent
  };
}

export function getSyndicatedTalentByStation(
  stationId: string
): SyndicatedTalent[] | undefined {
  let cachedStations = ScriptCache.get<string[]>(
    CacheConstants.syndicatedTalentByStation
  );

  if (cachedStations == null) {
    cachedStations = loadSyndicatedTalent().stations;
  }

  if (cachedStations != null && cachedStations.includes(stationId)) {
    return ScriptCache.get<SyndicatedTalent[]>(
      `${CacheConstants.syndicatedTalentByStation}_${stationId}`
    );
  }

  return undefined;
}
