import * as React from 'react';
import * as Bootstrap from 'src/bootstrap.scss';

export interface ModalBodyProps {
    children: React.ReactNode
}

export const ModalBody = (props: ModalBodyProps) => {
    return (
        <div className={`${Bootstrap.modalBody} modal-body`}>
            {props.children}
        </div>
    );
};