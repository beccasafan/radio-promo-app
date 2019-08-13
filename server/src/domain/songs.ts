import { Song } from "radio-app-2-shared";
import { readSheetData } from "../util";
import CacheConstants from "./cache-constants";
import { getScriptCache } from "./cache-wrapper";

const ScriptCache = getScriptCache();

export function resetSongCache(): void {
  // emptySongCache();
  loadSongs();
}

function emptySongCache(): void {
  ScriptCache.remove(CacheConstants.songs);
}

function loadSongs(): Song[] {
  const songs = readSheetData("Songs")
    .map(s => new Song(s))
    .filter(s => s.isValid());

  ScriptCache.put(CacheConstants.songs, songs);

  return songs;
}

export function getSongs(): Song[] {
  return ScriptCache.get<Song[]>(CacheConstants.songs) || loadSongs();
}
