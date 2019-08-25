import React, { Dispatch } from 'react';
import { Station, StationSummary, Artist } from "radio-app-2-shared";
import { Component } from "react";
import * as cs from './station.module.scss';
import * as bs from 'src/bootstrap.scss';
import { connect } from "react-redux";
import { AppState } from "src/logic/store";
import { getTweet } from 'src/logic/helpers/twitter';
import { actions } from 'src/logic/stations/stations-redux';
import { setRouteData, getUrl } from 'src/route';
import Time from '../ui/time';
import Summary2 from './summary2';

declare var baseUrl: string;

interface OwnProps {
    station: StationSummary,
    artist?: string
}
type Props = OwnProps;

export class Summary extends Component<Props>{
    private el!: HTMLElement;
    private $el: JQuery<HTMLDivElement> | undefined;

    constructor(props: Props) {
        super(props);

        this.setTweetUrl = this.setTweetUrl.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onOnAirSelect = this.onOnAirSelect.bind(this);
    }

    setTweetUrl() {
        getTweet(this.el, this.props.station);
    }

    onSelect(event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setRouteData({country: this.props.station.countryId, station: this.props.station.id});
    }
    onOnAirSelect(event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setRouteData({country: this.props.station.countryId, station: this.props.station.id, section: "onair"});
    }

    render() {
        const emailHref = this.props.station.email && this.props.station.email.indexOf("@") >= 0 ? `mailto:${this.props.station.email}` : this.props.station.email;
        const url = window.location.origin + window.location.pathname + getUrl({country: this.props.station.countryId, station: this.props.station.id}).url;
        const onAirUrl = window.location.origin + window.location.pathname + getUrl({country: this.props.station.countryId, station: this.props.station.id, section: "onair"}).url;
        const onAir = (this.props.station.talent || 0) + (this.props.station.syndicated || 0);

        return (
            <div ref={el => this.el = el as HTMLElement} id={`station_${this.props.station.id}`} className={`${cs.station} ${bs.colSm12} ${bs.colMd6} ${bs.colLg4} ${bs.colXl3} ${bs.py3}`}>
                <Summary2 selectedArtist={this.props.artist} station={this.props.station} setTweetUrl={this.setTweetUrl} onSelect={this.onSelect} onOnAirSelect={this.onOnAirSelect} emailHref={emailHref} url={url} onAirUrl={onAirUrl} onAir={onAir} />
            </div>
        );
    }
}

export default Summary;


export interface StationSummaryProps {
    station: StationSummary;
    setTweetUrl: () => void;
    onSelect: (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => void;
    onOnAirSelect: (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => void;
    emailHref: string;
    url: string;
    onAirUrl: string;
    onAir: number;
    selectedArtist?: string;
}
