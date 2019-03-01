import * as React from 'react';

export interface ModalBodyProps {
    children: React.ReactNode
}

export const ModalBody: React.FunctionComponent<ModalBodyProps> = (props: ModalBodyProps) => {
    return (
        <div className="modal-body">
            {props.children}
        </div>
    );
};