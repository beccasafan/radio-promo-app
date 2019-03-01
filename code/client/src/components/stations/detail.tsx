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
    private el: HTMLElement;
    private $el: JQuery<HTMLDivElement>;

    constructor(props: StationDetailProps) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {
        this.$el = $(this.el) as JQuery<HTMLDivElement>;
        this.$el.modal({});
    }

    componentWillUnmount() {
        this.$el.modal("dispose");
    }

    componentDidUpdate(prevProps: any) {
        if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
            if (this.props == null) {
                this.$el.modal("hide");
            } else {
                this.$el.modal("show");
            }
        }
    }

    render() {
        return (
            <Modal id="station-detail">
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