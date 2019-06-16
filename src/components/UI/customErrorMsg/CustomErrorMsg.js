import React from 'react';
import {FormFeedback} from 'reactstrap';

const CustomErrorMsg = (props) => {    
    return (
        <FormFeedback>
            {props.children}
        </FormFeedback>  
    );
};

export default CustomErrorMsg;