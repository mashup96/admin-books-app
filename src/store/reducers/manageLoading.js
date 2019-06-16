import { manageLoading } from '../actions';
import { createReducer } from '../../shared/utility';
import {
    manageLoadingStart,
    manageLoadingStop
} from '../reducers/facade/manageLoading';

const initialState = {
    loading: false,
    numRequest: 0
};

const manageLoadingReducer = createReducer(initialState, {
    [manageLoading.REQUEST]: manageLoadingStart,
    [manageLoading.FULFILL]: manageLoadingStop
});

export default manageLoadingReducer;
