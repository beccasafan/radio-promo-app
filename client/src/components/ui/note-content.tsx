import React from 'react';
import Bootstrap from 'src/bootstrap.scss';

interface Props {
    text: string;
}

const NoteContent = (props: Props) => (
    <>
    {props.text.split(';').map((t, i) => t && <p key={i} className={Bootstrap.cardText}><i className="fas fa-angle-right"></i>{t.trim()}</p>)}
    </>
);

export default NoteContent;