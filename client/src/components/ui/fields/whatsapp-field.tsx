import React from 'react';
import Field from './field';

interface Props {
    iconOnly?: boolean;
    whatsapp: string;
    log: () => void;
}
const WhatsappField = (props: Props) => (
    <Field text={props.whatsapp} iconOnly={props.iconOnly} href={`whatsapp://${props.whatsapp}`} onClick={props.log} newTab icon="fab fa-whatsapp" />
);

export default WhatsappField;