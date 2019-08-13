import actionCreatorFactory from 'typescript-fsa';
import { asyncFactory } from 'typescript-fsa-redux-thunk';

export function getFactories<T>(prefix: string) {
    const sync = actionCreatorFactory(prefix);
    return {
        sync: sync,
        async: asyncFactory<T>(sync)
    }
};