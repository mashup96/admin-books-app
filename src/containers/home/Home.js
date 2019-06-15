import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import classnames from "classnames";
import PageHeader from '../../components/home/pageHeader/PageHeader';
import CardContainer from '../../components/home/cardContainer/CardContainer';
import NotificationList from '../../components/home/notificationList/NotificationList';
import {
  getTimeframeList,
  getNotifications,
  getPopularBooks,
  getLoyalCustomers,
  getLatestOrders,
  updateCurrentNotification
} from '../../store/actions';
import { Card, CardBody } from 'reactstrap';
import Loading from '../../components/UI/loading/Loading';
import CustomFeedback from '../../components/UI/customFeedback/CustomFeedback';

class Home extends React.Component {

  componentDidMount() {
    const { uid } = this.props;
    this.props.getTimeframeList({ uid });
    this.props.getNotifications({ uid });
    this.props.getPopularBooks({ uid });
    this.props.getLoyalCustomers({ uid });
    this.props.getLatestOrders({ uid });
  }

  updateNotification = (event) => {
    const value = event.target.value;
    this.props.updateCurrentNotification({ value });
  }

  getErrors(props){
    const {
      errorTimeframeList,
      errorNotifications,
      errorBooks,
      errorCustomers,
      errorOrders
    } = props;
    return (
      <React.Fragment>
        <CustomFeedback type="danger" 
        message={errorTimeframeList.message} 
        additionalText="Error get timeframe list" />
        <CustomFeedback type="danger" 
        message={errorNotifications.message}
        additionalText="Error get notifications" />
        <CustomFeedback type="danger" 
        message={errorBooks.message}
        additionalText="Error get books" />
        <CustomFeedback type="danger" 
        message={errorCustomers.message}
        additionalText="Error get customers" />
        <CustomFeedback type="danger" 
        message={errorOrders.message}
        additionalText="Error get orders" />
      </React.Fragment>
    );
  }

  render() {
    const {
      loading,
      timeframeList,
      currentNotification      
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
              {this.getErrors(this.props)}
              <PageHeader
                timeframeList={timeframeList} 
                updateNotification={this.updateNotification} />      
              <NotificationList
                orders={currentNotification.orders}
                revenue={currentNotification.revenue}
                visitors={currentNotification.visitors}
                pageViews={currentNotification.pageViews}
              />
              <CardContainer
                popularBooks={this.props.books}
                loyalCustomers={this.props.customers}
                latestOrders={this.props.orders} />
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }

}

Home.propTypes = {
  loading: PropTypes.bool.isRequired,
  uid: PropTypes.string.isRequired,
  notifications: PropTypes.array.isRequired,
  currentNotification: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  customers: PropTypes.array.isRequired,
  orders: PropTypes.array.isRequired,
  errorTimeframeList: PropTypes.object,
  errorNotifications: PropTypes.object,
  errorBooks: PropTypes.object,
  errorCustomers: PropTypes.object,
  errorOrders: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    loading: state.manageLoading.loading,
    uid: state.authData.uid,
    notifications: state.notificationsData.notifications,
    timeframeList: state.listsToSelectData.timeframeList,
    currentNotification: state.notificationsData.currentNotification,
    books: state.booksData.currentBooks,
    customers: state.customersData.currentCustomers,
    orders: state.ordersData.currentOrders,
    errorTimeframeList: state.listsToSelectData.errorTimeframeList,
    errorNotifications: state.notificationsData.error,
    errorBooks: state.booksData.error,
    errorCustomers: state.customersData.error,
    errorOrders: state.ordersData.error
  };
}

export const mapDispatchToProps = {
  getTimeframeList: getTimeframeList.trigger,
  getNotifications: getNotifications.trigger,
  getPopularBooks: getPopularBooks.trigger,
  getLoyalCustomers: getLoyalCustomers.trigger,
  getLatestOrders: getLatestOrders.trigger,
  updateCurrentNotification: updateCurrentNotification.trigger
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);