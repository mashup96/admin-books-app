import {
    genericActionsBooks,
    getBooksFromNumberPage,
    getBooksFromSearch,    
    getInitialBooks,
    getPopularBooks,
    getBook,
    deleteBook
} from '../actions';
import { createReducer } from '../../shared/utility';
import {
    getInitialBooksFacade,
    getPopularBooksFacade,
    getBookFacade,
    errorBooksFacade,
    getBooksFromNumPageFacade,
    getBooksFromSearchFacade,
    deleteBookFacade,
} from '../reducers/facade/books';

const initialState = {
    loading: false,
    currentPage: 0,
    pageSize: 3,
    numTotalBooks: 0,
    allBooks: [],
    searchText: "",
    searchBooks: [],
    currentBooks: [],
    detailBook: {},
    error: {}
};

const booksReducer = createReducer(initialState, {
    [getInitialBooks.SUCCESS]: getInitialBooksFacade,
    [getPopularBooks.SUCCESS]: getPopularBooksFacade,
    [getBooksFromNumberPage.TRIGGER]: getBooksFromNumPageFacade,
    [getBooksFromSearch.TRIGGER]: getBooksFromSearchFacade,
    [getBook.SUCCESS]: getBookFacade,
    [deleteBook.SUCCESS]: deleteBookFacade,
    [genericActionsBooks.FAILURE]: errorBooksFacade
});

export default booksReducer;