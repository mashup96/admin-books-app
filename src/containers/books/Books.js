import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import classnames from "classnames";
import SearchByParam from '../../components/UI/searchByParam/SearchByParam';
import CustomPagination from '../../components/UI/customPagination/CustomPagination';
import BookBoxes from '../../components/books/bookBoxes/BookBoxes';
import {
  getAllBooks,
  deleteBook,
  getBooksFromNumberPage,
  getBooksFromSearch
} from '../../store/actions';
import { Card, CardBody } from 'reactstrap';
import Loading from '../../components/UI/loading/Loading';
import CustomFeedback from '../../components/UI/customFeedback/CustomFeedback';

class Books extends React.Component {

  state = {
    typeOrder: null,
    isOpenModal: false,
    bookSelected: null,
  };

  componentDidMount() {
    const { uid } = this.props;
    this.props.getAllBooks({ uid });
  }

  updateSearchText = (event) => {
    this.props.getBooksFromSearch({ searchText: event });
  }

  updateCurrentPage = (event) => {
    this.props.getBooksFromNumberPage({ currentPage: event });
  }

  toggleDelete = (event, book) => {
    this.setState(prevState => ({
      isOpenModal: !prevState.isOpenModal,
      bookSelected: book,
    }));
  }

  deleteBook = () => {
    const { id, fullPath } = this.state.bookSelected;
    this.props.deleteBook({ id, fullPath });
    this.setState({
      isOpenModal: false,
      bookSelected: null,
      currentPage: 0
    });

  }

  render() {
    const { 
      loading,
      books,
      numTotalBooks,
      pageSize,
      currentPage,
      error,
      searchText      
    } = this.props;
    return (
      <React.Fragment>        
        <div className={classnames("", {
                    "d-none": !loading})}>                    
         <Loading/>
        </div>    
        <div className={classnames("", {
                    "d-none": loading})}>
          <Card>
            <CardBody>
              <CustomFeedback type="danger" message={error.message} 
                    additionalText="Error get books"/>
              <h1 className="title">Books</h1>
              <SearchByParam
                numElements={numTotalBooks}
                nameSection="books"
                pathNew="createBook"
                endPlaceholder="Title"
                searchText={searchText}
                updateSearchText={this.updateSearchText} />
              <BookBoxes
                books={books}
                isOpenModal={this.state.isOpenModal}
                toggleDelete={this.toggleDelete}
                deleteBook={this.deleteBook}
              />
              <CustomPagination
                pageSize={pageSize}
                currentPage={currentPage}
                numTotalElements={numTotalBooks}
                updateCurrentPage={this.updateCurrentPage}
              />
            </CardBody>
          </Card>
        </div> 
      </React.Fragment>
    );
  }
}

Books.propTypes = {
  uid: PropTypes.string.isRequired,
  searchText: PropTypes.string,
  books: PropTypes.array.isRequired,
  numTotalBooks: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object
};

const mapStateToProps = state => {
  return {
    uid: state.authData.uid,
    books: state.booksData.currentBooks,
    numTotalBooks: state.booksData.numTotalBooks,
    searchText: state.booksData.searchText,
    currentPage: state.booksData.currentPage,
    pageSize: state.booksData.pageSize,
    loading: state.manageLoading.loading,
    error: state.booksData.error
  };
}

const mapDispatchToProps = {
  getAllBooks: getAllBooks.trigger,
  deleteBook: deleteBook.trigger,
  getBooksFromNumberPage: getBooksFromNumberPage.trigger,
  getBooksFromSearch: getBooksFromSearch.trigger
};

export default connect(mapStateToProps, mapDispatchToProps)(Books);
