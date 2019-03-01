import * as React from 'react';

export interface ModalFooterProps {

}

export const ModalFooter: React.FunctionComponent<ModalFooterProps> = (props: ModalFooterProps) => {
    return (
        <div className="modal-footer">
            {this.props.children}
        </div>
    );
};