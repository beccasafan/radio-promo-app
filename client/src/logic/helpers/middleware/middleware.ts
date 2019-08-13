import { Middleware, MiddlewareAPI, Dispatch, Action } from "redux";
import { AppState } from "src/logic/store";

function isApi<M>(m: any): m is MiddlewareAPI<Dispatch, AppState> {
    return true;
}

export type MiddlewareFunction = (api: MiddlewareAPI<Dispatch, AppState>, next: (action: Action) => Action, action: Action) => Action;

export default function handleAction(f: MiddlewareFunction): Middleware<Dispatch, AppState> {
    return (api: MiddlewareAPI<Dispatch, AppState>) => next => (action: Action) => {
        if (isApi(api)) {
            return f(api, next, action);
        } else {
            return next(action);
        }
    };
}