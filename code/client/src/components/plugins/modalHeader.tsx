import * as React from 'react';

export interface ModalHeaderProps {

}

export const ModalHeader: React.FunctionComponent<ModalHeaderProps> = (props: ModalHeaderProps) => {
    return (
        <div className="modal-header">
            {this.props.children}
        </div>
    );
};