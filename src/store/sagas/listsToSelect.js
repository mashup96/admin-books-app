import { put, takeEvery } from 'redux-saga/effects';
import {
    manageLoading,
    getTimeframeList
} from '../actions';
import { getCollection } from './firebaseAPI';
import { TIMEFRAME } from '../../shared/constant';
import { getElementsFromDocs } from '../../shared/utility';

/*
function that returns the list of timeframe to which
the authenticated user is associated
*/
function* getTimeframeListSaga({ payload }) {
    try {
        yield put(manageLoading.request());
        const { uid } = payload;
        const querySnapshot = yield getCollection(TIMEFRAME,uid);
        const timeframeList = getElementsFromDocs(querySnapshot);
        yield put(getTimeframeList.success({ timeframeList }));
    } catch (error) {
        yield put(getTimeframeList.failure({ error }));
    } finally {
        yield put(manageLoading.fulfill());
    }
}

export const timeframeListSagas = [
    takeEvery(getTimeframeList.TRIGGER, getTimeframeListSaga),
];