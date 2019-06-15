import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import classnames from "classnames";
import {
  getCustomer,
  resetCustomer,
  editCustomer
} from '../../../store/actions';
import CustomerFormHOC from '../../../hoc/form/CustomerFormHOC';
import { Card, CardBody, Row, Col } from 'reactstrap';
import Loading from '../../../components/UI/loading/Loading';
import CustomFeedback from '../../../components/UI/customFeedback/CustomFeedback';

class EditCustomer extends React.Component {

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getCustomer(id);
  }

  onSubmit = (formValue) => {
    const { history } = this.props;
    const dataCustomer = { ...formValue };
    const idCustomer = dataCustomer.id;
    const imageCustomer = dataCustomer.icon;
    const { fullPath } = this.props.detailCustomer;
    delete dataCustomer.id;
    delete dataCustomer.icon;
    dataCustomer.uid = this.props.uid;
    this.props.editCustomer({
      idCustomer,
      dataCustomer,
      imageCustomer,
      fullPath,
      history
    });
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
                  additionalText="Error edit customer"/>
              <h1 className="title">
                Edit Customer
                </h1>
              <br />
              <Row>
                <Col xs="12" lg="12">
                  <CustomerFormHOC
                    customer={this.props.detailCustomer}
                    iconDefault={true}
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

EditCustomer.propTypes = {
  uid: PropTypes.string.isRequired,
  detailCustomer: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object
};

const mapStateToProps = state => {
  return {
    uid: state.authData.uid,
    detailCustomer: state.customersData.detailCustomer,
    loading: state.manageLoading.loading,
    error: state.customersData.error
  };
}

const mapDispatchToProps = {
  getCustomer: getCustomer.trigger,
  resetCustomer: resetCustomer.trigger,
  editCustomer: editCustomer.trigger
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCustomer);