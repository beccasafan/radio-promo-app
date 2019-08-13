import React from 'react';
import { Station } from 'radio-app-2-shared';
import { getUrl } from 'src/route';
import * as cs from './station.module.scss';
import * as bs from 'src/bootstrap.scss';
import Time from '../ui/time';
import { StationSummaryProps } from './summary';

const Summary1 = (props: StationSummaryProps) => (
    <div className={`${bs.card} ${bs.h100}`}>
        <div className={bs.cardHeader}>
            <div className={bs.row}>
                <div className={bs.col}><span onClick={props.onSelect}>{props.station.code}</span></div>
                <div className={bs.colAuto}><i className="clipboard fas fa-external-link-alt" data-clipboard-text={props.url} data-placement="bottom" data-trigger="manual" data-title="Copied"></i></div>
            </div>
        </div>
        <div className={bs.cardBody}>
            <h5 className={bs.cardTitle} onClick={props.onSelect}>{props.station.name}</h5>
            <p className={bs.cardText}>{props.station.location}</p>
            <div className={bs.cardGrow}>
                {props.station.parentGroup && <p className={bs.cardText}>{props.station.parentGroup}</p>}
                {props.onAir > 0 && <p className={bs.cardText}>{props.onAir} On-Air Contact{props.onAir == 1 ? "" : "s"}</p>}
                {props.station.note && <p className={bs.cardText}>{props.station.note}</p>}
                {props.station.utc && <p className={bs.cardText}><Time utcOffset={props.station.utc} /></p>}
            </div>
            <a href="javascript:;" onClick={props.onSelect} className={`${bs.btn} ${bs.btnOutlineSecondary} ${bs.btnBlock}`}>View</a>
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
    </div>
);

export default Summary1;