import React from 'react';

interface Props {
    time: number;
}

const TalentTime = (props: Props) => {

    const hours = props.time / 100;
    const minutes = props.time % 100;

    const timestamp = new Date();
    timestamp.setHours(hours);
    timestamp.setMinutes(minutes);
    timestamp.setSeconds(0);
    timestamp.setMilliseconds(0);

    return (
        <span>{timestamp.toLocaleTimeString(undefined, { hour: "numeric", minute: "numeric" })}</span>
    );
}

export default TalentTime;