import * as React from 'react';
import { ModalEventHandler } from 'bootstrap';
import { Util } from '../../../../common/util/util';
import * as styles from "./../../styles/modal.scss";

export interface ModalProps {
    children: React.ReactNode;
    contentKey: string;
    handleClose: (e: ModalEventHandler<HTMLDivElement>) => void;
}

export interface ModalState {
}

export class Modal extends React.Component<ModalProps, ModalState> {
    private el: HTMLElement;
    private $el: JQuery<HTMLDivElement>;
    
    constructor(props: ModalProps) {
        super(props);
    }


    componentDidMount() {
        this.$el = $(this.el) as JQuery<HTMLDivElement>;
        this.$el.appendTo("body") 
        this.$el.modal({});
        this.$el.on("hidden.bs.modal", (e) => this.props.handleClose(e));
    }

    componentWillUnmount() {
        this.$el.modal("dispose");
    }

    componentDidUpdate(prevProps: any) {
        console.log("modal", prevProps, this.props);
        if (this.props.contentKey != null) {
            this.$el.modal("show");
        } else {
            this.$el.modal("hide");
        }
    }

    render() {
        return (
            <div ref={el => this.el = el} className={`modal ${styles.modalCenter}`} tabIndex={-1} role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
};