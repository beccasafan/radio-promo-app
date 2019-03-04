import * as React from 'react';
import { StationSummary } from "../../../../common/models/stations/stationSummary";
import { Util } from '../../../../common/util/util';
import * as styles from "./../../styles/station.scss";
import classNames from 'classnames';

export interface StationSummaryProps {
    station: StationSummary;
    onSelect: (station: StationSummary) => void;
}
export interface StationSummaryState {
}


export class Summary extends React.Component<StationSummaryProps, StationSummaryState> {
    constructor(props: StationSummaryProps) {
        super(props);
        this.state = {};

        this.open = this.open.bind(this);
    }

    shouldComponentUpdate(nextProps: StationSummaryProps, nextState: StationSummaryState) {
        var shouldUpdate = nextProps.station != this.props.station;
        console.log(nextProps.station.code, shouldUpdate);
        return shouldUpdate;
    }

    open() {
        this.props.onSelect(this.props.station);
    }

    render() {
        if (Util.isEmpty(this.props)) {
            return (
                <div>Loading station...</div>
            );
        }
console.log("rendering", this.props.station.code);
        return (
            <div className={classNames(styles.station, "col-sm-12 col-md-6 col-lg-4 col-xl-3 py-3")}>
                <div className="card h-100">
                    <div className="card-header" onClick={this.open}>{this.props.station.code}</div>
                    <div className="card-body">
                        <h5 className="card-title" onClick={this.open}>{this.props.station.name}</h5>
                        <p className="card-text">{this.props.station.location}</p>
                        <div className={styles.cardGrow}>
                            {!Util.isEmpty(this.props.station.parentGroup) && <p className="card-text">{this.props.station.parentGroup}</p>}
                            {this.props.station.talent > 0 && <p className="card-text">{this.props.station.talent} talent</p>}
                            {this.props.station.syndicated > 0 && <p className="card-text">{this.props.station.syndicated} syndicated talent</p>}
                            {!Util.isEmpty(this.props.station.note) && <p className="card-text">{this.props.station.note}</p>}
                        </div>
                        <a href="javascript:;" onClick={this.open} className="btn btn-outline-secondary btn-block">View</a>
                    </div>
                    
                </div>
            </div>
        )
    }
}