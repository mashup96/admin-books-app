import React from 'react';
import PropTypes from "prop-types";
import { Table } from 'reactstrap';
import StatusCondition from '../../UI/statusCondition/StatusCondition';

const OrderList = (props) => {
    return (
        <Table responsive>
            <thead>
                <tr>
                    <th>
                        <span className="pointer">Order #</span>
                    </th>
                    <th>
                        <span className="pointer">Customer</span>
                    </th>
                    <th>
                        <span className="pointer">Date</span>
                    </th>
                    <th>
                        <span className="pointer">Books</span>
                    </th>
                    <th>
                        <span className="pointer">Status</span>
                    </th>
                    <th className="has-text-right">
                        <span className="pointer">Total</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.orders.map((currentOrder, index) => (
                    <tr key={index}>
                        <th scope="row">
                            {currentOrder.id}
                        </th>
                        <td>
                            {currentOrder.customer}
                        </td>
                        <td>{currentOrder.date}</td>
                        <td>{currentOrder.numberOrderedBooks}</td>
                        <td>
                            <StatusCondition
                                status={currentOrder.status}
                                value="Successful"
                                typeColor="success" />
                            <StatusCondition
                                status={currentOrder.status}
                                value="In Progress"
                                typeColor="warning" />
                            <StatusCondition
                                status={currentOrder.status}
                                value="Failed"
                                typeColor="danger" />
                        </td>
                        <td>{currentOrder.total}&nbsp;$</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

OrderList.propTypes = {
    orders: PropTypes.array.isRequired
};

export default OrderList;