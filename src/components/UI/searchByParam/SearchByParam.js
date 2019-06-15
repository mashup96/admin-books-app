import React from 'react';
import PropTypes from "prop-types";
import { Form, Input, Button, Row, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const SearchByParam = (props) => {
    return (
        <React.Fragment>
            <Row>
                <Col xs="12" lg="auto">
                    <div className="text-value mb-2">
                        <strong>
                            {props.numElements}
                        </strong> total {props.nameSection}
                    </div>
                </Col>
                {props.pathNew &&
                    <Col xs="12" lg="auto">
                        <NavLink
                            exact to={props.pathNew}
                            className="button is-success">
                            <Button className="mb-2" color="success">
                                New
                    </Button>
                        </NavLink>
                    </Col>
                }
                <Col xs="auto">
                    <Form inline>
                        <Input
                            type="text"
                            className="mb-3"
                            value={props.searchText}
                            onChange={(event) => {
                                props.updateSearchText(event.target.value)
                            }}
                            placeholder={`Search by ${props.endPlaceholder}`}
                        />
                    </Form>
                </Col>
            </Row>
        </React.Fragment>
    );
};

SearchByParam.propTypes = {
    numElements: PropTypes.number.isRequired,
    nameSection: PropTypes.string.isRequired,
    pathNew: PropTypes.string,
    endPlaceholder: PropTypes.string,
    searchText: PropTypes.string,
    updateSearchText: PropTypes.func.isRequired
};

export default SearchByParam;