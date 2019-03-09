declare var google: any;

export interface IApiCall {
    url: string;
    directFunction: string;
    parameters?: any;
}

export function getJSON(request: IApiCall): any {
    return googleApi(request);
    //return typeof google === "object" ? googleApi(request) : externalApi(request);
}

function googleApi(request: IApiCall) {
    let runner = google.script.run;
    let deferred = $.Deferred();

    runner.withSuccessHandler((e: any) => { deferred.resolve(e); });
    runner.withFailureHandler((e: any) => { deferred.reject(e); });

    runner[request.directFunction].apply(this, Array.prototype.slice.call(arguments, 1));

    return deferred;
}

function externalApi(request: IApiCall) {
    return $.getJSON(`https://script.google.com/macros/s/AKfycbx9SzPtWjCW1vMCR-2qL9e2p9TZM1CY9czDS1m3pA/dev${request.url}${request.url.indexOf("?") >= 0 ? "&" : "?"}callback=?`);
}