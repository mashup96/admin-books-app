import { updateObject } from '../../../shared/utility';

export function getTimeframeListFacade(state, action) {
    const { timeframeList } = action.payload;
    return updateObject(state, { timeframeList });
}

export function errorTimeframeListFacade(state, action) {
    const { error } = action.payload;
    return updateObject(state, { errorTimeframeList: error });
}