import React, { MouseEvent } from 'react';
import Field from './field';
import { StationNote } from 'radio-app-2-shared';
import NoteContent from '../note-content';
import NotActiveField from './not-active';

interface Props {
    iconOnly?: boolean;
    note: StationNote | undefined;
    oldNote: string;
    selectedArtist: string | undefined;
    url?: string;
    onSelect?: (e: MouseEvent<HTMLAnchorElement>) => void;
}
const NoteField = (props: Props) => {
    const hasNote = (props.note && (props.note.twitterClout ||
        props.note.instagramClout ||
        props.note.preferredContact ||
        props.note.stationCred ||
        props.note.programmingTips ||
        props.note.app ||
        props.note.general ||
        (props.selectedArtist === "harry" && props.note.harry) ||
        (props.selectedArtist === "liam" && props.note.liam) ||
        (props.selectedArtist === "louis" && props.note.louis) ||
        (props.selectedArtist === "niall" && props.note.niall) ||
        (props.selectedArtist === "zayn" && props.note.zayn))) ||
        props.oldNote
        ? "x"
        : undefined;

    return (
        <>
            {props.iconOnly && <Field text={hasNote} iconOnly href={props.url!} onClick={props.onSelect!} newTab={false} icon="fas fa-sticky-note" />}
            {!props.iconOnly && !props.note && props.oldNote && <NoteContent text={props.oldNote} />}
            {!props.iconOnly && props.note && <>
                {props.note.twitterClout && <NoteContent text={`${props.note.twitterClout} followers on Twitter`} />}
                {props.note.instagramClout && <NoteContent text={`${props.note.instagramClout} followers on Instagram`} />}
                {props.note.preferredContact && <NoteContent text={`Preferred Contact is ${props.note.preferredContact}`} />}
                {props.note.stationCred && <NoteContent text={props.note.stationCred} />}
                {props.note.programmingTips && <NoteContent text={props.note.programmingTips} />}
                {props.note.app && <NoteContent text="Station has an app" />}
                {props.note.general && <NoteContent text={props.note.general} />}
                {props.selectedArtist === "harry" && props.note.harry && <NoteContent text={props.note.harry} />}
                {props.selectedArtist === "liam" && props.note.liam && <NoteContent text={props.note.liam} />}
                {props.selectedArtist === "louis" && props.note.louis && <NoteContent text={props.note.louis} />}
                {props.selectedArtist === "niall" && props.note.niall && <NoteContent text={props.note.niall} />}
                {props.selectedArtist === "zayn" && props.note.zayn && <NoteContent text={props.note.zayn} />}
            </>}
        </>
    );
};

export default NoteField;