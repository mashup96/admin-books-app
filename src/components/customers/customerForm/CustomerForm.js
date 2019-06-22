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
import CustomImage from '../../UI/customImage/CustomImage';
import defaultPath from '../../../assets/images/customer_default.jpg';
import { PATH_CUSTOMERS } from '../../../shared/constant';

const CustomerForm = props => {
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
        alt="Customer avatar" />
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm={6} lg={4}>
            <FormGroup>
              <Label for="name">
                Full Name <span className="required-asterisk">*</span>
              </Label>
              <Input
                type="text" name="name" id="name"
                invalid={errors.name && touched.name}
                placeholder="e.g. Alex Johnson"
                title="name"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange} />
              <ErrorMessage name="name" component={CustomErrorMsg} />
            </FormGroup>
          </Col>
          <Col sm={6} lg={4}>
            <FormGroup>
              <Label for="name">
                Email <span className="required-asterisk">*</span>
              </Label>
              <Input
                type="email" name="email" id="email"
                invalid={errors.email && touched.email}
                placeholder="e.g. alexjohnson@gmail.com"
                title="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange} />
              <ErrorMessage name="email" component={CustomErrorMsg} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={6} lg={4}>
            <FormGroup>
              <Label for="address">First address</Label>
              <Input
                type="text" name="address" id="address"
                placeholder="Number and street name"
                title="first address"
                value={values.address} onChange={handleChange} />
            </FormGroup>
          </Col>
          <Col sm={6} lg={4}>
            <FormGroup>
              <Label for="address2">Second address</Label>
              <Input
                type="text" name="address2" id="address2"
                placeholder="Second address line (optional)"
                title="second address"
                value={values.address2} onChange={handleChange} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={6} lg={4}>
            <FormGroup>
              <Label for="city">
                City <span className="required-asterisk">*</span>
              </Label>
              <Input
                type="text" name="city" id="city"
                invalid={errors.city && touched.city}
                placeholder="e.g. San Francisco"
                title="city (e.g. San Francisco)"
                value={values.city}
                onBlur={handleBlur}
                onChange={handleChange} />
              <ErrorMessage name="city" component={CustomErrorMsg} />
            </FormGroup>
          </Col>
          <Col sm={6} lg={4}>
            <FormGroup>
              <Label for="country">
                Country <span className="required-asterisk">*</span>
              </Label>
              <Input
                type="text" name="country" id="country"
                invalid={errors.country && touched.country}
                placeholder="e.g. United States"
                title="country (e.g. United States)"
                value={values.country}
                onBlur={handleBlur}
                onChange={handleChange} />
              <ErrorMessage name="country" component={CustomErrorMsg} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={6} lg={4}>
            <FormGroup>
              <Label for="zipcode">
                Zip code <span className="required-asterisk">*</span>
              </Label>
              <Input
                type="text" name="zipcode" id="zipcode"
                invalid={errors.zipcode && touched.zipcode}
                placeholder="e.g. 67202"
                title="zip code (e.g. 67202)"
                value={values.zipcode}
                onBlur={handleBlur}
                onChange={handleChange} />
              <ErrorMessage name="zipcode" component={CustomErrorMsg} />
            </FormGroup>
          </Col>
          <Col sm={6} lg={4}>
            <FormGroup>
              <Label for="numberOrderedBooks">
                Number ordered books <span className="required-asterisk">*</span>
              </Label>
              <Input
                type="text" name="numberOrderedBooks" id="numberOrderedBooks"
                invalid={errors.numberOrderedBooks && touched.numberOrderedBooks}
                placeholder="e.g. 10"
                title="number ordered books"
                value={values.numberOrderedBooks}
                onBlur={handleBlur}
                onChange={handleChange} />
              <ErrorMessage name="numberOrderedBooks" component={CustomErrorMsg} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={6} lg={4}>
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
        </Row>
        <div className="mt-3">
          <Button
            type="submit"
            color="primary"
            className="pull-right"
            size="lg">
            Save customer
          </Button>       
          <NavLink exact to={PATH_CUSTOMERS}>
            <Button color="secondary" size="lg">Back</Button>
          </NavLink>
        </div>
      </Form>
    </React.Fragment>
  );
}

export default CustomerForm;
