import React from 'react';
import Field from './field';

interface Props {
    iconOnly?: boolean;
    twitter: string;
    setTweetUrl: () => void;
    logTweet: () => void;
}
const TwitterField = (props: Props) => {
    const username = props.twitter && props.twitter !== "-" ? props.twitter : undefined;
    return (<Field text={username} iconOnly={props.iconOnly} href="#" linkClassName="twitter" onMouseDown={props.setTweetUrl} onMouseEnter={props.setTweetUrl} onClick={props.logTweet} newTab icon="fab fa-twitter" />);
};

export default TwitterField;