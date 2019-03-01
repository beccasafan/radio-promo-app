import * as React from 'react';

export interface ModalProps {
    id: string;
    children: React.ReactNode;
    open: boolean;
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
    }

    componentWillUnmount() {
        this.$el.modal("dispose");
    }

    componentDidUpdate(prevProps: any) {
        if (prevProps != this.props) {
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