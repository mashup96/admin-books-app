import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../../store/actions';
import { AppSidebarToggler } from '@coreui/react';
import './HeaderNav.scss';

class HeaderNav extends React.Component {

    logoutEvent = (event) => {
        event.preventDefault();
        const { history } = this.props;
        this.props.logout({ history });
    }

    render() {
        return (
            <React.Fragment>
                <AppSidebarToggler className="d-lg-none" display="md" mobile />
                <div className="css-logo float-sm-left">
                    <strong>
                        Publisher Dashboard
                </strong>
                </div>
                <AppSidebarToggler className="d-md-down-none" display="lg" />
                <Nav className="ml-auto" navbar>
                    <NavItem className="d-xs-down-none">
                        <NavLink to="" className="nav-link css-logout"
                            onClick={(event) => {
                                this.logoutEvent(event)
                            }}>
                            <i className="fa fa-lock"></i>
                            &nbsp;
                            Logout
                 </NavLink>
                    </NavItem>
                </Nav>
            </React.Fragment>
        )
    }
};

HeaderNav.propTypes = {    
    error: PropTypes.object,
    logout: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {        
        error: state.authData.error
    };
}

const mapDispatchToProps = {
    logout: logout.trigger
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderNav));