import * as React from 'react';

export interface ModalFooterProps {
    children: React.ReactNode;
}

export const ModalFooter: React.FunctionComponent<ModalFooterProps> = (props: ModalFooterProps) => {
    return (
        <div className="modal-footer">
            {props.children}
        </div>
    );
};