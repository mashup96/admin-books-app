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
import { 
    getCollection, 
    getDocById,
    addDoc,
    updateDoc,
    deleteDoc,
    saveFileOnStorage,
    deleteFileOnStorage,
    getPathReference
} from './firebaseAPI';
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
        const querySnapshot = yield getCollection(BOOKS,uid);        
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
        const querySnapshot = yield getCollection(BOOKS,uid);
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
        const doc = yield getDocById(BOOKS,idBook);
        const book = { ...doc.data(), id: doc.id };
        yield put(getBook.success({ book }));
    } catch (error) {
        yield put(genericActionsBooks.failure({ error }));
    } finally {
        yield put(manageLoading.fulfill());
    }
}

/*
function that saves book selected with 
associated icon in the firebase DB
*/
function* createBookSaga({ payload }) {
    try {
        yield put(manageLoading.request());
        const { dataBook, imageBook, history } = payload;
        const saveResponse = yield addDoc(BOOKS, dataBook);
        if (imageBook instanceof File) {
            const uniqueFilename = `${imageBook.name}_${new Date().getTime()}`;
            const newFullPath = `${BOOKS}/${uniqueFilename}`;
            const metadata = { customMetadata: { uid: dataBook.uid } };
            const uploadResponse = yield saveFileOnStorage(newFullPath,imageBook,metadata);
            const { snapshot } = uploadResponse.task;
            const pathReference = yield getPathReference(snapshot.ref.fullPath);            
            const downloadUrl = yield pathReference.getDownloadURL();
            const updatedProperties = { downloadPath: downloadUrl,
                                        fullPath: newFullPath
                                      };
            yield updateDoc(BOOKS,saveResponse.id,updatedProperties);
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
function that modifies book selected with 
associated icon in the firebase DB
*/
function* editBookSaga({ payload }) {
    try {
        yield put(manageLoading.request());
        const { idBook,
                dataBook,
                imageBook,
                fullPath,
                history } = payload;
        yield updateDoc(BOOKS,idBook,dataBook);
        if (imageBook instanceof File) {
            if (dataBook.downloadPath) {               
                yield deleteFileOnStorage(fullPath);
            }
            const uniqueFilename = imageBook.name + "_" + new Date().getTime();
            const newFullPath = `${BOOKS}/${uniqueFilename}`;
            const metadata = { customMetadata: { uid: dataBook.uid } };
            const uploadResponse = yield saveFileOnStorage(newFullPath,imageBook,metadata);
            const { snapshot } = uploadResponse.task;
            const pathReference = yield getPathReference(snapshot.ref.fullPath);   
            const downloadUrl = yield pathReference.getDownloadURL();
            const updatedProperties = { downloadPath: downloadUrl,
                                        fullPath: newFullPath
                                      };
            yield updateDoc(BOOKS,idBook,updatedProperties);
        }
        history.push(PATH_BOOKS);
    } catch (error) {
        yield put(genericActionsBooks.failure({ error }));
    } finally {
        yield put(manageLoading.fulfill());
    }
}

/*
function that removes book selected with the associated 
icon from the firebase DB 
*/
function* deleteBookSaga({ payload }) {
    try {
        yield put(manageLoading.request());
        const { id, fullPath } = payload;    
        yield deleteDoc(BOOKS,id); 
        if (fullPath) {       
            yield deleteFileOnStorage(fullPath);
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
