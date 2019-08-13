import { Middleware, Dispatch } from "redux";
import { AppState } from "src/logic/store";
import handleAction from "./middleware";

// Log actions and state.thing before and after action dispatching
export default function loggingMiddleware(): Middleware<Dispatch, AppState> {
    return handleAction((api, next, action) => {
        // console.log(" BEGIN ACTION DISPATCHING:");
        // console.log("----- Action", action);
        const oldState = api.getState();

        const retVal = next(action);

        // console.log("----- Old state", oldState);
        // console.log("----- New state", api.getState());
        // console.log("END ACTION DISPATCHING");

        return retVal;
    });
}