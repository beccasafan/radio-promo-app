import * as React from 'react';
import { StationDetail } from '../../../../common/models/stations/stationDetail';
import { StationSummary } from '../../../../common/models/stations/stationSummary';
import { Modal } from "./../plugins/modal";
import * as bootstrap from 'bootstrap';
import { ModalHeader } from '../plugins/modalHeader';
import { ModalBody } from '../plugins/modalBody';
import { ModalFooter } from '../plugins/modalFooter';

export interface StationDetailProps {
    station: StationSummary;
    detail: StationDetail;
}

export interface StationDetailState {

}

export class Detail extends React.Component<StationDetailProps, StationDetailState> {
    constructor(props: StationDetailProps) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <Modal id="station-detail" open={this.props.station != null}>
                <ModalHeader>
                    <h5 className="modal-title" id="station-detail-header">{this.props.station.name}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </ModalHeader>
                <ModalBody>
                    {this.props.detail && <span>{this.props.detail.note}</span>}
                    {this.props.detail == null && <span>Loading...</span>}
                </ModalBody>
                <ModalFooter>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </ModalFooter>
            </Modal>
        )
    }
}