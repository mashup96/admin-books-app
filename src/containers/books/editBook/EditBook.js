import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import classnames from "classnames";
import { getBook, editBook } from '../../../store/actions';
import BookFormHOC from '../../../hoc/form/BookFormHOC';
import { Card, CardBody, Row, Col } from 'reactstrap';
import Loading from '../../../components/UI/loading/Loading';
import CustomFeedback from '../../../components/UI/customFeedback/CustomFeedback';

class EditBook extends React.Component {

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getBook(id);
  }

  onSubmit = (formValue) => {
    const { history } = this.props;
    const dataBook = { ...formValue };
    const idBook = dataBook.id;
    const imageBook = dataBook.icon;
    const { fullPath } = this.props.detailBook;
    delete dataBook.id;
    delete dataBook.icon;
    dataBook.uid = this.props.uid;
    this.props.editBook({
      idBook,
      dataBook,
      imageBook,
      fullPath,
      history
    });
  }

  render() {
    const { loading, error } = this.props;
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
                additionalText="Error edit book" />
              <h1 className="title">
                Edit book
              </h1>
              <br />
              <Row>
                <Col xs="12" lg="12">
                  <BookFormHOC
                    book={this.props.detailBook}
                    iconDefault={true}
                    onSubmit={this.onSubmit} />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }

}

EditBook.propTypes = {
  uid: PropTypes.string.isRequired,
  detailBook: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object
};

const mapStateToProps = state => {
  return {
    uid: state.authData.uid,
    detailBook: state.booksData.detailBook,
    loading: state.manageLoading.loading,
    error: state.booksData.error
  };
}

const mapDispatchToProps = {
  getBook: getBook.trigger,
  editBook: editBook.trigger
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBook);