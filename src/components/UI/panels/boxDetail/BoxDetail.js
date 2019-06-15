import React from 'react';
import PropTypes from "prop-types";
import {NavLink} from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import CustomImage from '../../../UI/customImage/CustomImage';
import defaultPath from '../../../../assets/images/book_default.png';
import './BoxDetail.scss';

const BoxDetail = (props) => {  
    return (  
        <React.Fragment>   
                <Row>
                    <Col xs="12" md="7" lg="7" className="mb-3">                    
                        <aside>     
                            <CustomImage 
                                downloadPath={props.book.downloadPath} 
                                defaultPath={defaultPath}
                                isImgDefault={true}
                                alt="Book icon" />
                        </aside>
                    </Col>                   
                    <Col xs="12" md="5" lg="5"> 
                        <div className="title-link">                                     
                            <NavLink exact to={`editBook/${props.book.id}`}> 
                                {props.book.title} 
                            </NavLink>
                        </div>
                        <div className="subtitle">
                            {parseFloat(props.book.price).toFixed(2)} $     
                        </div>                       
                        {props.book.pageCount } pages<br/>
                        ISBN: { props.book.isbn }<br/>                       
                        <NavLink exact to={`editBook/${props.book.id}`}> 
                            Edit 
                        </NavLink>
                        <span> | </span>
                        <NavLink to="" onClick={(event) => {
                                                const {book} = props;
                                                event.preventDefault(); 
                                                props.toggleDelete(event,book);
                                                }}>
                            Delete
                        </NavLink>                       
                      </Col> 
                    </Row>               
        </React.Fragment>
    );
};

BoxDetail.propTypes = {
   book: PropTypes.object.isRequired,
   toggleDelete: PropTypes.func.isRequired
};

export default BoxDetail;