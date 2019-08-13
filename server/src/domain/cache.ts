import { resetArtistsCache } from "./artists";
import { getScriptCache } from "./cache-wrapper";
import { resetCountriesCache } from "./countries";
import { resetFormatsCache } from "./formats";
import { resetSongCache } from "./songs";
import { resetStationsCache } from "./stations";
import { resetSyndicatedTalentCache } from "./syndicated-talent";
import { resetTalentCache } from "./talent";
import { resetTweetCache } from "./tweets";

export function reset() {
  console.log({ message: "resetting" });
  const artists = resetArtistsCache();
  const songs = resetSongCache();
  const tweets = resetTweetCache();
  const formats = resetFormatsCache();
  const talent = resetTalentCache();
  const syndicatedTalent = resetSyndicatedTalentCache();
  const stations = resetStationsCache(talent, syndicatedTalent);
  const countries = resetCountriesCache(stations);
}

const ScriptCache = getScriptCache();
export function viewCache(key: string) {
  return ScriptCache.get(key);
}
