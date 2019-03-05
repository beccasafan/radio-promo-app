import * as React from 'react';
import { StationDetail } from '../../../../common/models/stations/stationDetail';
import { StationSummary } from '../../../../common/models/stations/stationSummary';
import { Modal } from "./../plugins/modal";
import * as bootstrap from 'bootstrap';
import { ModalHeader } from '../plugins/modalHeader';
import { ModalBody } from '../plugins/modalBody';
import { ModalFooter } from '../plugins/modalFooter';
import { Talent } from '../talent/talent';
import { Talent as TalentModel } from "../../../../common/models/talent/talent";

export interface StationDetailProps {
    station: StationSummary;
    detail: StationDetail;
    handleClose: (e: bootstrap.ModalEventHandler<HTMLDivElement>) => void;
    getTweetUrl: (station: StationSummary|TalentModel, languageId?: string) => string;
    onModalOpen: (e: bootstrap.ModalEventHandler<HTMLDivElement>) => void;
    onModalClose: (e: bootstrap.ModalEventHandler<HTMLDivElement>) => void;
}

export interface StationDetailState {
}

export class Detail extends React.Component<StationDetailProps, StationDetailState> {
    constructor(props: StationDetailProps) {
        super(props);

        this.state = {
        };

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(e: bootstrap.ModalEventHandler<HTMLDivElement>) {
        this.props.handleClose(e);
    }

    render() {
        let idFragment = `station_detail_${this.props.station.id}`;
        return (
            <Modal contentKey={this.props.station != null ? this.props.station.id : null } handleClose={this.handleClose} events={{"show.bs.modal": this.props.onModalOpen, "hide.bs.modal": this.props.onModalClose}}>
                <ModalHeader>
                    <h5 className="modal-title" id="station-detail-header">{this.props.station.name}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </ModalHeader>
                <ModalBody>
                    <div id={idFragment}>
                        <div className="card">
                            <div className="card-header" id={`${idFragment}_details_heading`}>
                                <h5 className="mb-0">
                                    <button className="btn btn-link" data-toggle="collapse" data-target={`#${idFragment}_details`}>Station Details</button>
                                </h5>
                            </div>

                            <div id={`${idFragment}_details`} className="collapse show" aria-labelledBy={`${idFragment}_details_heading`} data-parent={`#${idFragment}`}>
                                <div className="card-body">
                                    {this.props.detail && this.props.detail.location && <p>{this.props.detail.location}</p>}
                                    {this.props.detail && this.props.detail.parentGroup && <p>{this.props.detail.parentGroup}</p>}
                                    {this.props.detail && this.props.detail.note && <p>{this.props.detail.note}</p>}
                                    {this.props.detail && this.props.detail.website && <p><a href={this.props.station.website} target="_blank"><i className="fas fa-link"></i> {this.props.station.website}</a></p>}
                                    {this.props.detail && this.props.detail.twitter && <p><a href={this.props.getTweetUrl(this.props.station)} target="_blank"><i className="fab fa-twitter"></i> {this.props.detail.twitter}</a></p>}
                                    {this.props.detail && this.props.detail.instagram && <p><a href={`https://instagram.com/${this.props.station.instagram}`} target="_blank"><i className="fab fa-instagram"></i> {this.props.detail.instagram}</a></p>}
                                    {this.props.detail && this.props.detail.facebook && <p><a href={`https://facebook.com/${this.props.station.facebook}`} target="_blank"><i className="fab fa-facebook"></i> {this.props.detail.facebook}</a></p>}
                                    {this.props.detail && this.props.detail.email && <p><a href={`mailto:${this.props.station.email}`} target="_blank"><i className="fas fa-envelope"></i> {this.props.detail.email}</a></p>}
                                    {this.props.detail && this.props.detail.text && <p><i className="fas fa-comment"></i> {this.props.detail.text}</p>}
                                    {this.props.detail && this.props.detail.phone && (<p><a href={`tel:${this.props.station.phone}`}><i className="fas fa-phone"></i> {this.props.detail.phone}</a></p>)}
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header" id={`${idFragment}_talent_heading`}>
                                <h5 className="mb-0">
                                    <button className="btn btn-link" data-toggle="collapse" data-target={`#${idFragment}_talent`}>Talent</button>
                                </h5>
                            </div>

                            <div id={`${idFragment}_talent`} className="collapse show" aria-labelledBy={`${idFragment}_talent_heading`} data-parent={`#${idFragment}`}>
                                <div className="card-body">
                                    {this.props.detail && this.props.detail.talent && this.props.detail.talent.map(t => <Talent talent={t} languageId={this.props.station.languageId} getTweetUrl={this.props.getTweetUrl} />)}                                    
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header" id={`${idFragment}_talent_heading`}>
                                <h5 className="mb-0">
                                    <button className="btn btn-link" data-toggle="collapse" data-target={`#${idFragment}_talent`}>Talent</button>
                                </h5>
                            </div>

                            <div id={`${idFragment}_talent`} className="collapse show" aria-labelledBy={`${idFragment}_talent_heading`} data-parent={`#${idFragment}`}>
                                <div className="card-body">
                                    {this.props.detail && this.props.detail.syndicatedTalent && this.props.detail.syndicatedTalent.map(t => <Talent talent={t} languageId={this.props.station.languageId} getTweetUrl={this.props.getTweetUrl} />)}
                                </div>
                            </div>
                        </div>                        
                    </div>
                    {this.props.detail == null && <p>Loading...</p>}
                </ModalBody>
                <ModalFooter>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </ModalFooter>
            </Modal>
        )
    }
}