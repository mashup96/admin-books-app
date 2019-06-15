import React from 'react';
import PropTypes from "prop-types";
import { Card,CardTitle, CardBody} from 'reactstrap';
import './CardLayout.scss';

const CardLayout = (props) => {    
    return (
        <Card className="container-card-layout">
            <CardBody>
                    <CardTitle 
                        className="title title-card-layout">
                        {props.titleCard}
                    </CardTitle> 
                    {props.children}    
            </CardBody>
        </Card>       
    );
};

CardLayout.propTypes = {   
    titleCard: PropTypes.string.isRequired,
};

export default CardLayout;