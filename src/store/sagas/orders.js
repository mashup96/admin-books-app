import { put, takeEvery } from 'redux-saga/effects';
import {
    manageLoading,
    genericActionsOrders,
    getAllOrders,
    getInitialOrders,
    getLatestOrders
} from '../actions';
import { getCollection } from './firebaseAPI';
import { ORDERS } from '../../shared/constant';
import { sortByNumber, getElementsFromDocs } from '../../shared/utility';

/*
function that returns all orders to which
the authenticated user is associated
*/
function* getAllOrdersSaga({ payload }) {
    try {
        yield put(manageLoading.request());
        const { uid } = payload;
        const querySnapshot = yield getCollection(ORDERS, uid); 
        const orders = getElementsFromDocs(querySnapshot);
        const sortedOrders = sortByNumber(orders, "id", "DESC");
        yield put(getInitialOrders.success({ orders: sortedOrders }));
    } catch (error) {
        yield put(genericActionsOrders.failure({ error }));
    } finally {
        yield put(manageLoading.fulfill());
    }
}

/*
function that returns latest orders to which
the authenticated user is associated
*/
function* getLatestOrdersSaga({ payload }) {
    try {
        yield put(manageLoading.request());
        const { uid } = payload;
        const querySnapshot = yield getCollection(ORDERS, uid); 
        const orders = getElementsFromDocs(querySnapshot);
        const sortedOrders = sortByNumber(orders, "id", "DESC");
        let latestOrders = [];
        for (let i = 0; i < 3; i++) {
            latestOrders[i] = { ...sortedOrders[i] };
        }
        yield put(getLatestOrders.success({ orders: latestOrders }));
    } catch (error) {
        yield put(genericActionsOrders.failure({ error }));
    } finally {
        yield put(manageLoading.fulfill());
    }
}

export const ordersSagas = [
    takeEvery(getAllOrders.TRIGGER, getAllOrdersSaga),
    takeEvery(getLatestOrders.TRIGGER, getLatestOrdersSaga),
];