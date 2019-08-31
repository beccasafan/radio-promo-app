import React from 'react';
import { StationSummary } from 'radio-app-2-shared';
import NoteField from '../ui/fields/note-field';
import NotActiveField from '../ui/fields/not-active';
import ParentNetworkField from '../ui/fields/parent-network-field';

interface Props {
    mode: "summary" | "detail";
    station: StationSummary;
    selectedArtist: string | undefined;
}

const Display = (props: Props) => {
    const iconOnly = props.mode === "summary";
    return (
        <>
            {props.mode === "detail" && <ParentNetworkField parentGroup={props.station.parentGroup} />}
            <NotActiveField twitter={props.station.twitter} instagram={props.station.instagram} facebook={props.station.facebook} />
            <NoteField iconOnly={false} note={props.station.note} oldNote={props.station.oldNote} selectedArtist={props.selectedArtist} />
            
        </>
    );
};

export default Display;