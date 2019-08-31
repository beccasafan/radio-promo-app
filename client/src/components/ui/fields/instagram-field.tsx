import React from 'react';
import Field from './field';

interface Props {
    iconOnly?: boolean;
    instagram: string;
    log: () => void;
}
const InstagramField = (props: Props) => {
    const username = props.instagram && props.instagram !== "-" ? props.instagram : undefined;
    return (<Field text={username} iconOnly={props.iconOnly} href={`https://instagram.com/${username}`} onClick={props.log} newTab icon="fab fa-instagram" />);
};

export default InstagramField;