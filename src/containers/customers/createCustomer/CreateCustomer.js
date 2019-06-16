import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import classnames from "classnames";
import CustomerFormHOC from '../../../hoc/form/CustomerFormHOC';
import { createCustomer } from '../../../store/actions';
import { Card, CardBody, Row, Col } from 'reactstrap';
import Loading from '../../../components/UI/loading/Loading';
import CustomFeedback from '../../../components/UI/customFeedback/CustomFeedback';

class CreateCustomer extends React.Component {

  onSubmit = (formValue) => {
    const { history } = this.props;
    const dataCustomer = { ...formValue };
    const imageCustomer = dataCustomer.icon;
    delete dataCustomer.id;
    delete dataCustomer.icon;
    dataCustomer.uid = this.props.uid;
    this.props.createCustomer({ dataCustomer, imageCustomer, history });
  }

  render() {
    const { loading, error } = this.props;
    return (
      <React.Fragment> 
        <div className={classnames("", {
          "d-none": !loading})}>    
          <Loading />
        </div>
        <div className={classnames("", {
          "d-none": loading})}>  
          <Card>
            <CardBody>
              <CustomFeedback type="danger" message={error.message} 
                additionalText="Error create customer"/>
              <h1 className="title">
                Create Customer
              </h1>
              <br />
              <Row>
                <Col xs="12" lg="12">
                  <CustomerFormHOC
                    customer={{}}
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

CreateCustomer.propTypes = {
  uid: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object
};


const mapStateToProps = state => {
  return {
    uid: state.authData.uid,
    loading: state.manageLoading.loading,
    error: state.customersData.error
  };
}

const mapDispatchToProps = {
  createCustomer: createCustomer.trigger
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCustomer);