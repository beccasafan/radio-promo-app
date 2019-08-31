import React from 'react';
import Field from './field';

interface Props {
    iconOnly?: boolean;
    phone: string;
    log: () => void;
}
const PhoneField = (props: Props) => (
    <Field text={props.phone} iconOnly={props.iconOnly} href={`tel:${props.phone}`} onClick={props.log} newTab icon="fas fa-phone" />
);

export default PhoneField;