import {
    getTimeframeList
} from '../actions';
import { createReducer } from '../../shared/utility';
import {
    getTimeframeListFacade,
    errorTimeframeListFacade
} from '../reducers/facade/listsToSelect';


const initialState = {
    timeframeList: [],
    errorTimeframeList: {}
};

const listsToSelectReducer = createReducer(initialState, {
    [getTimeframeList.SUCCESS]: getTimeframeListFacade,
    [getTimeframeList.FAILURE]: errorTimeframeListFacade
});

export default listsToSelectReducer;