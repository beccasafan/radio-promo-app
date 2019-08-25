import { getFactories } from "../helpers/helper";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { RouteData, RouteInfo, UrlParams } from "./route-models";

const initial: RouteData = {
    country: "US",
    page: undefined,
    pageSize: undefined,
    format: undefined,
    artist: undefined,
    song: undefined,
    history: undefined
};

const factory = getFactories<RouteData>("routes");

const booleanRegex = new RegExp("true", "i");

const getFromRoute = factory.sync<RouteInfo>("get-from-route");
const handleGetFromRoute = (state: RouteData, payload: RouteInfo): RouteData => {
    const routeInfo = {
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
        stations: payload.stations ? payload.stations.split(",").map(s => s.trim()) : undefined
    };

    let title = Object.keys(routeInfo).map(k => k === "history" ? null : (routeInfo as any)[k] || null).filter(i => i).join(" - ");

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

    document.title = t.join(" - ") + " - Radio Request Database";
    
    return routeInfo;
}

const reducer = reducerWithInitialState(initial)
    .case(getFromRoute, handleGetFromRoute)
    ;

const actions = { getFromRoute };
export { actions, reducer };