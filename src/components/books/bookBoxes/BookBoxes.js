import React from 'react';
import PropTypes from "prop-types";
import BoxDetail from '../../UI/panels/boxDetail/BoxDetail';
import ConfirmModal from '../../UI/modals/confirmModal/ConfirmModal';
import { Row, Col } from 'reactstrap';
import './BookBoxes.scss';

const BookBoxes = (props) => {
  return (
    <React.Fragment>
      <Row>
        {props.books.map((currentBook, index) => (
          <Col xs="12" sm="6" xl="4" key={index} >
            <article className="col">
              <BoxDetail
                book={{ ...currentBook }}
                toggleDelete={props.toggleDelete} />
            </article>
          </Col>
        ))}
      </Row>
      <ConfirmModal
        title="Book removal confirmation"
        isOpenModal={props.isOpenModal}
        toggleDelete={props.toggleDelete}
        confirm={props.deleteBook}>
        Are you sure you want to remove selected book ?
      </ConfirmModal>
    </React.Fragment>
  );
};

BookBoxes.propTypes = {
  books: PropTypes.array.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  toggleDelete: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired
};

export default BookBoxes;