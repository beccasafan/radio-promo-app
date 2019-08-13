import getJSON from '../api';
import { StationDetail, StationSummary } from 'radio-app-2-shared';

export function getStationsByCountry(countryId: string): Promise<StationSummary[]> {
    return  getJSON<StationSummary[]>({ 
        directFunction: "getStationsByCountry", 
        parameters: [countryId], 
        url: `?item=getStationsByCountry&country=${countryId}`});
} 

export function getStationDetails(country: string, station: string): Promise<StationDetail> {
    return getJSON<StationDetail>({
        directFunction: "getStation",
        parameters: [country, station],
        url: `?item=getStation&country=${country}&station=${station}`
    });
}