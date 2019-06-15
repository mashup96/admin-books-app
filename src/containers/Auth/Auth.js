import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from "classnames";
import { Redirect } from 'react-router-dom';
import { login,resetErrorAuth } from '../../store/actions';
import LoginFormHOC from '../../hoc/form/LoginFormHOC';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import Loading from '../../components/UI/loading/Loading';
import CustomFeedback from '../../components/UI/customFeedback/CustomFeedback';

class Auth extends Component {

    onSubmit = (formValue) => {
        const { history } = this.props;
        this.props.resetErrorAuth();
        this.props.login({ formValue, history });
    }

    render() {
        if (this.props.location.state) {
            const { pathname } = this.props.location.state;
            if (this.props.uid) {
                return <Redirect to={pathname} />;
            }
        }
        const { loading, error } = this.props;
        return (
            <React.Fragment>
               <div className={classnames("", {
                    "d-none": !loading})}>                    
                <Loading/>
              </div>            
              <div className={classnames("app flex-row align-items-center", {
                    "d-none": loading
               })}>
                <Container>
                        <Row className="justify-content-center">
                            <Col xs={12} sm={10} md={8} lg={6}>
                                <Card>
                                    <CardBody >
                                        <CustomFeedback type="danger" message={error.message} />
                                        <LoginFormHOC onSubmit={this.onSubmit} />
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                  </Container>
              </div>
            </React.Fragment>
        );
    }
}

Auth.propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    uid: PropTypes.string
};

const mapStateToProps = state => {
    return {
        loading: state.manageLoading.loading,
        error: state.authData.error,
        uid: state.authData.uid
    };
}

const mapDispatchToProps = {
    login: login.trigger,
    resetErrorAuth: resetErrorAuth.trigger
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

