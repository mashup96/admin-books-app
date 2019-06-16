import { withFormik } from 'formik';
import PropTypes from "prop-types";
import LoginValidation from '../../components/login/LoginValidation';
import LoginForm from '../../components/login/LoginForm';

const mapPropsToValues = props => {
  return {
    email: '',
    password: '',
  }
}

const configForm = {
  mapPropsToValues: mapPropsToValues,
  validationSchema: LoginValidation,
  handleSubmit: (values, { props, setStatus }) => {
    props.onSubmit(values);
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default withFormik(configForm)(LoginForm);