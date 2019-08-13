import getJSON from 'src/logic/api';
import { SearchOptions } from 'radio-app-2-shared';

export function getSearchOptions<T>(countryId: string): Promise<T> {
    return getJSON<T>({
        directFunction: "getSearchOptions",
        parameters: [countryId],
        url: `?item=getSearchOptions&country=${countryId}`
    })
}