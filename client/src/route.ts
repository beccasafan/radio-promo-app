import { store } from 'src/logic/store';
import { RouteData, UrlParams } from './logic/routes/route-models';


export function setRouteData(urlParams: any) {
    const urlData = getUrl(urlParams);
    console.log("setting route", urlData);
    urlData.history!.push(urlData.url);
}

export function getUrl(urlParams: any) {
    const routeInfo: RouteData = { ...store.getState().routes, ...urlParams };
    let url = "?" + Object.keys(routeInfo)
        .map(k => {
            const value = (routeInfo as any)[k];
            return k === "history" || !value ? null : `${k}=${value}`;
        })
        .filter(i => i)
        .join("&")
        ; 

    url = url;
    
    return { history: routeInfo.history, url: url };
}

export function parseUrl() {
    const routeInfo = parseUrlData();
    return { 
        data: routeInfo,
        title: parseUrlTitle(routeInfo),
        location: location.search
    }
}

function parseUrlData(): RouteData {
    const payload: UrlParams & {[key: string]: string} = {};
    new URLSearchParams(location.search).forEach((v,k) => payload[k] = v);

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

function parseUrlTitle(routeInfo: RouteData) {
    let t = [];
    if (routeInfo.artist) {
        t.push(routeInfo.artist);
    }

    if (routeInfo.song) {
        t.push(routeInfo.song);
    }

    if (routeInfo.country) {
        t.push(routeInfo.country);
    }

    if (routeInfo.format) {
        t.push(routeInfo.format);
    }

    if (routeInfo.parentGroup) {
        t.push(routeInfo.parentGroup);
    }

    if (routeInfo.location) {
        t.push(routeInfo.location);
    }

    if (routeInfo.name) {
        t.push(routeInfo.name);
    }

    if (routeInfo.talent) {
        t.push(routeInfo.talent);
    }

    if (routeInfo.twitter) {
        t.push("twitter");
    }

    if (routeInfo.instagram) {
        t.push("instagram");
    }

    if (routeInfo.facebook) {
        t.push("facebook");
    }

    if (routeInfo.email) {
        t.push("email");
    }

    if (routeInfo.text) {
        t.push("text");
    }

    if (routeInfo.phone) {
        t.push("phone");
    }

    if (routeInfo.whatsapp) {
        t.push("whatsapp");
    }

    if (routeInfo.page) {
        t.push(routeInfo.page);
    }

    if (routeInfo.stations) {
        t.push(routeInfo.stations.join("/"));
    }

    if (routeInfo.userGuide) {
        t.push("user-guide");
    }

    let prefix = "";
    switch (true) {
        case routeInfo.userGuide:
            prefix = "User Guide";
            break;
        case routeInfo.station != null:
            prefix = `Station ${routeInfo.station}`;
            break;
        default:
            prefix = `Search ${t.join(" - ")}`
    }

    return prefix + " - Radio Request Database";
}