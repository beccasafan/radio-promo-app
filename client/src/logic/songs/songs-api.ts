import getJSON from '../api';
import { Song, Artist } from 'radio-app-2-shared';

export function getSongs(): Promise<{ songs: Song[], artists: Artist[] }> {
    return getJSON<{ songs: Song[], artists: Artist[] }>({
        directFunction: "getSongs",
        url: `?item=getSongs`
    });
}