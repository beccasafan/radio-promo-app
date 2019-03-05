import * as React from 'react';
import { ModalEventHandler } from 'bootstrap';
import { Util } from '../../../../common/util/util';
import * as styles from "./../../styles/modal.scss";

export interface ModalProps {
    children: React.ReactNode;
    contentKey: string;
    handleClose: (e: ModalEventHandler<HTMLDivElement>) => void;
    events: {[key: string]: any};
}

export interface ModalState {
}

declare var google: any;

export class Modal extends React.Component<ModalProps, ModalState> {
    private el: HTMLElement;
    private $el: JQuery<HTMLDivElement>;
    
    constructor(props: ModalProps) {
        super(props);
    }


    componentDidMount() {
        this.$el = $(this.el) as JQuery<HTMLDivElement>;
        //this.$el.appendTo("body") 
        this.$el.modal({focus: true});
        this.$el.on("hidden.bs.modal", (e) => this.props.handleClose(e));

        let modalBody = this.$el.find(".modal-body");
        Object.keys(this.props.events).forEach(key => $(this.el).on(key, (e) => { this.props.events[key](e) }));
        this.$el.on("shown.bs.modal", (e) => {google.script.run.consoleLog("modal position", modalBody.scrollTop(), modalBody.position().top, window.scrollY)});
    }

    componentWillUnmount() {
        this.$el.modal("dispose");
    }

    componentDidUpdate(prevProps: any) {
        if (this.props.contentKey != null) {
            //this.props.events.onModalOpen();
            this.$el.modal("show");
        } else {
            this.$el.modal("hide");
        }
    }

    render() {
        return (
            <div ref={el => this.el = el} className={`modal fade`} tabIndex={-1} role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
};