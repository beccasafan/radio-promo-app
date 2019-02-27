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
            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                <div className="card d-flex flex-wrap my-3">
                    <div className="card-header">{this.props.station.code}</div>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.station.name}</h5>
                        <p className="card-text">{this.props.station.location}</p>
                        {!Util.isEmpty(this.props.station.parentGroup) && <p className="card-text">{this.props.station.parentGroup}</p>}
                    </div>
                    <div className="card-footer">
                        <div className="row">
                            <div className="col"><a href="#"><i className="fas fa-eye"></i></a></div>
                            <div className="col">{this.props.station.website && <a href={this.props.station.website} target="_blank"><i className="fas fa-link"></i></a>}</div>
                            <div className="col">{this.props.station.twitter && <a href={`https://twitter.com/${this.props.station.twitter}`} target="_blank"><i className="fab fa-twitter"></i></a>}</div>
                            <div className="col">{this.props.station.instagram && <a href={`https://instagram.com/${this.props.station.instagram}`} target="_blank"><i className="fab fa-instagram"></i></a>}</div>
                            <div className="col">{this.props.station.facebook && <a href={`https://facebook.com/${this.props.station.facebook}`} target="_blank"><i className="fab fa-facebook"></i></a>}</div>
                            <div className="col">{this.props.station.email && <a href={`mailto:${this.props.station.email}`} target="_blank"><i className="fas fa-envelope"></i></a>}</div>
                            <div className="col">{this.props.station.text && <a href="#"><i className="fas fa-comment"></i></a>}</div>
                            <div className="col">{this.props.station.phone && <a href="#"><i className="fas fa-phone"></i></a>}</div>
                            <div className="col">{this.props.station.note && <a href="#"><i className="fas fa-sticky-note"></i></a>}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

