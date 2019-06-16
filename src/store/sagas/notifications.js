import { put, takeEvery } from 'redux-saga/effects';
import {
    manageLoading,
    genericActionsNotifications,
    getNotifications
} from '../actions';
import firebase from '../../Firebase.js';
import { NOTIFICATIONS } from '../../shared/constant';
import { getElementsFromDocs } from '../../shared/utility';

/*
function that returns the list of notifications to which
the authenticated user is associated
*/
function* getNotificationsSaga({ payload }) {
    try {
        yield put(manageLoading.request()); 
        const { uid } = payload;              
        const querySnapshot = yield firebase.firestore()
            .collection(NOTIFICATIONS)
            .where("uid", "==", uid)
            .get();        
        const notifications = getElementsFromDocs(querySnapshot);        
        yield put(getNotifications.success({ notifications }));
    } catch (error) {        
        yield put(genericActionsNotifications.failure({ error }));
    } finally {
        yield put(manageLoading.fulfill());
    }
}

export const notificationsSagas = [
    takeEvery(getNotifications.TRIGGER, getNotificationsSaga),
];