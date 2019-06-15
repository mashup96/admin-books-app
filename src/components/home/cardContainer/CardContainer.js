import React from 'react';
import PropTypes from "prop-types";
import { Button, Row, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import CardLayout from '../../UI/panels/cardLayout/CardLayout';
import StatusCondition from '../../UI/statusCondition/StatusCondition';
import './CardContainer.scss';

class CardContainer extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col xs="12" sm="6" md="6" xl="4" className="mb-3">
            <CardLayout titleCard="Most popular books">
              {this.props.popularBooks.map((popularBook, index) => (
                <div key={index}>
                  <Row>
                    <Col xs="12" lg="6">
                      <div>
                        <NavLink
                          exact to={`editBook/${popularBook.id}`}
                          className="link-title">
                          {popularBook.title}
                        </NavLink>
                      </div>
                    </Col>
                    <Col xs="12" lg="6">
                      <strong>
                        {popularBook.numSold}
                      </strong> sold
                  </Col>
                  </Row>
                  <hr />
                </div>
              ))}
              <NavLink
                exact to="books"
                className="button is-link is-outlined">
                <Button color="primary">
                  View all books
                </Button>
              </NavLink>
            </CardLayout>
          </Col>
          <Col xs="12" sm="6" md="6" xl="4" className="mb-3">
            <CardLayout titleCard="Most loyal customers">
              {this.props.loyalCustomers.map((loyalCustomer, index) => (
                <div key={index}>
                  <Row>
                    <Col xs="12" lg="6">
                      <div>
                        <NavLink
                          exact to={`editCustomer/${loyalCustomer.id}`}
                          className="link-title">
                          {loyalCustomer.name}
                        </NavLink>
                        <div>
                          {loyalCustomer.country}
                        </div>
                      </div>
                    </Col>
                    <Col xs="12" lg="6">
                      <strong>
                        {loyalCustomer.numberOrderedBooks}
                      </strong> sold
                    </Col>
                  </Row>
                  <hr />
                </div>
              ))}
              <NavLink exact to="customers" className="button is-link is-outlined">
                <Button color="primary">
                  View all customers
                </Button>
              </NavLink>
            </CardLayout>
          </Col>
          <Col xs="12" sm="6" md="6" xl="4" className="mb-3" >
            <CardLayout titleCard="Latest orders">
              {this.props.latestOrders.map((latestOrder, index) => (
                <div key={index}>
                  <Row>
                    <Col xs="12" lg="8">
                      <strong>
                        {latestOrder.id}
                      </strong>
                      <div>
                        {latestOrder.date} by &nbsp;
                      {latestOrder.customer}
                      </div>
                    </Col>
                    <Col xs="12" lg="4">
                      <div>
                        <strong>
                          {latestOrder.total}&nbsp;$
                     </strong>
                      </div>
                      <StatusCondition
                        status={latestOrder.status}
                        value="Successful"
                        typeColor="success" />
                      <StatusCondition
                        status={latestOrder.status}
                        value="In Progress"
                        typeColor="warning" />
                      <StatusCondition
                        status={latestOrder.status}
                        value="Failed"
                        typeColor="danger" />
                    </Col>
                  </Row>
                  <hr />
                </div>
              ))}
              <NavLink exact to="orders" className="button is-link is-outlined">
                <Button color="primary">
                  View all orders
                </Button>
              </NavLink>
            </CardLayout>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

}

CardContainer.propTypes = {
  popularBooks: PropTypes.array.isRequired,
  loyalCustomers: PropTypes.array.isRequired,
  latestOrders: PropTypes.array.isRequired
};

export default CardContainer;