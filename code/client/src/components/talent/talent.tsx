import * as React from 'react';
import { Talent as TalentModel } from "../../../../common/models/talent/talent";
import { Util } from "../../../../common/util/util";
import * as styles from "./../../styles/station.scss";
import { StationSummary } from '../../../../common/models/stations/stationSummary';

export interface TalentProps {
    talent: TalentModel;
    languageId: string;
    getTweetUrl: (station: StationSummary|TalentModel, languageId?: string) => string;
}

export interface TalentState {

}

export class Talent extends React.Component<TalentProps, TalentState> {
    constructor(props: TalentProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={styles.talent}>
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">{this.props.talent.name}</div>
                        {!Util.isEmpty(this.props.talent.note) && <p className="card-text">{this.props.talent.note}</p>}
                        <div className="row">
                        <div className="col">{this.props.talent.twitter && <a href={this.props.getTweetUrl(this.props.talent, this.props.languageId)} target="_blank"><i className="fab fa-twitter"></i></a>}</div>
                            <div className="col">{this.props.talent.instagram && <a href={`https://instagram.com/${this.props.talent.instagram}`} target="_blank"><i className="fab fa-instagram"></i></a>}</div>
                            <div className="col">{this.props.talent.facebook && <a href={`https://facebook.com/${this.props.talent.facebook}`} target="_blank"><i className="fab fa-facebook"></i></a>}</div>
                            <div className="col">{this.props.talent.email && <a href={`mailto:${this.props.talent.email}`} target="_blank"><i className="fas fa-envelope"></i></a>}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}