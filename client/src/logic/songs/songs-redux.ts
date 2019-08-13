import { Song, Artist } from "radio-app-2-shared";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { getFactories } from "../helpers/helper";
import { Success } from "typescript-fsa";
import { getSongs as getSongsApi } from "./songs-api";
import { IAJAXState } from "../helpers/types";
import NormalizedEntity from "../helpers/normalized-entity";
import { setSong as setActiveSong } from "../helpers/twitter";

class SongsState extends IAJAXState<Song> {
    artists: NormalizedEntity<Artist> = new NormalizedEntity<Artist>()
}

const factories = getFactories<SongsState>("songs");
const getSongs = factories.async<{}, { songs: Song[], artists: Artist[] }>(
    "get-songs",
    async () => await getSongsApi()
);

const handleGetSongsDone = (state: SongsState, response: Success<{}, { songs: Song[], artists: Artist[] }>): SongsState => ({
    ...state,
    items: state.items.addItems(response.result.songs),
    artists: state.artists.addItems(response.result.artists)
});

const setSong = factories.sync<Song>("set-song");
const handleSetSong = (state: SongsState, song: Song): SongsState => {
    setActiveSong(song);
    return state;
}

const songsState = new SongsState();
const reducer = reducerWithInitialState(songsState)
    .case(getSongs.async.done, handleGetSongsDone)
    .case(setSong, handleSetSong)
;

const actions = { getSongs, setSong };
export { reducer, actions };