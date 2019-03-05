import * as React from 'react';
import { Util } from "../../../../common/util/util";
import { Summary } from "./summary";
import { StationSummary } from '../../../../common/models/stations/stationSummary';
import { Search, SearchState } from '../search';
import { SearchOptions, SearchValues } from '../../../../common/models/search';
import { FilteredList } from './filteredList';
import { TweetsByLanguage } from '../../../../common/models/tweets/tweets';

declare var google: any;

export interface StationsProps {
    countryId: string;
    stations?: StationSummary[];
    search: SearchOptions;
    onSelect: (station: StationSummary) => void;
    tweets: TweetsByLanguage;
};

export interface StationsState extends SearchValues {
    visibleStations: StationSummary[];
}

export class Stations extends React.Component<StationsProps, StationsState> {
    constructor(props: StationsProps) {
        super(props);
        this.state = {
            visibleStations: null
        };

        this.onSearch = this.onSearch.bind(this);
    }

    onSearch(values: SearchValues) {
        this.setState(values, () => {
            this.setState({visibleStations: this.filter()});
        });
    }

    filter(): StationSummary[] {
        let matchesFormat = (station: StationSummary, selectedFormat: string) => {
            var format = this.props.search.formats.find(f => f.id === station.formatId);
            return selectedFormat === format.code;
        };
        let matchesText = (station: StationSummary, property: string, text: string) => {
            return station[property] != null && station[property].toLowerCase().indexOf(text) >= 0;
        };
        let matchesBool = (station: StationSummary, property: string) => {
            return !Util.isEmpty(station[property]);
        }
        var visibleStations = this.props.stations.filter(s => 
            (this.state.selectedFormat == null || matchesFormat(s, this.state.selectedFormat)) && 
            (this.state.selectedParent == null || matchesText(s, "parentGroup", this.state.selectedParent.toLowerCase())) &&
            (this.state.location == null || matchesText(s, "location", this.state.location.toLowerCase())) &&
            (this.state.name == null || matchesText(s, "name", this.state.name.toLowerCase()) || matchesText(s, "code", this.state.name.toLowerCase())) &&
            (!this.state.twitter || matchesBool(s, "twitter")) &&
            (!this.state.instagram || matchesBool(s, "instagram")) &&
            (!this.state.facebook || matchesBool(s, "facebook")) &&
            (!this.state.email || matchesBool(s, "email")) &&
            (!this.state.text || matchesBool(s, "text")) &&
            (!this.state.phone || matchesBool(s, "phone"))
        );

        return visibleStations;
    }

    render() {
        if (this.props.stations == null) return (<div>Loading...</div>);

        return (
            <div key={this.props.countryId}>
                <Search options={this.props.search} onSearch={this.onSearch} twitter={this.state.twitter} />

                <div>
                    <FilteredList key={this.props.countryId} countryId={this.props.countryId} stations={this.state.visibleStations || this.props.stations} onSelect={this.props.onSelect} onSearch={this.onSearch} tweets={this.props.tweets} />
                </div>
            </div>
        );
    }
}