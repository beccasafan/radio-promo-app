declare var google: any;

export interface IApiCall {
    url: string;
    directFunction: string;
    parameters?: any;
}

export function getJSON(request: IApiCall): any {
    return typeof google === "object" ? googleApi(request) : externalApi(request);
}

function googleApi(request: IApiCall) {
    let deferred = $.Deferred();

    let runner = google.script.run
        .withSuccessHandler((e: any) => { 
            console.log("success");
            deferred.resolve(e); 
        })
        .withFailureHandler((e: any) => { 
            console.log("error");
            deferred.reject(e); 
        });

    runner[request.directFunction](...request.parameters);

    return deferred;
}

function externalApi(request: IApiCall) {
    return $.getJSON(`https://script.google.com/macros/s/AKfycbx9SzPtWjCW1vMCR-2qL9e2p9TZM1CY9czDS1m3pA/dev${request.url}${request.url.indexOf("?") >= 0 ? "&" : "?"}callback=?`);
}