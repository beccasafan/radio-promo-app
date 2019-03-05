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
    getTweetUrl: (station: StationSummary) => string;
    pageSize: number;
};

export interface StationsState extends SearchValues {
    visibleStations: StationSummary[];
    currentPage: number;
}

export class Stations extends React.Component<StationsProps, StationsState> {
    static defaultProps: { pageSize: number; };
    constructor(props: StationsProps) {
        super(props);
        this.state = {
            visibleStations: null,
            currentPage: 1
        };

        this.onSearch = this.onSearch.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.onPreviousClick = this.onPreviousClick.bind(this);
    }

    onSearch(values: SearchValues) {
        this.setState(values, () => {
            this.setState({ visibleStations: this.filter() });
        });
    }

    onNextClick() {
        this.setState((prevState, props) => ({ currentPage: prevState.currentPage + 1 }));
    }
    onPreviousClick() {
        this.setState((prevState, props) => ({ currentPage: prevState.currentPage - 1 }));
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
        let allStations = this.state.visibleStations || this.props.stations;
        var stationsToShow = allStations.slice((this.state.currentPage - 1) * this.props.pageSize, this.state.currentPage * this.props.pageSize);

        if (this.props.stations == null) return (<p>Loading...</p>);

        let previousElement = this.state.currentPage <= 1 ? <li className="page-item disabled"><a className="page-link" tabIndex={-1}>Previous</a></li> : <li className="page-item"><a className="page-link" onClick={this.onPreviousClick}>Previous</a></li>;
        let nextElement = this.state.currentPage >= Math.ceil(allStations.length / this.props.pageSize) ? <li className="page-item disabled"><a className="page-link" tabIndex={-1}>Next</a></li> : <li className="page-item"><a className="page-link" onClick={this.onNextClick}>Next</a></li>;

        let nav = (attr: string) => (
            <nav aria-label={`${attr} Pager`}>
                <ul className="pagination justify-content-center">
                    {previousElement}
                    {nextElement}
                </ul>
            </nav>
        );
        return (
            <div key={this.props.countryId}>
                <Search options={this.props.search} onSearch={this.onSearch} twitter={this.state.twitter} />

                <div>
                    {nav("Top")}
                    <FilteredList key={this.props.countryId} countryId={this.props.countryId} stations={stationsToShow} onSelect={this.props.onSelect} onSearch={this.onSearch} getTweetUrl={this.props.getTweetUrl} />
                    {nav("Bottom")}
                </div>
            </div>
        );
    }
}
Stations.defaultProps = { pageSize: 24 };