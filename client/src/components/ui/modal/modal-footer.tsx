import * as React from 'react';
import * as Bootstrap from 'src/bootstrap.scss';

export interface ModalFooterProps {
    children: React.ReactNode;
}

export const ModalFooter = (props: ModalFooterProps) => {
    return (
        <div className={Bootstrap.modalFooter}>
            {props.children}
        </div>
    );
};