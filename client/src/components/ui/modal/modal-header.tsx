import * as React from 'react';
import * as Bootstrap from 'src/bootstrap.scss';

export interface ModalHeaderProps {
    children: React.ReactNode
}

const ModalHeader = (props: ModalHeaderProps) => {
    return (
        <div className={Bootstrap.modalHeader}>
            {props.children}
        </div>
    );
};

export default ModalHeader;