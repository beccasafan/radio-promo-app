import { RouteData, UrlParams } from "./logic/routes/route-models";

declare var gtag: any;

const id = "UA-102964622-1";

function parseUrl(): RouteData {
    const payload: UrlParams & {[key: string]: string} = {};
    new URLSearchParams(location.search.replace("#/", "")).forEach((v,k) => payload[k] = v);

    const booleanRegex = new RegExp("true", "i");
    const routeInfo: RouteData = {
        //...state,
        ...payload,
        country: payload.country,
        twitter: !!payload.twitter  && booleanRegex.test(payload.twitter!),
        instagram: !!payload.instagram && booleanRegex.test(payload.instagram!),
        facebook: !!payload.facebook && booleanRegex.test(payload.facebook!),
        email: !!payload.email && booleanRegex.test(payload.email!),
        text: !!payload.text && booleanRegex.test(payload.text!),
        phone: !!payload.phone && booleanRegex.test(payload.phone!),
        whatsapp: !!payload.whatsapp && booleanRegex.test(payload.whatsapp!),
        page: Number(payload.page),
        pageSize: Number(payload.pageSize),
        section: payload.section,
        stations: payload.stations ? payload.stations.split(",").map(s => s.trim()) : undefined,
        userGuide: !!payload.userGuide && booleanRegex.test(payload.userGuide)
    };

    return routeInfo;
}

export function pageview(params: any) {
    const defaultValue = "-";
    const routes = parseUrl();

    const dimensions = {
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
        stations: routes.stations ? "Y" : defaultValue,
        page: routes.page || defaultValue
    };

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
        ...params,
        ...dimensions
    });
    console.log("pageview", params, dimensions);
}

export function event(action: any, category: any, label: any, value: any, params: any) {
    gtag('event', action, {
        'event_category': category,
        'event_label': label,
        'value': value,
        'custom_map': params
      });
    console.log("event");
}