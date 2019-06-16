import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import classnames from "classnames";
import BookFormHOC from '../../../hoc/form/BookFormHOC';
import { createBook } from '../../../store/actions';
import { Card, CardBody, Row, Col} from 'reactstrap';
import Loading from '../../../components/UI/loading/Loading';
import CustomFeedback from '../../../components/UI/customFeedback/CustomFeedback';

class CreateBook extends React.Component {

  onSubmit = (formValue) => {  
    const {history} = this.props;
    const dataBook = {...formValue};   
    const imageBook = dataBook.icon;
    delete dataBook.id;
    delete dataBook.icon;
    dataBook.uid = this.props.uid;    
    this.props.createBook({dataBook,imageBook,history});
  }

  render() {
    const {loading, error} = this.props;
    return (
        <React.Fragment>
          <div className={classnames("", {
              "d-none": !loading})}>                    
            <Loading/>
          </div>
          <div className={classnames("", {
            "d-none": loading})}>       
            <Card>
              <CardBody>
                  <CustomFeedback type="danger" message={error.message} 
                        additionalText="Error create book" />
                  <h1 className="title">
                  New book
                  </h1> 
                  <br/>
                <Row>
                  <Col xs="12" lg="12">    
                    <BookFormHOC  
                        book={{}}                 
                        onSubmit={this.onSubmit}/>      
                  </Col>
              </Row>     
              </CardBody>
            </Card>
          </div>
        </React.Fragment>
      );    
  }

}

CreateBook.propTypes = {
  uid: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object
};


const mapStateToProps = state => {
  return {   
      uid: state.authData.uid,     
      loading: state.manageLoading.loading,
      error: state.booksData.error      
  };
}

const mapDispatchToProps = {
  createBook: createBook.trigger
};

export default connect(mapStateToProps,mapDispatchToProps)(CreateBook);