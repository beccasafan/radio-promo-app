import * as React from 'react';

export interface ModalProps {
    id: string;
}

export const Modal: React.FunctionComponent<ModalProps> = (props: ModalProps) => {
    return (
        <div className="modal" tabIndex={-1} role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    {this.props.children}
                </div>
            </div>
        </div>
    );
};