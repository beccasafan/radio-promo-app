import * as React from 'react';

export interface ModalHeaderProps {
    children: React.ReactNode
}

export const ModalHeader: React.FunctionComponent<ModalHeaderProps> = (props: ModalHeaderProps) => {
    return (
        <div className="modal-header">
            {props.children}
        </div>
    );
};