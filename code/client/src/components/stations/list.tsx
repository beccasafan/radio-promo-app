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
        let matchesFormat = (station: StationSummary, selectedFormat: string) => {
            if (selectedFormat == null) return true;

            var format = this.props.search.formats.find(f => f.id === station.formatId);
            return selectedFormat === format.code;
        }
        var visibleStations = this.props.stations.filter(s => {
            var format = this.props.search.formats.find(f => f.id === s.props.station.formatId);
            var visibleByFormat = values.selectedFormat == null || values.selectedFormat === format.code;
            
            return visibleByFormat;
        });

        this.setState({
            visibleStations: visibleStations
        });
    }

    render() {
        return (
            <div>
                <Search options={this.props.search} onSearch={this.onSearch} />

                <div className="row">
                    <FilteredList stations={this.state.visibleStations} onSelect={this.props.onSelect} onSearch={this.onSearch} />
                </div>
            </div>
        );
    }
}