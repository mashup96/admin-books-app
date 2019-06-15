import { withFormik } from 'formik';
import PropTypes from "prop-types";
import CustomerValidation from '../../components/customers/customerForm/CustomerValidation';
import CustomerForm from '../../components/customers/customerForm/CustomerForm';

const mapPropsToValues = (props) => {
  const { customer } = props;
  return {
    id: customer.id || null,
    name: customer.name || '',
    email: customer.email || '',
    address: customer.address || '',
    address2: customer.address2 || '',
    city: customer.city || '',
    zipcode: customer.zipcode || '',
    country: customer.country || '',
    downloadPath: customer.downloadPath || '',
    numberOrderedBooks: customer.numberOrderedBooks || '',
    icon: {}
  }
};

const configForm = {
  enableReinitialize: true,
  mapPropsToValues,
  validationSchema: CustomerValidation,
  handleSubmit: (values, { props, setStatus }) => {
    props.onSubmit(values);
  }
}

CustomerForm.propTypes = {
  customer: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default withFormik(configForm)(CustomerForm);