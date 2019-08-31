import { RouteData, UrlParams } from "./logic/routes/route-models";
import { parseUrl } from "./route";

declare var gtag: any;

const id = "UA-102964622-1";

function getDimensions(routes: RouteData) {
    const defaultValue = "-";
    
    return {
        artist: routes.artist || defaultValue,
        song: routes.song || defaultValue,
        country: routes.country || defaultValue,
        location: routes.location || defaultValue,
        parentNetwork: routes.parentGroup || defaultValue,
        format: routes.format || defaultValue,
        name: routes.name || defaultValue,
        talent: routes.talent || defaultValue,
        twitter: routes.twitter ? "Y" : defaultValue,
        instagram: routes.instagram ? "Y" : defaultValue,
        facebook: routes.facebook ? "Y" : defaultValue,
        email: routes.email ? "Y" : defaultValue,
        text: routes.text ? "Y" : defaultValue,
        phone: routes.phone ? "Y" : defaultValue,
        whatsapp: routes.whatsapp ? "Y" : defaultValue,
        stations: (routes.stations || [defaultValue]).join(","),
        page: routes.page || defaultValue
    };
}

export function pageview() {
    const routeData = parseUrl();
    const routes = routeData.data;
    const dimensions = getDimensions(routes);

    gtag('config', id, {
        "custom_map": {
            "dimension1": "artist",
            "dimension2": "song",
            "dimension3": "country",
            "dimension4": "location",
            "dimension5": "parentNetwork",
            "dimension6": "format",
            "dimension7": "name",
            "dimension8": "talent",
            "dimension9": "twitter",
            "dimension10": "instagram",
            "dimension11": "facebook",
            "dimension12": "email",
            "dimension13": "text",
            "dimension14": "phone",
            "dimension15": "whatsapp",
            "dimension16": "stations",
            "dimension17": "page"
            
        },
        ...dimensions,
        'page_title': routeData.title,
        'page_path': routeData.location
    });
    
    // console.log("pageview", routeData, dimensions);
}

export function event(action: any, category: any, label?: any) {
    const routeData = parseUrl();
    const routes = routeData.data;
    const dimensions = getDimensions(routes);
    
    gtag('event', action, {
        'event_category': category,
        'event_label': label,
        ...dimensions
    });
    
    // console.log("event", action, category, label, dimensions);
}