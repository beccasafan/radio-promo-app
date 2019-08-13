import React, { Component } from 'react';
import 'bootstrap/dist/js/bootstrap';
import * as bs from 'src/bootstrap.scss';
import { ModalEventHandler } from 'bootstrap';


export interface ModalProps {
    children: React.ReactNode;
    contentKey: string;
    handleClose: (e: ModalEventHandler<HTMLDivElement>) => void;
    events: {[key: string]: any};
}

export class Modal extends Component<ModalProps, {}> {
    private el!: HTMLElement | null;
    private $el!: JQuery<HTMLDivElement>;
    
    constructor(props: ModalProps) {
        super(props);
    }


    componentDidMount() {
        this.$el = $(this.el!) as JQuery<HTMLDivElement>;
        //this.$el.appendTo("body") 
        this.$el.on("hidden.bs.modal", (e) => this.props.handleClose(e));

        let modalBody = this.$el.find(".modal-body");
        /*this.$el
            .on("show.bs.modal", (e) => {
                this.$el.addClass(bs.show);
            })
            .on("shown.bs.modal", (e) => {
                $("div.modal-backdrop.show").addClass(`${bs.modalBackdrop} ${bs.show} ${bs.fade}`);
            })
            .on("hide.bs.modal", (e) => {
                this.$el.removeClass(bs.show);
            });
        ;*/
        Object.keys(this.props.events).forEach(key => $(this.el!).on(key, (e) => { this.props.events[key](e) }));
        this.$el.modal({focus: true});

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
            <div ref={el => this.el = el} className={`${bs.modal} ${bs.fade} modal fade`} tabIndex={-1} role="dialog">
                <div className={bs.modalDialog} role="document">
                    <div className={bs.modalContent}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
};