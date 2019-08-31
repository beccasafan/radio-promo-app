import React from 'react';
import Field from './field';

interface Props {
    iconOnly?: boolean;
    website: string;
    log: () => void;
}
const WebsiteField = (props: Props) => (
    <Field text={props.website} iconOnly={props.iconOnly} href={props.website} onClick={props.log} newTab icon="fas fa-link" />
);

export default WebsiteField;