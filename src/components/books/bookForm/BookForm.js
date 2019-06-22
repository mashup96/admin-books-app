import React from 'react';
import { NavLink } from 'react-router-dom';
import { ErrorMessage } from 'formik';
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
  FormFeedback
} from 'reactstrap';
import CustomErrorMsg from '../../UI/customErrorMsg/CustomErrorMsg';
import './BookForm.scss';
import CustomImage from '../../UI/customImage/CustomImage';
import defaultPath from '../../../assets/images/book_default.png';
import { PATH_BOOKS } from '../../../shared/constant';

const BookForm = props => {
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    setFieldValue,
    setFieldTouched,
    touched,
    iconDefault
  } = props;
  let fileName = "";
  if (values.icon) {
    fileName = values.icon.name;
  }
  return (
    <React.Fragment>
      <Row className="mb-3">
        <Col lg={12}>
          All fields with
          &nbsp;
             <span className="required-asterisk">*</span>
          &nbsp;
          are mandatory
         </Col>
      </Row>
      <CustomImage
        downloadPath={values.downloadPath}
        defaultPath={defaultPath}
        isImgDefault={iconDefault}
        alt="Book icon" />
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm={6} md={4}>
            <FormGroup>
              <Label for="title">
                Title <span className="required-asterisk">*</span>
              </Label>
              <Input
                type="text" name="title" id="title"
                invalid={errors.title && touched.title}
                placeholder="Develop with react"
                title="book title"
                value={values.title}
                onBlur={handleBlur}
                onChange={handleChange} />
              <ErrorMessage name="title" component={CustomErrorMsg} />
            </FormGroup>
          </Col>
          <Col sm={6} md={4}>
            <FormGroup>
              <Label for="isbn">
                ISBN <span className="required-asterisk">*</span>
              </Label>
              <Input
                type="text" name="isbn" id="isbn"
                invalid={errors.isbn && touched.isbn}
                placeholder="e.g. 9781939902351"
                title="isbn (e.g. 9781939902351)"
                value={values.isbn}
                onBlur={handleBlur}
                onChange={handleChange} />
              <ErrorMessage name="isbn" component={CustomErrorMsg} />
            </FormGroup>
          </Col>
          <Col xs={6} sm={4} md={3}>
            <FormGroup>
              <Label for="pageCount">
                Pages number <span className="required-asterisk">*</span>
              </Label>
              <Input
                type="text" name="pageCount" id="pageCount"
                invalid={errors.pageCount && touched.pageCount}
                placeholder="e.g. 270"
                title="pages number"
                value={values.pageCount}
                onBlur={handleBlur}
                onChange={handleChange} />
              <ErrorMessage
                name="pageCount"
                component={CustomErrorMsg} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={6} md={4}>
            <FormGroup>
              <div className="label-upload-file mb-1">
                Cover image
              </div>
              <CustomInput
                type="file"
                id="icon"
                name="icon"
                title={fileName || 'choose an image file'}
                label={fileName || 'choose an image file'}
                invalid={(touched.icon && !!errors.icon)}
                onChange={(event) => {
                  setFieldTouched("icon", true);
                  setFieldValue("icon", event.currentTarget.files[0])
                }}
              />
              {touched.icon && errors.icon &&
                <FormFeedback className="invalid-feedback-file">
                  {errors.icon}
                </FormFeedback>
              }
              <div className="mt-1">
                Maximum size: 5MB
                <br />
                Allowed extensions:
                .jpeg,&nbsp;&nbsp;.jpg,&nbsp;&nbsp;.png
              </div>
            </FormGroup>
          </Col>
          <Col xs={6} sm={4} md={3}>
            <FormGroup>
              <Label for="price">
                Price <span className="required-asterisk">*</span>
              </Label>
              <Input
                type="text" name="price" id="price"
                invalid={errors.price && touched.price}
                placeholder="e.g. 22.50"
                title="price"
                value={values.price}
                onBlur={(event) => {
                  let value = event.target.value;
                  if (event.target.value &&
                    !isNaN(event.target.value)) {
                    value = parseFloat(event.target.value).toFixed(2);
                  }
                  setFieldTouched("price", true);
                  setFieldValue("price", value);
                }}
                onChange={handleChange} />
              <ErrorMessage name="price" component={CustomErrorMsg} />
            </FormGroup>
          </Col>
        </Row>
        <div className="mt-3"> 
          <Button
            type="submit"
            color="primary"
            className="pull-right"
            size="lg">
            Save book
          </Button>          
          <NavLink exact to={PATH_BOOKS}>
            <Button color="secondary"             
            size="lg">Back</Button>
          </NavLink>
         </div> 
      </Form>
    </React.Fragment>
  );
}

export default BookForm;