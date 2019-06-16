import { all } from 'redux-saga/effects';
import { booksSagas } from './books';
import { customersSagas } from './customers';
import { ordersSagas } from './orders';
import { notificationsSagas } from './notifications';
import { timeframeListSagas } from './listsToSelect';
import { authSagas } from './auth';

export default function* rootSaga() {
    yield all([
      ...authSagas,
      ...booksSagas,
      ...customersSagas,
      ...ordersSagas,
      ...notificationsSagas,
      ...timeframeListSagas   
    ])
}