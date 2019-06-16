import React from 'react';
import PropTypes from "prop-types";
import {Badge} from 'reactstrap';

const StatusCondition = (props) => { 
    return (                      
            (props.status === props.value) ?
                <Badge color={props.typeColor}>
                    { props.status }
                </Badge>
            : null
           );  

};

PropTypes.propTypes = {   
    status: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    typeColor: PropTypes.string.isRequired
};

export default StatusCondition;