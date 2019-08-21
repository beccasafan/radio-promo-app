import React from 'react';
import { Modal } from "../ui/modal/modal";
import ModalHeader from "../ui/modal/modal-header";
import { ModalBody } from "../ui/modal/modal-body";
import { StationSummary, StationDetail } from "radio-app-2-shared";
import { ModalFooter } from "../ui/modal/modal-footer";
import Talent from "../talent/talent";
import { Component } from "react";
import { getTweet } from "src/logic/helpers/twitter";
import { setRouteData } from "src/route";
import { AppState } from "src/logic/store";
import { actions } from "src/logic/stations/stations-redux";
import { connect } from "react-redux";
import * as Bootstrap from 'src/bootstrap.scss';
import styles from './station.module.scss';
import Time from '../ui/time';

interface OwnProps {
    id: string;
}
interface StateProps {
    station: StationSummary;
    detail?: StationDetail;
    selectedArtist?: string;
    section?: string;
}
interface DispatchProps {
    loadStationDetails: (country: string, station: string) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

class Detail extends Component<Props> {
    private el!: HTMLElement;

    constructor(props: Props) {
        super(props);

        this.setTweetUrl = this.setTweetUrl.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
        this.onModalOpen = this.onModalOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        this.props.loadStationDetails(this.props.station.countryId, this.props.station.id);
    }
    componentDidUpdate(prevProps: Props) {
        if (prevProps.id !== this.props.id) {
            this.props.loadStationDetails(this.props.station.countryId, this.props.id);
        }
    }

    setTweetUrl() {
        getTweet(this.el, this.props.station);
    }
    onModalClose() {
        var stationElement = $(`#station_${this.props.station.id}`);

        window.scrollTo(0, stationElement.position().top);
    }
    onModalOpen() {
        window.scrollTo(0, 0);
    }
    handleClose() {
        setRouteData({ station: null, section: null });
    }
    render() {
        const idFragment = `station_detail_${this.props.id}`;

        let section = this.props.section;
        if (section === "onair") {
            if (this.props.station.talent == 0 && this.props.station.syndicated > 0) {
                section = "syndicated";
            }
            else if (this.props.station.talent == 0 && this.props.station.syndicated == 0) {
                section = "detail";
            }
        }

        return (
            <div ref={el => this.el = el as HTMLElement}>
                <Modal contentKey={this.props.station.id} handleClose={this.handleClose} events={{ "show.bs.modal": this.onModalOpen, "hide.bs.modal": this.onModalClose }}>
                    <ModalHeader>
                        <h5 className={Bootstrap.modalTitle} id="station-detail-header">{this.props.station.name}</h5>
                        <a className={Bootstrap.close} data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </a>
                    </ModalHeader>
                    <ModalBody>
                        <div id={idFragment} className={styles.station}>
                            <div className={Bootstrap.card}>

                                <div className={styles.localTime}>
                                    <div><i className="far fa-clock"></i>&nbsp;<span>{this.props.station.utc && <Time utcOffset={this.props.station.utc} />}</span></div>
                                    <div><i className="fas fa-map-marker-alt"></i>&nbsp;{this.props.station.location}</div>
                                    {this.props.station.format && <div className={Bootstrap.fontItalic}><i className="fas fa-music"></i> {this.props.station.format.name}</div>}
                                 </div>
                                <div className={Bootstrap.cardHeader} id={`${idFragment}_details_heading`}>
                                    <h5 className={Bootstrap.mb0}>
                                        <button className={`${Bootstrap.btn} ${Bootstrap.btnLink}`} data-toggle="collapse" data-target={`#${idFragment}_details`}>Station Details</button>
                                    </h5>
                                </div>


                                <div id={`${idFragment}_details`} className={`${Bootstrap.collapse} ${section === "detail" ? Bootstrap.show : ""}`} aria-labelledby={`${idFragment}_details_heading`} data-parent={`#${idFragment}`}>
                                    <div className={Bootstrap.cardBody}>
                                        <p>{this.props.station.code} {this.props.station.parentGroup && <span> // {this.props.station.parentGroup}</span>}</p>
                                        {this.props.station.note && <div>
                                            {this.props.station.note.twitterClout && <p><i className="fas fa-angle-right"></i>{this.props.station.note.twitterClout} on Twitter</p>}
                                            {this.props.station.note.instagramClout && <p><i className="fas fa-angle-right"></i>{this.props.station.note.instagramClout} on Instagram</p>}
                                            {this.props.station.note.preferredContact && <p><i className="fas fa-angle-right"></i>Preferred Contact is {this.props.station.note.preferredContact}</p>}
                                            {this.props.station.note.stationCred && <p><i className="fas fa-angle-right"></i>{this.props.station.note.programmingTips}</p>}
                                            {this.props.station.note.programmingTips && <p><i className="fas fa-angle-right"></i>{this.props.station.note.programmingTips}</p>}
                                            {this.props.station.note.app && <p><i className="fas fa-angle-right"></i>Station has an app.</p>}
                                            {this.props.station.note.general && <p><i className="fas fa-angle-right"></i>{this.props.station.note.general}</p>}
                                            {this.props.selectedArtist === "harry" && this.props.station.note.harry && <p><i className="fas fa-angle-right"></i>{this.props.station.note.harry}</p>}
                                            {this.props.selectedArtist === "liam" && this.props.station.note.liam && <p><i className="fas fa-angle-right"></i>{this.props.station.note.liam}</p>}
                                            {this.props.selectedArtist === "louis" && this.props.station.note.louis && <p><i className="fas fa-angle-right"></i>{this.props.station.note.louis}</p>}
                                            {this.props.selectedArtist === "niall" && this.props.station.note.niall && <p><i className="fas fa-angle-right"></i>{this.props.station.note.niall}</p>}
                                            {this.props.selectedArtist === "zayn" && this.props.station.note.zayn && <p><i className="fas fa-angle-right"></i>{this.props.station.note.zayn}</p>}
                                        </div>}
                                        {this.props.station.oldNote && <p>{this.props.station.oldNote}</p>}
                                        {this.props.station.website && <p><a href={this.props.station.website} target="_blank"><i className="fas fa-link"></i> {this.props.station.website}</a></p>}
                                        {this.props.station.twitter && <p><a href="#" className="twitter" onMouseDown={this.setTweetUrl} onMouseEnter={this.setTweetUrl} target="_blank"><i className="fab fa-twitter"></i> {this.props.station.twitter}</a></p>}
                                        {this.props.station.instagram && <p><a href={`https://instagram.com/${this.props.station.instagram}`} target="_blank"><i className="fab fa-instagram"></i> {this.props.station.instagram}</a></p>}
                                        {this.props.station.facebook && <p><a href={`https://facebook.com/${this.props.station.facebook}`} target="_blank"><i className="fab fa-facebook"></i> {this.props.station.facebook}</a></p>}
                                        {this.props.station.email && <p><a href={`mailto:${this.props.station.email}`} target="_blank"><i className="fas fa-envelope"></i> {this.props.station.email}</a></p>}
                                        {this.props.station.text && <p><i className="fas fa-comment"></i> {this.props.station.text}</p>}
                                        {this.props.station.phone && (<p><a href={`tel:${this.props.station.phone}`}><i className="fas fa-phone"></i> {this.props.station.phone}</a></p>)}
                                    </div>
                                </div>
                            </div>

                            {this.props.detail && this.props.detail.talent && this.props.detail.talent.length > 0 &&
                                <div className={Bootstrap.card}>
                                    <div className={Bootstrap.cardHeader} id={`${idFragment}_talent_heading`}>
                                        <h5 className={Bootstrap.mb0}>
                                            <button className={`${Bootstrap.btn} ${Bootstrap.btnLink}`} data-toggle="collapse" data-target={`#${idFragment}_talent`}>DJs and Shows</button>
                                        </h5>
                                    </div>

                                    <div id={`${idFragment}_talent`} className={`${Bootstrap.collapse} ${section === "onair" ? Bootstrap.show : ""}`} aria-labelledby={`${idFragment}_talent_heading`} data-parent={`#${idFragment}`}>
                                        <div className={Bootstrap.cardBody}>
                                            {this.props.detail.talent.map(t => <Talent key={t.id} station={this.props.station} talent={t} languageId={this.props.station.languageId} />)}
                                        </div>
                                    </div>
                                </div>}
                            {this.props.detail && this.props.detail.syndicatedTalent && this.props.detail.syndicatedTalent.length > 0 &&
                                <div className={Bootstrap.card}>
                                    <div className={Bootstrap.cardHeader} id={`${idFragment}_syndicatedTalent_heading`}>
                                        <h5 className={Bootstrap.mb0}>
                                            <button className={`${Bootstrap.btn} ${Bootstrap.btnLink}`} data-toggle="collapse" data-target={`#${idFragment}_syndicatedTalent`}>Syndicated DJs and Shows</button>
                                        </h5>
                                    </div>

                                    <div id={`${idFragment}_syndicatedTalent`} className={`${Bootstrap.collapse} ${section === "syndicated" ? Bootstrap.show : ""}`} aria-labelledby={`${idFragment}_syndicatedTalent_heading`} data-parent={`#${idFragment}`}>
                                        <div className={Bootstrap.cardBody}>
                                            {this.props.detail.syndicatedTalent.map(t => <Talent key={t.id} station={this.props.station} talent={t} languageId={this.props.station.languageId} />)}
                                        </div>
                                    </div>
                                </div>}
                            {this.props.detail == null && this.props.station.talent + this.props.station.syndicated > 0 && <p>Loading...</p>}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button type="button" className={`${Bootstrap.btn} ${Bootstrap.btnSecondary}`} data-dismiss="modal">Close</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
};

function mapStateToProps(appState: AppState, ownProps: OwnProps): StateProps {
    return {
        station: appState.stations.items.byId[ownProps.id],
        detail: appState.stations.detail,
        selectedArtist: appState.routes.artist,
        section: appState.routes.section || "detail"
    }
}

const mapDispatchToProps = {
    loadStationDetails: (country: string, station: string) => actions.getStationDetails.action({ country, station })
}

export default connect<StateProps, DispatchProps, OwnProps, AppState>(mapStateToProps, mapDispatchToProps)(Detail);