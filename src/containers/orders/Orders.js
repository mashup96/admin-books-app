import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import classnames from "classnames";
import SearchByParam from '../../components/UI/searchByParam/SearchByParam';
import CustomPagination from '../../components/UI/customPagination/CustomPagination';
import OrderList from '../../components/orders/orderList/OrderList';
import {
  getAllOrders,
  getOrdersFromNumberPage,
  getOrdersFromSearch
} from '../../store/actions';
import { Card, CardBody } from 'reactstrap';
import Loading from '../../components/UI/loading/Loading';
import CustomFeedback from '../../components/UI/customFeedback/CustomFeedback';

class Orders extends React.Component {

  componentDidMount() {
    const { uid } = this.props;
    this.props.getAllOrders({ uid });
  }

  updateSearchText = (event) => {
    this.props.getOrdersFromSearch({ searchText: event });
  }

  updateCurrentPage = (event) => {
    this.props.getOrdersFromNumberPage({ currentPage: event });
  }

  render() {
    const {
      loading,
      orders,
      numTotalOrders,
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
              <CustomFeedback type="danger" 
                  message={error.message} 
                  additionalText="Error get orders" />
              <h1 className="title">Orders</h1>
              <nav className="mb-3">
                <SearchByParam
                  numElements={numTotalOrders}
                  nameSection="orders"
                  pathNew={null}
                  endPlaceholder="Order #"
                  searchText={searchText}
                  updateSearchText={this.updateSearchText}
                />
              </nav>
              <OrderList
                orders={orders}
              />
              <CustomPagination
                pageSize={pageSize}
                currentPage={currentPage}
                numTotalElements={numTotalOrders}
                updateCurrentPage={this.updateCurrentPage}
              />
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }

}

Orders.propTypes = {
  uid: PropTypes.string.isRequired,
  orders: PropTypes.array.isRequired,
  numTotalOrders: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  searchText: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object
};

const mapStateToProps = state => {
  return {
    uid: state.authData.uid,
    orders: state.ordersData.currentOrders,
    numTotalOrders: state.ordersData.numTotalOrders,
    currentPage: state.ordersData.currentPage,
    searchText: state.ordersData.searchText,
    pageSize: state.ordersData.pageSize,
    loading: state.manageLoading.loading,
    error: state.ordersData.error
  };
}

export const mapDispatchToProps = {
  getAllOrders: getAllOrders.trigger,
  getOrdersFromNumberPage: getOrdersFromNumberPage.trigger,
  getOrdersFromSearch: getOrdersFromSearch.trigger,
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);