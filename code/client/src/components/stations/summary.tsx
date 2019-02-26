import * as React from 'react';
import { StationSummary }  from "../../../../common/models/stations/stationSummary";
import { Util } from '../../../../common/util/util';

export interface StationSummaryProps {
    station: StationSummary;
}
export interface StationSummaryState {

}

export class Summary extends React.Component<StationSummaryProps, StationSummaryState> {
    constructor(props: StationSummaryProps) {
        super(props);
        this.state = {};
    }

    render() {
        if (Util.isEmpty(this.props)) {
            return (
                <div>Loading station...</div>
            );
        }

        return (
            <div className="station-summary">
                {this.props.station.name}
            </div>
        )
    }
}

