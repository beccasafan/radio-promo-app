import React from 'react';
import Field from './field';

interface Props {
    iconOnly?: boolean;
    facebook: string;
    log: () => void;
}
const FacebookField = (props: Props) => {
    const username = props.facebook && props.facebook !== "-" ? props.facebook : undefined;
    return (<Field text={username} iconOnly={props.iconOnly} href={`https://facebook.com/${username}`} onClick={props.log} newTab icon="fab fa-facebook" />);
};

export default FacebookField;