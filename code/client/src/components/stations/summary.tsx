import * as React from 'react';
import { StationSummary } from "../../../../common/models/stations/stationSummary";
import { Util } from '../../../../common/util/util';
import * as styles from "./../../styles/station.scss";
import classNames from 'classnames';

export interface StationSummaryProps {
    station: StationSummary;
    onSelect: (station: StationSummary) => void;
    getTweetUrl: (station: StationSummary) => string;
}
export interface StationSummaryState {
}

declare var google: any;

export class Summary extends React.Component<StationSummaryProps, StationSummaryState> {
    private el: HTMLElement;
    private $el: JQuery<HTMLDivElement>;
    constructor(props: StationSummaryProps) {
        super(props);
        this.state = {};

        this.open = this.open.bind(this);
    }

    componentDidMount() {
        this.$el = $(this.el) as JQuery<HTMLDivElement>;
    }

    shouldComponentUpdate(nextProps: StationSummaryProps, nextState: StationSummaryState) {
        return nextProps.station != this.props.station;
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

        let emailHref = this.props.station.email && this.props.station.email.indexOf("@") >= 0 ? `mailto:${this.props.station.email}` : this.props.station.email;

        return (
            <div ref={el => this.el = el} id={`station_${this.props.station.id}`} className={classNames(styles.station, "col-sm-12 col-md-6 col-lg-4 col-xl-3 py-3")}>
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
                    <div className="card-footer">
                        <div className="row no-gutters">
                            <div className="col"><a href="javascript:;" onClick={this.open}><i className="fas fa-eye"></i></a></div>
                            <div className="col">{this.props.station.website && <a href={this.props.station.website} target="_blank"><i className="fas fa-link"></i></a>}</div>
                            <div className="col">{this.props.station.twitter && <a href={this.props.getTweetUrl(this.props.station)} target="_blank"><i className="fab fa-twitter"></i></a>}</div>
                            <div className="col">{this.props.station.instagram && <a href={`https://instagram.com/${this.props.station.instagram}`} target="_blank"><i className="fab fa-instagram"></i></a>}</div>
                            <div className="col">{this.props.station.facebook && <a href={`https://facebook.com/${this.props.station.facebook}`} target="_blank"><i className="fab fa-facebook"></i></a>}</div>
                            <div className="col">{this.props.station.email && <a href={emailHref} target="_blank"><i className="fas fa-envelope"></i></a>}</div>
                            <div className="col">{this.props.station.text && <a href="javascript:;" onClick={this.open}><i className="fas fa-comment"></i></a>}</div>
                            <div className="col">{this.props.station.phone && <a href={`tel:${this.props.station.phone}`}><i className="fas fa-phone"></i></a>}</div>
                            <div className="col">{this.props.station.note && <a href="javascript:;" onClick={this.open}><i onClick={this.open} className="fas fa-sticky-note"></i></a>}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}