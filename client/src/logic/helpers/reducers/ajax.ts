import { ReducerBuilder } from "typescript-fsa-reducers";
import { Action, Reducer } from "redux";
import { IAJAXState } from "../types";
import NormalizedEntity, { INormalizableEntity } from "../normalized-entity";

const actionRegex = new RegExp(`^(.*?)\/.*_(STARTED|DONE|FAILED)$`);
const handleAjaxReducer = <T extends INormalizableEntity, S extends IAJAXState<T>>(slice: string, reducer: ReducerBuilder<S>) : Reducer<S> => (
    (stateSlice: S | undefined, action: Action): S => {
        if (stateSlice === undefined) {
            return reducer(stateSlice, action);
        }
        const actionMatch = actionRegex.exec(action.type);

        if (actionMatch !== null && actionMatch.length == 3) {
            const [, actionSlice, actionAsync] = actionMatch;
            if (actionSlice === slice) {
                let modifiedState: S = {...stateSlice, isLoading: actionAsync == "STARTED" && action.type.indexOf("-stations-") >= 0, hasError: actionAsync == "FAILED"};

                if (actionAsync === "STARTED" && action.type.indexOf("-stations-") >= 0) {
                    modifiedState.items = new NormalizedEntity<T>();
                }
                
                return reducer(modifiedState, action);
            }
        }

        return reducer(stateSlice, action);
    }
);

export default handleAjaxReducer;