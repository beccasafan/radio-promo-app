import React from 'react';
import * as Bootstrap from 'src/bootstrap.scss';

interface Props {
    twitter: string;
    instagram: string;
    facebook: string;
}

const NotActiveField = (props: Props) => {
    const active = (username: string) => username && username !== "-";
    const twitter = active(props.twitter);
    const instagram = active(props.instagram);
    const facebook = active(props.facebook);

    const notActive: JSX.Element[] = [];
    if (!twitter) notActive.push(<i key="twitter" className="fab fa-twitter"></i>);
    if (!instagram) notActive.push(<i key="instagram" className="fab fa-instagram"></i>);
    if (!facebook) notActive.push(<i key="facebook" className="fab fa-facebook"></i>);

    return (
        <>
            {notActive.length > 0 && 
                <p className={Bootstrap.cardText}>
                    <i className="fas fa-angle-right"></i><span>Not active on {notActive.map(i => i)}</span></p>
                
            }
        </>
    )
};

export default NotActiveField;