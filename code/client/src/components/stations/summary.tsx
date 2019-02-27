import * as React from 'react';
import { StationSummary } from "../../../../common/models/stations/stationSummary";
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
            <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 d-flex flex-wrap">
                <div className="card">
                    <div className="card-header">{this.props.station.code}</div>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.station.name}</h5>
                        <p className="card-text">{this.props.station.location}</p>
                        {!Util.isEmpty(this.props.station.parentGroup) && <p className="card-text">{this.props.station.parentGroup}</p>}
                    </div>
                    <div className="card-footer">
                        <span><a href="#"><i className="fas fa-eye"></i></a></span>
                        <span>{this.props.station.website ? <a href={this.props.station.website} target="_blank"><i className="fas fa-link"></i></a> : <span>&nbsp;</span>}</span>
                        <span>{this.props.station.twitter ? <a href={`https://twitter.com/${this.props.station.twitter}`} target="_blank"><i className="fab fa-twitter"></i></a> : <span>&nbsp;</span>}</span>
                        <span>{this.props.station.instagram ? <a href={`https://instagram.com/${this.props.station.instagram}`} target="_blank"><i className="fab fa-instagram"></i></a> : <span>&nbsp;</span>}</span>
                        <span>{this.props.station.facebook ? <a href={`https://facebook.com/${this.props.station.facebook}`} target="_blank"><i className="fab fa-facebook"></i></a> : <span>&nbsp;</span>}</span>
                        <span>{this.props.station.email ? <a href={`mailto:${this.props.station.email}`} target="_blank"><i className="fas fa-envelope"></i></a> : <span>&nbsp;</span>}</span>
                        <span>{this.props.station.text ? <a href="#"><i className="fas fa-comment"></i></a> : <span>&nbsp;</span>}</span>
                        <span>{this.props.station.phone ? <a href="#"><i className="fas fa-phone"></i></a> : <span>&nbsp;</span>}</span>
                        <span>{this.props.station.note ? <a href="#"><i className="fas fa-sticky-note"></i></a> : <span>&nbsp;</span>}</span>
                    </div>
                </div>
            </div>
        )
    }
}

