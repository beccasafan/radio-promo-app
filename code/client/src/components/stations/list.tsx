import * as React from 'react';
import { Util } from "../../../../common/util/util";
import { Summary } from "./summary";
import { StationSummary } from '../../../../common/models/stations/stationSummary';
import { Search, SearchState } from '../search';
import { SearchOptions, SearchValues } from '../../../../common/models/search';
import { FilteredList } from './filteredList';

declare var google: any;

export interface StationsProps {
    stations?: StationSummary[];
    search: SearchOptions;
    onSelect: (station: StationSummary) => void;
};

export interface StationsState extends SearchValues {
    visibleStations: StationSummary[];
}

export class Stations extends React.Component<StationsProps, StationsState> {
    constructor(props: StationsProps) {
        super(props);
        this.state = {
            selectedFormat: null,
            visibleStations: null
        };

        this.onSearch = this.onSearch.bind(this);
    }

    onSearch(values: SearchValues) {
        this.setState(values);
        this.setState({visibleStations: this.filter()});
    }

    filter(): StationSummary[] {
        let matchesFormat = (station: StationSummary, selectedFormat: string) => {
            if (selectedFormat == null) return true;

            var format = this.props.search.formats.find(f => f.id === station.formatId);
            return selectedFormat === format.code;
        }
        var visibleStations = this.props.stations
            .filter(s => matchesFormat(s, this.state.selectedFormat))
        ;
        console.log(new Date(), "finishing filter");
        return visibleStations;
    }

    render() {
        if (this.props.stations == null) return (<div>Loading...</div>);

        return (
            <div>
                <Search options={this.props.search} onSearch={this.onSearch} />

                <div className="row">
                    <FilteredList stations={this.state.visibleStations || this.props.stations} onSelect={this.props.onSelect} onSearch={this.onSearch} />
                </div>
            </div>
        );
    }
}