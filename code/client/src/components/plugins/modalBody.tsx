import * as React from 'react';

export interface ModalBodyProps {

}

export const ModalBody: React.FunctionComponent<ModalBodyProps> = (props: ModalBodyProps) => {
    return (
        <div className="modal-body">
            {this.props.children}
        </div>
    );
};