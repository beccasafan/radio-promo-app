import React, { Component } from 'react';
import * as Bootstrap from 'src/bootstrap.scss';
import ModalHeader from '../ui/modal/modal-header';
import { Modal } from '../ui/modal/modal';
import { ModalBody } from '../ui/modal/modal-body';
import { ModalFooter } from '../ui/modal/modal-footer';
import { setRouteData } from 'src/route';

declare var publicUrl: string;

export default class UserGuide extends Component<{}> {
    private el!: HTMLElement;

    constructor(props: {}) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
        this.onModalOpen = this.onModalOpen.bind(this);
    }

    handleClose() {
        console.log("handleClose");
        setRouteData({userGuide: null});
    }

    onModalClose() {
        console.log("onModalClose");
        window.scrollTo(0, 0);
    }

    onModalOpen() {
        console.log("onModalOpen");
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div ref={el => this.el = el as HTMLElement}>
                <Modal contentKey="user-guide" handleClose={this.handleClose} events={{ "show.bs.modal": this.onModalOpen, "hide.bs.modal": this.onModalClose}}>
                    <ModalHeader>
                        <h5 className={Bootstrap.modalTitle}>How To Use the Radio Request Database</h5>
                        <a className={Bootstrap.close} data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </a>
                    </ModalHeader>
                    <ModalBody>
                        <img className={Bootstrap.imgFluid} src={`${publicUrl}/how-to-search.jpg`} alt="How To Search Guide" />
                        <a href={`${publicUrl}/how-to-search.jpg`} className={`${Bootstrap.btn} ${Bootstrap.btnLink} ${Bootstrap.pl0}`} target="_blank">Click to view full image</a>
                    </ModalBody>
                    <ModalFooter>
                        <button type="button" className={`${Bootstrap.btn} ${Bootstrap.btnSecondary}`} data-dismiss="modal">Close</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}