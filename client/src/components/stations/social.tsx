import React from 'react';
import WebsiteField from '../ui/fields/website-field';
import TwitterField from '../ui/fields/twitter-field';
import InstagramField from '../ui/fields/instagram-field';
import FacebookField from '../ui/fields/facebook-field';
import EmailField from '../ui/fields/email-field';
import TextField from '../ui/fields/text-field';
import PhoneField from '../ui/fields/phone-field';
import WhatsappField from '../ui/fields/whatsapp-field';
import { StationSummary } from 'radio-app-2-shared';

interface Props {
    iconOnly: boolean;
    station: StationSummary;
    logWebsite: () => void;
    logTwitter: () => void;
    logInstagram: () => void;
    logFacebook: () => void;
    logEmail: () => void;
    logText: () => void;
    logPhone: () => void;
    logWhatsapp: () => void;
    setTweetUrl: () => void;
    emailHref: string;
}
const Social = (props: Props) => (
    <>
        <WebsiteField iconOnly={props.iconOnly} website={props.station.website} log={props.logWebsite} />
        <TwitterField iconOnly={props.iconOnly} twitter={props.station.twitter} setTweetUrl={props.setTweetUrl} logTweet={props.logTwitter} />
        <InstagramField iconOnly={props.iconOnly} instagram={props.station.instagram} log={props.logInstagram} />
        <FacebookField iconOnly={props.iconOnly} facebook={props.station.facebook} log={props.logFacebook} />
        <EmailField iconOnly={props.iconOnly} email={props.station.email} emailHref={props.emailHref} log={props.logEmail} />
        <TextField iconOnly={props.iconOnly} text={props.station.text} log={props.logText} />
        <PhoneField iconOnly={props.iconOnly} phone={props.station.phone} log={props.logPhone} />
        <WhatsappField iconOnly={props.iconOnly} whatsapp={props.station.whatsapp} log={props.logWhatsapp} />
    </>
);

export default Social;