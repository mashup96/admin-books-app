import React from 'react';
import PropTypes from "prop-types";
import { Row, Col } from 'reactstrap';
import Notification from '../../../components/UI/notification/Notification';
import './NotificationList.scss';
const NotificationList = (props) => {
    return (
        <Row className="flex-row">
            <Col xs="12" sm="6" md="6" lg="4" xl="3">
                <Notification
                    typeClass="bg-primary"
                    value={props.orders}
                    title="Orders" />
            </Col>
            <Col xs="12" sm="6" md="6" lg="4" xl="3">
                <Notification
                    typeClass="bg-info"
                    value={props.revenue}
                    title="Revenue" />
            </Col>
            <Col xs="12" sm="6" md="6" lg="4" xl="3">
                <Notification
                    typeClass="bg-warning"
                    value={props.visitors}
                    title="Visitors" />
            </Col>
            <Col xs="12" sm="6" md="6" lg="4" xl="3">
                <Notification
                    typeClass="bg-success"
                    value={props.pageViews}
                    title="Pageviews" />
            </Col>
        </Row>
    );
};

NotificationList.propTypes = {
    orders: PropTypes.number,
    revenue: PropTypes.number,
    visitors: PropTypes.number,
    pageViews: PropTypes.number
};

export default NotificationList;