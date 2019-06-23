import { put, takeEvery, delay } from 'redux-saga/effects';
import {
    manageLoading,
    genericActionsAuth,
    login,
    logout,
    checkAuthTimeout
} from '../actions';
import { signIn, signOut } from './firebaseAPI';

/*
after 30 minutes elapsed from login, logout is performed 
as a security measure
*/
function* checkAuthTimeoutSaga({ payload }) {
    const { history } = payload;
    yield delay(30 * 60 * 1000); // 30 minutes
    yield put(logout.trigger({ history }));
}

/* 
If the login is successful, token and 
uid are stored in session 
*/
function* loginSaga({ payload }) {
    try {
        yield put(manageLoading.request());
        const { history, formValue } = payload;
        const { email, password } = formValue;
        const response = yield signIn(email, password);
        const { uid, refreshToken } = response.user;      
        localStorage.setItem("uid", uid);
        localStorage.setItem("token", refreshToken);
        yield put(login.success({ uid }));
        yield put(checkAuthTimeout.trigger({ history }));
        history.replace("/dashboard");
    } catch (error) {
        yield put(genericActionsAuth.failure({ error }));
    } finally {
        yield put(manageLoading.fulfill());
    }
}

// Logout clears contents of the local storage
function* logoutSaga({ payload }) {
    try {
        yield put(manageLoading.request());
        const { history } = payload;
        yield signOut();
        yield delay(500);
        localStorage.clear();
        yield put(logout.success());
        history.replace("/login");
    } catch (error) {
        yield put(genericActionsAuth.failure({ error }));
    } finally {
        yield put(manageLoading.fulfill());
    }
}

export const authSagas = [
    takeEvery(login.TRIGGER, loginSaga),
    takeEvery(logout.TRIGGER, logoutSaga),
    takeEvery(checkAuthTimeout.TRIGGER, checkAuthTimeoutSaga),
];
