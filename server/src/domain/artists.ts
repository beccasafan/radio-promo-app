import { Artist } from "radio-app-2-shared";
import { readSheetData } from "../util";
import CacheConstants from "./cache-constants";
import { getScriptCache } from "./cache-wrapper";

const ScriptCache = getScriptCache();

export function resetArtistsCache(): void {
  // emptyArtistsCache();
  loadArtists();
}

function emptyArtistsCache(): void {
  ScriptCache.remove(CacheConstants.artists);
}

function loadArtists(): Artist[] {
  const artists = readSheetData("1D")
    .map(a => new Artist(a))
    .filter(a => a.isValid());

  ScriptCache.put(CacheConstants.artists, artists);

  return artists;
}

export function getArtists(): Artist[] {
  return ScriptCache.get<Artist[]>(CacheConstants.artists) || loadArtists();
}
