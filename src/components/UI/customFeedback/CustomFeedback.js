import React from 'react';
import PropTypes from "prop-types";
import { Alert } from 'reactstrap';

const CustomFeedback = (props) => {
  return (props.message)
    ? <Alert color={props.type}>
      {props.message} {props.additionalText}
    </Alert>
    : null
};

CustomFeedback.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string
};


export default CustomFeedback;