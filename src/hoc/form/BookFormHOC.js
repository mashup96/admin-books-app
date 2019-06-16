import { withFormik } from 'formik';
import PropTypes from "prop-types";
import BookValidation from '../../components/books/bookForm/BookValidation';
import BookForm from '../../components/books/bookForm/BookForm';

const mapPropsToValues = props => {
  const { book } = props;
  return {
    id: book.id || null,
    title: book.title || '',
    price: book.price || '',
    pageCount: book.pageCount || '',
    isbn: book.isbn || '',
    downloadPath: book.downloadPath || '',
    icon: {},
  }
}

const configForm = {
  enableReinitialize: true,
  mapPropsToValues,
  validationSchema: BookValidation,
  handleSubmit: (values, { props, setErrors }) => {
    props.onSubmit(values);
  }
}

BookForm.propTypes = {
  book: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default withFormik(configForm)(BookForm);