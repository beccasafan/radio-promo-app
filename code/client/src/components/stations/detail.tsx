import * as React from 'react';
import { StationDetail } from '../../../../common/models/stations/stationDetail';
import { StationSummary } from '../../../../common/models/stations/stationSummary';
import { Modal } from "./../plugins/modal";
import * as bootstrap from 'bootstrap';
import { ModalHeader } from '../plugins/modalHeader';
import { ModalBody } from '../plugins/modalBody';
import { ModalFooter } from '../plugins/modalFooter';
import { Talent } from '../talent/talent';

export interface StationDetailProps {
    station: StationSummary;
    detail: StationDetail;
    handleClose: (e: bootstrap.ModalEventHandler<HTMLDivElement>) => void;
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
        return (
            <Modal contentKey={this.props.station != null ? this.props.station.id : null } handleClose={this.handleClose}>
                <ModalHeader>
                    <h5 className="modal-title" id="station-detail-header">{this.props.station.name}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </ModalHeader>
                <ModalBody>
                    {this.props.detail && this.props.detail.location && <p>{this.props.detail.location}</p>}
                    {this.props.detail && this.props.detail.parentGroup && <p>{this.props.detail.parentGroup}</p>}
                    {this.props.detail && this.props.detail.note && <p>{this.props.detail.note}</p>}
                    {this.props.detail && this.props.detail.website && <p>{this.props.detail.website}</p>}
                    {this.props.detail && this.props.detail.twitter && <p>{this.props.detail.twitter}</p>}
                    {this.props.detail && this.props.detail.instagram && <p>{this.props.detail.instagram}</p>}
                    {this.props.detail && this.props.detail.facebook && <p>{this.props.detail.facebook}</p>}
                    {this.props.detail && this.props.detail.email && <p>{this.props.detail.email}</p>}
                    {this.props.detail && this.props.detail.text && <p>{this.props.detail.text}</p>}
                    {this.props.detail && this.props.detail.phone && <p>{this.props.detail.phone}</p>}

                    {this.props.detail && this.props.detail.talent && this.props.detail.talent.map(t => <Talent talent={t} />)}
                    {this.props.detail && this.props.detail.syndicatedTalent && this.props.detail.syndicatedTalent.map(t => <Talent talent={t} />)}

                    {this.props.detail == null && <p>Loading...</p>}
                </ModalBody>
                <ModalFooter>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </ModalFooter>
            </Modal>
        )
    }
}