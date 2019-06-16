import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

/*
function that checks if the user is authenticated
to access a specific route
*/
const SecuredRoute = ({ component: Component, uid, ...otherProps }) => {
  const { pathname } = otherProps.location;
  return <Route
    {...otherProps}
    render={props =>
      (uid) ? (
        <Component {...props} />
      ) : (
          <Redirect to={{
            pathname: '/login',
            state: { pathname: pathname }
          }} />
        )
    }
  />
};

SecuredRoute.propTypes = {
  uid: PropTypes.string
};

const mapStateToProps = state => ({
  uid: state.authData.uid
});

export default connect(mapStateToProps)(SecuredRoute); 
