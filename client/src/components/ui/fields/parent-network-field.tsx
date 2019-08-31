import React from 'react';
import Field from './field';
import NoteContent from '../note-content';

interface Props {
    parentGroup: string;
}
const ParentNetworkField = (props: Props) => (
    <>{props.parentGroup && <NoteContent text={props.parentGroup} />}</>
);

export default ParentNetworkField;