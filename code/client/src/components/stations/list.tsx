import * as React from 'react';
import { Util } from "../../../../common/util/util";
import { Summary } from "./summary";
import { StationSummary } from '../../../../common/models/stations/stationSummary';
import { Search } from '../search';
import { SearchOptions } from '../../../../common/models/search';

declare var google: any;

export interface StationsProps {
    stations?: StationSummary[]
    search: SearchOptions;
    onSelect: (station: StationSummary) => void;
};
export interface StationsState {
}

export class Stations extends React.Component<StationsProps, StationsState> {
    constructor(props: StationsProps) {
        super(props);
        this.state = {};
    }

    render() {
        if (this.props.stations == null) {
            return (
                <div>Loading stations...</div>
            );
        }

        const stations = this.props.stations.map(s =>
            <Summary station={s} onSelect={this.props.onSelect} />
        );
        return (
            <div>
                <div>There are {this.props.stations.length} stations</div>

                <Search options={this.props.search} stations={stations} />

                <div className="row">
                    {stations}
                </div>
            </div>
        );
    }
}