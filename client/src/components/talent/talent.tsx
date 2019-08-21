import React, { Component } from 'react';
import { Talent as TalentModel, Station } from 'radio-app-2-shared';
import * as bootstrap from 'src/bootstrap.scss';

import * as styles from './talent.module.scss';
import { getTweet } from 'src/logic/helpers/twitter';
import TalentTime from '../ui/talent-time';
import NoteContent from '../ui/note-content';

interface OwnProps {
    station: Station;
    talent: TalentModel;
    languageId: string;
}

export default class Talent extends Component<OwnProps> {
    private el!: HTMLElement;
    private $el: JQuery<HTMLDivElement> | undefined;

    constructor(props: OwnProps) {
        super(props);

        this.setTweetUrl = this.setTweetUrl.bind(this);
    }

    setTweetUrl() {
        getTweet(this.el, this.props.station, this.props.talent);
    }

    render() {
        return (
            <div ref={el => this.el = el as HTMLElement} className={`my-3 ${styles.talent}`}>
                <div className={bootstrap.card}>
                    <div className={`${styles.name} ${bootstrap.fontWeightBold}`}>{this.props.talent.name}</div>
                    <div className={bootstrap.cardBody}>
                        {this.props.talent.schedule && <NoteContent text={this.props.talent.schedule} />}
                        {this.props.talent.note && <NoteContent text={this.props.talent.note} />}
                        <div className="row">
                            <div className="col">
                                {this.props.talent.twitter && <a className="twitter px-3" onMouseDown={this.setTweetUrl} onMouseEnter={this.setTweetUrl} target="_blank"><i className="fab fa-twitter"></i></a>}
                                {this.props.talent.instagram && <a className="px-3" href={`https://instagram.com/${this.props.talent.instagram}`} target="_blank"><i className="fab fa-instagram"></i></a>}
                                {this.props.talent.facebook && <a className="px-3" href={`https://facebook.com/${this.props.talent.facebook}`} target="_blank"><i className="fab fa-facebook"></i></a>}
                                {this.props.talent.email && <a className="px-3" href={`mailto:${this.props.talent.email}`} target="_blank"><i className="fas fa-envelope"></i></a>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
