import { store } from 'src/logic/store';
import { RouteData } from './logic/routes/route-models';


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