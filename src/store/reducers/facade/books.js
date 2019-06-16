import {
    updateObject,
    getPartialList,
    containsValue
} from '../../../shared/utility';


// function that returns the initial list of books
export function getInitialBooksFacade(state, action) {
    const { books } = action.payload;
    const { pageSize } = state;
    const partialList = getPartialList(0, pageSize, books);
    return updateObject(state, {
        numTotalBooks: books.length,
        currentPage: 0,
        searchText: "",
        allBooks: books,
        searchBooks: [],
        currentBooks: partialList
    });
}

// function that returns the 3 books with the most sales
export function getPopularBooksFacade(state, action) {
    const { books } = action.payload;
    return updateObject(state, { currentBooks: books });
}

export function getBookFacade(state, action) {
    const { book } = action.payload;
    return updateObject(state, { detailBook: book });
}


// function that returns 10 books based on the selected page number
export function getBooksFromNumPageFacade(state, action) {
    const { currentPage } = action.payload;
    const { allBooks, pageSize, searchBooks } = state;
    let booksForPaging = [];
    if (searchBooks.length > 0 &&
        searchBooks.length !== allBooks.length) {
        booksForPaging = [...searchBooks];
    } else {
        booksForPaging = [...allBooks];
    }
    const partialList = getPartialList(currentPage, pageSize, booksForPaging);
    return updateObject(state, {
        numTotalBooks: booksForPaging.length,
        currentPage,
        currentBooks: partialList
    });
}

/*
function that returns a list of books based on 
the parameter entered in the search 
*/
export function getBooksFromSearchFacade(state, action) {
    const { searchText } = action.payload;
    const { allBooks, pageSize } = state;
    const searchBooks = allBooks.filter(book =>
        containsValue(book.title, searchText));
    const partialList = getPartialList(0, pageSize, searchBooks);
    return updateObject(state, {
        numTotalBooks: searchBooks.length,
        currentPage: 0,
        searchBooks,
        searchText,
        currentBooks: partialList,
    });
}

/*
function that removes the selected book considering the total list of 
books and the list of books searched to derive the current list of books
*/
export function deleteBookFacade(state, action) {
    const { id } = action.payload;
    const { allBooks, pageSize, searchBooks } = state;
    let booksForPaging = [];
    let currentSearchBooks = [...searchBooks];
    let searchText = state.searchText;
    const allBooksFilter = allBooks.filter((book) => book.id !== id);
    if (searchBooks.length > 0 &&
        searchBooks.length !== allBooks.length) {
        booksForPaging = searchBooks.filter((book) => book.id !== id);
        if (booksForPaging.length === 0) {
            booksForPaging = [...allBooksFilter];
            searchText = "";
            currentSearchBooks = [];
        }
    } else {
        booksForPaging = [...allBooksFilter];
        searchText = "";
    }
    let partialList = getPartialList(0, pageSize, booksForPaging);
    let currentPage = 0;
    if (booksForPaging.length) {
        currentPage = state.currentPage;
        partialList = getPartialList(currentPage, pageSize, booksForPaging);
    }
    return updateObject(state, {
        numTotalBooks: booksForPaging.length,
        currentPage,
        searchText,
        searchBooks: currentSearchBooks,
        allBooks: allBooksFilter,
        currentBooks: partialList
    });
}

export function errorBooksFacade(state, action) {
    const { error } = action.payload;
    return updateObject(state, { error });
}
