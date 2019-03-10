import * as React from 'react';
import { Util } from "../../../../common/util/util";
import { Summary } from "./summary";
import { StationSummary } from '../../../../common/models/stations/stationSummary';
import { Search, SearchState } from '../search';
import { SearchOptions, SearchValues } from '../../../../common/models/search';
import { FilteredList } from './filteredList';
import { TweetsByLanguage } from '../../../../common/models/tweets/tweets';
import * as Clipboard from 'clipboard';

declare var google: any;

export interface StationsProps {
    countryId: string;
    stations?: StationSummary[];
    search: SearchOptions;
    onSelect: (station: StationSummary) => void;
    getTweetUrl: (station: StationSummary) => string;
    pageSize: number;
    initialSearch: SearchValues;
};

export interface StationsState extends SearchValues {
    visibleStations: StationSummary[];
    currentPage: number;
}

export class Stations extends React.Component<StationsProps, StationsState> {
    static defaultProps: { pageSize: number; };
    private el: HTMLElement;
    private $el: JQuery<HTMLDivElement>;

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

    componentDidMount() {
        this.$el = $(this.el) as JQuery<HTMLDivElement>;
        var clipboard = new Clipboard(".clipboard");
        var tooltip = this.$el.find(".clipboard").tooltip({ delay: { show: 500, hide: 0}});
        clipboard.on("success", (e: any) => {
            let tooltip = $(e.trigger);
            $(e.trigger).tooltip("show");
            tooltip.on("blur mouseleave", () => tooltip.tooltip("hide"));
        });
    }

    onSearch(values: SearchValues) {
        this.setState(values, () => {
            const visibleStations = this.filter();
            this.setState({ visibleStations: visibleStations });
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
            return format != null && selectedFormat === format.code;
        };
        let matchesText = (station: StationSummary, property: string, text: string) => {
            return station[property] != null && station[property].toLowerCase().indexOf(text) >= 0;
        };
        let matchesBool = (station: StationSummary, property: string) => {
            return !Util.isEmpty(station[property]);
        };
        let matchesArrayText = (station: StationSummary, property: string, text: string) => {
            return station[property] != null && (station[property] as string[]).some(i => i.toLowerCase().indexOf(text) >= 0);
        };

        var visibleStations = this.props.stations.filter(s =>
            (Util.isEmpty(this.state.format) || matchesFormat(s, this.state.format)) &&
            (Util.isEmpty(this.state.parentGroup) || matchesText(s, "parentGroup", this.state.parentGroup.toLowerCase())) &&
            (Util.isEmpty(this.state.location) || matchesText(s, "location", this.state.location.toLowerCase())) &&
            (Util.isEmpty(this.state.name) || matchesText(s, "name", this.state.name.toLowerCase()) || matchesText(s, "code", this.state.name.toLowerCase())) &&
            (Util.isEmpty(this.state.talent) || matchesArrayText(s, "talentNames", this.state.talent.toLowerCase())) &&
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
        if (!Util.isEmpty(this.state.visibleStations) && this.state.visibleStations[0].countryId !== this.props.countryId) {
            allStations = this.filter();
        }
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
            <div key={this.props.countryId} ref={el => this.el = el}>
                <Search countryId={this.props.countryId} options={this.props.search} onSearch={this.onSearch} twitter={this.state.twitter} initialSearch={this.props.initialSearch} />

                <div>
                    <p className="missing">
                        <a href="http://bit.ly/radiorequestform">Something missing or wrong? Submit it here!</a>
                    </p>
                </div>
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