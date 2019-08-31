import React from 'react';
import Field from './field';

interface Props {
    iconOnly?: boolean;
    email: string;
    emailHref: string;
    log: () => void;
}
const EmailField = (props: Props) => (
    <Field text={props.email} iconOnly={props.iconOnly} href={props.emailHref} onClick={props.log} newTab icon="fas fa-envelope" />
);

export default EmailField;