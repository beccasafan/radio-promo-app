
import * as React from 'react';
import { Util } from "../../../../common/util/util";
import { Summary } from "./summary";
import { StationSummary } from '../../../../common/models/stations/stationSummary';

declare var google: any;

export interface StationsProps {
    stations?: StationSummary[]
    onSelect: (station: StationSummary) => void;
};
export interface StationsState {
    stations: StationSummary[];
}

export class Stations extends React.Component<StationsProps, StationsState> {
    constructor(props: StationsProps) {
        super(props);
        this.state = { stations: [] };
    }

    render() {
        if (this.props.stations == null) {
            return (
                <div>Loading stations...</div>
            );
        }
        return (
            <div>
                <div>There are {this.props.stations.length} stations</div>

                <div className="row">
                    {this.props.stations.map(s =>
                        <Summary station={s} onSelect={this.props.onSelect} />
                    )}
                </div>
            </div>
        );
    }
}