import React from 'react';
import Field from './field';

interface Props {
    iconOnly?: boolean;
    text: string;
    log: () => void;
}
const TextField = (props: Props) => (
    <Field text={props.text} iconOnly={props.iconOnly} href={`sms:${props.text}`} onClick={props.log} newTab icon="fas fa-comment" />
);

export default TextField;