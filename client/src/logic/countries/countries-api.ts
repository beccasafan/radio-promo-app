import getJSON from 'src/logic/api';
import { CountrySummary } from 'radio-app-2-shared';

export function getCountries(): Promise<CountrySummary[]> {
    return getJSON<CountrySummary[]>({
        directFunction: "getCountries",
        url: "?item=getCountries"
    });
}