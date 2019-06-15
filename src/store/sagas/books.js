import { put, takeEvery } from 'redux-saga/effects';
import {
    manageLoading,
    genericActionsBooks,
    getAllBooks,
    getInitialBooks,
    getPopularBooks,
    getBook,
    createBook,
    editBook,
    deleteBook
} from '../actions';
import firebase from '../../Firebase.js';
import { BOOKS } from '../../shared/constant';
import { sortByNumber, getElementsFromDocs } from '../../shared/utility';
import { sortAlphabetically } from '../../shared/utility';
import { PATH_BOOKS } from '../../shared/constant';

/*
function that returns all books to which
the authenticated user is associated
*/
function* getAllBooksSaga({ payload }) {
    try {
        yield put(manageLoading.request());
        const { uid } = payload;
        const querySnapshot = yield firebase.firestore()
            .collection(BOOKS)
            .where("uid", "==", uid)
            .get();
        const books = getElementsFromDocs(querySnapshot);
        const booksOrdered = sortAlphabetically(books, "title", "ASC");
        yield put(getInitialBooks.success({ books: booksOrdered }));
    } catch (error) {
        yield put(genericActionsBooks.failure({ error }));
    } finally {
        yield put(manageLoading.fulfill());
    }
}

/*
function that returns popular books to which
the authenticated user is associated
*/
function* getPopularBooksSaga({ payload }) {
    try {
        yield put(manageLoading.request());
        const { uid } = payload;
        const querySnapshot = yield firebase.firestore()
            .collection(BOOKS)
            .where("uid", "==", uid)
            .get();
        const books = getElementsFromDocs(querySnapshot);
        const orderedBooks = sortByNumber(books, "numSold", "DESC");
        let popularBooks = [];
        for (let i = 0; i < 3; i++) {
            popularBooks[i] = { ...orderedBooks[i] };
        }
        yield put(getPopularBooks.success({ books: popularBooks }));
    } catch (error) {
        yield put(genericActionsBooks.failure({ error }));
    } finally {
        yield put(manageLoading.fulfill());
    }
}

/*
function that returns the corresponding book
to the id passed as a parameter
*/
function* getBookSaga({ payload: idBook }) {
    try {
        yield put(manageLoading.request());
        const doc = yield firebase.firestore().collection(BOOKS)
            .doc(idBook).get();
        const book = { ...doc.data(), id: doc.id };
        yield put(getBook.success({ book }));
    } catch (error) {
        yield put(genericActionsBooks.failure({ error }));
    } finally {
        yield put(manageLoading.fulfill());
    }
}

/*
function that saves book selected and 
attached file in the firebase DB
*/
function* createBookSaga({ payload }) {
    try {
        yield put(manageLoading.request());
        const { dataBook, imageBook, history } = payload;
        const saveResponse = yield firebase.firestore()
            .collection(BOOKS)
            .add(dataBook);
        if (imageBook instanceof File) {
            const uniqueFilename = `${imageBook.name}_${new Date().getTime()}`;
            const newFullPath = `${BOOKS}/${uniqueFilename}`;
            const metadata = { customMetadata: { uid: dataBook.uid } };
            const uploadResponse = yield firebase.storage()
                .ref(newFullPath)
                .put(imageBook, metadata);
            const { snapshot } = uploadResponse.task;
            const pathReference = firebase.storage().ref(snapshot.ref.fullPath);
            const downloadUrl = yield pathReference.getDownloadURL();
            yield firebase.firestore().collection(BOOKS)
                .doc(saveResponse.id)
                .update({
                    downloadPath: downloadUrl,
                    fullPath: newFullPath
                });
        }
        history.push(PATH_BOOKS);
    } catch (error) {
        yield put(genericActionsBooks.failure({ error }));
    }
    finally {
        yield put(manageLoading.fulfill());
    }
}

/*
function that modifies book selected and 
attached file in the firebase DB
*/
function* editBookSaga({ payload }) {
    try {
        yield put(manageLoading.request());
        const { idBook,
            dataBook,
            imageBook,
            fullPath,
            history } = payload;
        yield firebase.firestore().collection(BOOKS)
            .doc(idBook)
            .update(dataBook);
        if (imageBook instanceof File) {
            if (dataBook.downloadPath) {
                yield firebase.storage().ref(fullPath).delete();
            }
            const uniqueFilename = imageBook.name + "_" + new Date().getTime();
            const newFullPath = `${BOOKS}/${uniqueFilename}`;
            const metadata = { customMetadata: { uid: dataBook.uid } };
            const uploadResponse = yield firebase.storage()
                .ref(newFullPath)
                .put(imageBook, metadata);
            const { snapshot } = uploadResponse.task;
            const pathReference = firebase.storage().ref(snapshot.ref.fullPath);
            const downloadUrl = yield pathReference.getDownloadURL();
            yield firebase.firestore().collection(BOOKS)
                .doc(idBook)
                .update({
                    downloadPath: downloadUrl,
                    fullPath: newFullPath
                });
        }
        history.push(PATH_BOOKS);
    } catch (error) {
        yield put(genericActionsBooks.failure({ error }));
    } finally {
        yield put(manageLoading.fulfill());
    }
}

/*
function that removes book selected and 
attached file the firebase DB 
*/
function* deleteBookSaga({ payload }) {
    try {
        yield put(manageLoading.request());
        const { id, fullPath } = payload;
        yield firebase.firestore().collection(BOOKS)
            .doc(id)
            .delete();
        if (fullPath) {
            yield firebase.storage().ref(fullPath).delete();
        }
        yield put(deleteBook.success({ id }));
    } catch (error) {
        yield put(genericActionsBooks.failure({ error }));
    } finally {
        yield put(manageLoading.fulfill());
    }
}

export const booksSagas = [
    takeEvery(getAllBooks.TRIGGER, getAllBooksSaga),
    takeEvery(getPopularBooks.TRIGGER, getPopularBooksSaga),
    takeEvery(getBook.TRIGGER, getBookSaga),
    takeEvery(createBook.TRIGGER, createBookSaga),
    takeEvery(editBook.TRIGGER, editBookSaga),
    takeEvery(deleteBook.TRIGGER, deleteBookSaga),
];
