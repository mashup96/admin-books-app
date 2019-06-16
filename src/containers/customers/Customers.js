import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import classnames from "classnames";
import SearchByParam from '../../components/UI/searchByParam/SearchByParam';
import CustomPagination from '../../components/UI/customPagination/CustomPagination';
import CustomerList from '../../components/customers/customerList/CustomerList';
import {
  getAllCustomers,
  deleteCustomer,
  getCustomersFromNumberPage,
  getCustomersFromSearch
} from '../../store/actions';
import { Card, CardBody } from 'reactstrap';
import Loading from '../../components/UI/loading/Loading';
import CustomFeedback from '../../components/UI/customFeedback/CustomFeedback';

class Customers extends React.Component {

  state = {
    isOpenModal: false,
    customerSelected: null,
  }

  componentDidMount() {
    const { uid } = this.props;
    this.props.getAllCustomers({ uid });
  }

  updateSearchText = (event) => {
    this.props.getCustomersFromSearch({ searchText: event });
  }

  updateCurrentPage = (event) => {
    this.props.getCustomersFromNumberPage({ currentPage: event });
  }

  toggleDelete = (event, customer) => {
    this.setState(prevState => ({
      isOpenModal: !prevState.isOpenModal,
      customerSelected: { ...customer }
    }));
  }

  deleteCustomer = () => {
    const { id, fullPath } = this.state.customerSelected;
    this.props.deleteCustomer({ id, fullPath });
    this.setState({
      isOpenModal: false,
      customerSelected: null,
      currentPage: 0
    });
  }


  render() {
    const { 
      loading,
      customers,
      numTotalCustomers,
      pageSize,
      currentPage,
      searchText,
      error      
    } = this.props;
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
                    additionalText="Error get customers" />
              <h1 className="title">Customers</h1>
              <nav className="mb-3">
                <SearchByParam
                  numElements={numTotalCustomers}
                  nameSection="customers"
                  pathNew="createCustomer"
                  endPlaceholder="Name"
                  searchText={searchText}
                  updateSearchText={this.updateSearchText}
                />
              </nav>
              <CustomerList
                customers={customers}
                isOpenModal={this.state.isOpenModal}
                toggleDelete={this.toggleDelete}
                deleteCustomer={this.deleteCustomer}
              />
              <CustomPagination
                pageSize={pageSize}
                currentPage={currentPage}
                numTotalElements={numTotalCustomers}
                updateCurrentPage={this.updateCurrentPage}
              />
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }

}

Customers.propTypes = {
  uid: PropTypes.string.isRequired,
  searchText: PropTypes.string,
  customers: PropTypes.array.isRequired,
  numTotalCustomers: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object
};

const mapStateToProps = state => {
  return {
    uid: state.authData.uid,
    searchText: state.customersData.searchText,
    customers: state.customersData.currentCustomers,
    numTotalCustomers: state.customersData.numTotalCustomers,
    currentPage: state.customersData.currentPage,
    pageSize: state.customersData.pageSize,
    loading: state.manageLoading.loading,
    error: state.customersData.error
  };
}

export const mapDispatchToProps = {
  getAllCustomers: getAllCustomers.trigger,
  deleteCustomer: deleteCustomer.trigger,
  getCustomersFromNumberPage: getCustomersFromNumberPage.trigger,
  getCustomersFromSearch: getCustomersFromSearch.trigger
};

export default connect(mapStateToProps, mapDispatchToProps)(Customers);