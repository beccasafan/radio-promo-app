import React from 'react';
import * as cs from './station.module.scss';
import * as bs from 'src/bootstrap.scss';
import Time from '../ui/time';
import { StationSummaryProps } from './summary';
import Display from './display';
import Social from './social';


const Summary2 = (props: StationSummaryProps) => (
    <div className={`${bs.card} ${bs.h100}`}>
        <div className={`${bs.cardHeader} `}>
            <div><a href={props.url} onClick={props.onSelect}>{props.station.name}</a></div>
        </div>

        <div className={`${cs.localTime} ${bs.cardFooter}`}>
            <div><i className="far fa-clock"></i>&nbsp;<span>{props.station.utc && <Time utcOffset={props.station.utc} />}</span></div>
            <div><i className="fas fa-map-marker-alt"></i>&nbsp;{props.station.location}</div>
            {props.station.format && <div className={bs.fontItalic}><i className="fas fa-music"></i> {props.station.format.name}</div>}
        </div>
        <div className={bs.cardBody}>
            <div className={bs.cardGrow}>
                <Display mode="summary" station={props.station} selectedArtist={props.selectedArtist} />
            </div>

        </div>
        <div className={bs.cardFooter}>
            <div className={`${bs.row} ${bs.noGutters}`}>
                <Social iconOnly={true} station={props.station} logWebsite={props.logWebsite} logTwitter={props.logTweet} logInstagram={props.logInstagram} logFacebook={props.logFacebook} logEmail={props.logEmail} logText={props.logText} logPhone={props.logPhone} logWhatsapp={props.logWhatsapp} setTweetUrl={props.setTweetUrl} emailHref={props.emailHref} />
            </div>
        </div>
        <div className={cs.actions}>
            <div className={`${bs.row} ${bs.noGutters}`}>
                <a href={props.url} onClick={props.onSelect} className={`${bs.btn} ${bs.btnOutlineSecondary} ${bs.btnBlock}`}><i className="fas fa-microphone"></i>&nbsp; <span>Station Details</span></a>
            </div>
            <div className={`${bs.row} ${bs.noGutters}`}>
                <a href={props.onAirUrl} onClick={props.onOnAirSelect} className={`${bs.btn} ${bs.btnOutlineSecondary} ${bs.btnBlock}`}><i className="fas fa-user-friends"></i>&nbsp; <span>{props.onAir} DJ{props.onAir == 1 ? "" : "s"} {props.onAir == 1 ? "or" : "and"} Show{props.onAir == 1 ? "" : "s"}</span></a>
            </div>
        </div>
    </div>
);

export default Summary2;