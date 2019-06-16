import React from 'react';
import PropTypes from "prop-types";
import { Table, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import ConfirmModal from '../../UI/modals/confirmModal/ConfirmModal';

const CustomerList = (props) => {
  return (
    <React.Fragment>
      <Table responsive>
        <thead>
          <tr>
            <th>
              <span className="pointer">Name</span>
            </th>
            <th>
              <span className="pointer">Email</span>
            </th>
            <th>
              <span className="pointer">Country</span>
            </th>
            <th>
              <span className="pointer">Orders</span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.customers.map((currentCustomer, index) => (
            <tr key={index}>
              <td>
                <NavLink exact to={`editCustomer/${currentCustomer.id}`}>
                  <Button color="link">
                    {currentCustomer.name}
                  </Button>
                </NavLink>
              </td>
              <td>
                <code>{currentCustomer.email}</code>
              </td>
              <td>{currentCustomer.country}</td>
              <td>{currentCustomer.numberOrderedBooks}</td>
              <td>
                <div className="buttons">
                  <NavLink exact to={`editCustomer/${currentCustomer.id}`}
                    className="button is-small">
                    <Button className="mb-2" color="primary">
                      Edit
                    </Button>
                  </NavLink>
                  &nbsp; &nbsp;
                  <Button className="mb-2" color="danger"
                    onClick={(event) => { props.toggleDelete(event, currentCustomer) }}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ConfirmModal
        title="Customer removal confirmation"
        isOpenModal={props.isOpenModal}
        toggleDelete={props.toggleDelete}
        confirm={props.deleteCustomer}>
        Are you sure you want to remove selected customer ?
       </ConfirmModal>
    </React.Fragment>
  );
};

CustomerList.propTypes = {
  customers: PropTypes.array.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  toggleDelete: PropTypes.func.isRequired,
  deleteCustomer: PropTypes.func.isRequired
};

export default CustomerList;