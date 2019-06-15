import React from 'react';
import PropTypes from "prop-types";
import { Input, Row, Col } from 'reactstrap';

const PageHeader = (props) => {
    const { timeframeList } = props;
    return (
        <Row className="mb-3">
            <Col lg="6">
              <h1 className="title">
                Home
              </h1>
            </Col>
            <Col lg="3">
            </Col>
            <Col lg="3">
                <Input type="select" name="select" id="exampleSelect"
                    className="form-control"
                    onChange={props.updateNotification}>
                    {timeframeList.map((timeframe, index) => (
                        <option key={index} value={timeframe.id}>
                            {timeframe.value}
                        </option>
                    ))}
                </Input>
            </Col>
        </Row>
    );
};

PageHeader.propTypes = {
    timeframeList: PropTypes.array.isRequired,
    updateNotification: PropTypes.func.isRequired
};

export default PageHeader;