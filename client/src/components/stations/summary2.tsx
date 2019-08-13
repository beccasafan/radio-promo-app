import React from 'react';
import { Station } from 'radio-app-2-shared';
import { getUrl } from 'src/route';
import * as cs from './station.module.scss';
import * as bs from 'src/bootstrap.scss';
import Time from '../ui/time';
import { StationSummaryProps } from './summary';

const Summary2 = (props: StationSummaryProps) => (
    <div className={`${bs.card} ${bs.h100}`}>
        <div className={`${bs.cardHeader} `}>
            <div><a href="#" onClick={props.onSelect}>{props.station.name}</a></div>
        </div>

        <div className={`${cs.localTime} ${bs.cardFooter}`}>
            <i className="far fa-clock"></i>&nbsp;<span>{props.station.utc && <Time utcOffset={props.station.utc} />}</span>
            <p><i className="fas fa-map-marker-alt"></i>&nbsp;{props.station.location}</p>
        </div>
        <div className={bs.cardBody}>
            <div className={bs.cardGrow}>

                {props.station.note && <div>
                    {props.station.note.twitterClout && <p><i className="fas fa-angle-right"></i>{props.station.note.twitterClout} on Twitter</p>}
                    {props.station.note.instagramClout && <p><i className="fas fa-angle-right"></i>{props.station.note.instagramClout} on Instagram</p>}
                    {props.station.note.preferredContact && <p><i className="fas fa-angle-right"></i>Preferred Contact is {props.station.note.preferredContact}</p>}
                    {props.station.note.stationCred && <p><i className="fas fa-angle-right"></i>{props.station.note.programmingTips}</p>}
                    {props.station.note.programmingTips && <p><i className="fas fa-angle-right"></i>{props.station.note.programmingTips}</p>}
                    {props.station.note.app && <p><i className="fas fa-angle-right"></i>Station has an app.</p>}
                    {props.station.note.general && <p><i className="fas fa-angle-right"></i>{props.station.note.general}</p>}
                    {props.selectedArtist === "harry" && props.station.note.harry && <p><i className="fas fa-angle-right"></i>{props.station.note.harry}</p>}
                    {props.selectedArtist === "liam" && props.station.note.liam && <p><i className="fas fa-angle-right"></i>{props.station.note.liam}</p>}
                    {props.selectedArtist === "louis" && props.station.note.louis && <p><i className="fas fa-angle-right"></i>{props.station.note.louis}</p>}
                    {props.selectedArtist === "niall" && props.station.note.niall && <p><i className="fas fa-angle-right"></i>{props.station.note.niall}</p>}
                    {props.selectedArtist === "zayn" && props.station.note.zayn && <p><i className="fas fa-angle-right"></i>{props.station.note.zayn}</p>}
                </div>}
            </div>

        </div>
        <div className={bs.cardFooter}>
            <div className={`${bs.row} ${bs.noGutters}`}>
                <div className={bs.col}><a href="javascript:;" onClick={props.onSelect}><i className="fas fa-eye"></i></a></div>
                <div className={bs.col}>{props.station.website && <a href={props.station.website} target="_blank"><i className="fas fa-link"></i></a>}</div>
                <div className={bs.col}>{props.station.twitter && <a href="#" className="twitter" onMouseDown={props.setTweetUrl} onMouseEnter={props.setTweetUrl} target="_blank"><i className="fab fa-twitter"></i></a>}</div>
                <div className={bs.col}>{props.station.instagram && <a href={`https://instagram.com/${props.station.instagram}`} target="_blank"><i className="fab fa-instagram"></i></a>}</div>
                <div className={bs.col}>{props.station.facebook && <a href={`https://facebook.com/${props.station.facebook}`} target="_blank"><i className="fab fa-facebook"></i></a>}</div>
                <div className={bs.col}>{props.station.email && <a href={props.emailHref} target="_blank"><i className="fas fa-envelope"></i></a>}</div>
                <div className={bs.col}>{props.station.text && <a href="javascript:;" onClick={props.onSelect}><i className="fas fa-comment"></i></a>}</div>
                <div className={bs.col}>{props.station.phone && <a href={`tel:${props.station.phone}`}><i className="fas fa-phone"></i></a>}</div>
                <div className={bs.col}>{props.station.note && <a href="javascript:;" onClick={props.onSelect}><i onClick={props.onSelect} className="fas fa-sticky-note"></i></a>}</div>
            </div>
        </div>
        <div className={cs.actions}>
            <div className={`${bs.row} ${bs.noGutters}`}>
                <button onClick={props.onSelect} className={`${bs.btn} ${bs.btnOutlineSecondary} ${bs.btnBlock}`}><i className="fas fa-microphone"></i>&nbsp; <span>Station Details</span></button>
            </div>
            <div className={`${bs.row} ${bs.noGutters}`}>
                <button onClick={props.onOnAirSelect} className={`${bs.btn} ${bs.btnOutlineSecondary} ${bs.btnBlock}`}><i className="fas fa-user-friends"></i>&nbsp; <span>{props.onAir} DJ{props.onAir == 1 ? "" : "s"} {props.onAir == 1 ? "or" : "and"} Show{props.onAir == 1 ? "" : "s"}</span></button>
            </div>
        </div>
    </div>
);

export default Summary2;