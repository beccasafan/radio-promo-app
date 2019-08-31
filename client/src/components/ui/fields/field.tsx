import React from 'react';
import * as Bootstrap from 'src/bootstrap.scss';
import { StationNote } from 'radio-app-2-shared';

interface Props {
    text?: string | StationNote,
    icon: string,
    iconOnly?: boolean;
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    onMouseDown?: () => void;
    onMouseEnter?: () => void;
    href: string;
    newTab: boolean;
    linkClassName?: string;
}

const Field = (props: Props) => (
    <>
        {props.iconOnly && <div className={Bootstrap.col}>{props.text && <a href={props.href} className={props.linkClassName} onMouseDown={props.onMouseDown} onMouseEnter={props.onMouseEnter} onClick={props.onClick} target={props.newTab ? "_blank" : undefined}><i className={props.icon}></i></a>}</div>}
        {!props.iconOnly && props.text && <p className={Bootstrap.cardText}><a href={props.href} className={props.linkClassName} onMouseDown={props.onMouseDown} onMouseEnter={props.onMouseEnter} onClick={props.onClick} target={props.newTab ? "_blank" : undefined}><i className={props.icon}></i> {props.text}</a></p>}
    </>
);

export default Field;