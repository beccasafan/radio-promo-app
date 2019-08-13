import jsonp from 'jsonp';

declare var google: any;

interface IApiCall {
    url: string;
    directFunction: string;
    parameters?: any;
}

export function getJSON<T>(request: IApiCall): Promise<T> {
    return typeof google === 'object' ? googleApi(request) : externalApi(request);
}

function googleApi<T>(request: IApiCall): Promise<T> {
    const promise = new Promise<T>((resolve, reject) => {
        const runner = google.script.run
            .withSuccessHandler((e: any) => resolve(e))
            .withFailureHandler((e: any) => reject(e))
            ;

        runner[request.directFunction](...request.parameters);
    });

    return promise;
}

const apiUrl: string = "https://script.google.com/macros/s/AKfycbzDrMCmVd8Fzxs6YPZz_19CEnONd16rw_X-AwMDCQocJ_W9ixJyDOci4KNWAgAGey38QA/exec"; // exec
export default function externalApi<T>(request: IApiCall): Promise<T> {
    const url = `${apiUrl}${request.url}${request.url.indexOf("?") >= 0 ? "&" : "?"}`;
    const promise = new Promise<T>( (resolve, reject) => {
        jsonp(url, undefined, (error, data) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(data);
            }
        });
    });

    return promise;
}