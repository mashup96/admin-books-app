import React from 'react';
import { Card, CardBody } from 'reactstrap';
import PropTypes from "prop-types";
import './Notification.scss';
const Notification = (props) => {
    return (
        <Card className={`text-white ${props.typeClass}`}>
            <CardBody className="pb-0">
                <p className="title-notification">
                    {props.value}
                </p>
                <p className="subtitle-notification">
                    {props.title}
                </p>
            </CardBody>
        </Card>
    );
};

Notification.propTypes = {
    typeClass: PropTypes.string.isRequired,
    value: PropTypes.number,
    title: PropTypes.string.isRequired
};

export default Notification;