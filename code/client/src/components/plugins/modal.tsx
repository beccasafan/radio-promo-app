import * as React from 'react';
import { ModalEventHandler } from 'bootstrap';

export interface ModalProps {
    id: string;
    children: React.ReactNode;
    open: boolean;
    handleClose: (e: ModalEventHandler<HTMLDivElement>) => void;
}

export interface ModalState {
    open: boolean;
}

export class Modal extends React.Component<ModalProps, ModalState> {
    private el: HTMLElement;
    private $el: JQuery<HTMLDivElement>;
    
    constructor(props: ModalProps) {
        super(props);
    }


    componentDidMount() {
        this.$el = $(this.el) as JQuery<HTMLDivElement>;
        this.$el.modal({});
        this.$el.on("hidden.bs.modal", (e) => this.props.handleClose(e));
    }

    componentWillUnmount() {
        this.$el.modal("dispose");
    }

    componentDidUpdate(prevProps: any) {
        console.log("modal", prevProps, this.props);
        if (prevProps.open != this.props.open) {
            if (this.props == null || !this.props.open) {
                this.$el.modal("hide");
            } else if (this.props != null && this.props.open) {
                this.$el.modal("show");
            }
        }
    }

    render() {
        return (
            <div className="modal" tabIndex={-1} role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
};