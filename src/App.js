import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from './store/actions';
import Dashboard from './containers/dashboard/Dashboard';
import PageNotFound from './components/pageNotFound/PageNotFound';
import Auth from './containers/Auth/Auth'
import SecuredRoute from './hoc/secureRoute/secureRoute';
import './App.scss';

class App extends Component {  

  componentDidMount() {    
   if(localStorage.getItem("token") && 
      localStorage.getItem("token") !== "undefined"){ 
      const uid = localStorage.getItem("uid");        
      this.props.login({uid});
   } 
  }

  render() {
    return (
       <Switch>   
         <Route exact path="/" render={() => (<Redirect to="/dashboard" />)} />
         <Route path="/login" component={Auth}/>                    
         <SecuredRoute                                    
            path="/dashboard" 
            component={Dashboard} />
         <Route path="*" component={PageNotFound} /> 
       </Switch> 
    );
  }
  
}

const mapDispatchToProps = {
  login: login.success
};

export default withRouter(connect(null,mapDispatchToProps)(App));