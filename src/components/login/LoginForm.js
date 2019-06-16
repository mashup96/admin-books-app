import React from 'react';
import { ErrorMessage } from 'formik';
import {
  Button, Form, Input, InputGroup,
  InputGroupAddon, InputGroupText, Col, FormGroup,
  Label, Row
} from 'reactstrap';
import CustomErrorMsg from '../UI/customErrorMsg/CustomErrorMsg';

const LoginForm = props => {
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched
  } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="mb-3" >Login</h1>     
      <FormGroup>
        <Label for="email">Email</Label>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>@</InputGroupText>
          </InputGroupAddon>
          <Input
            type="text"
            name="email"
            id="email"
            invalid={errors.email && touched.email}
            placeholder="insert email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <ErrorMessage name="email" component={CustomErrorMsg} />
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-lock"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input
            type="password"
            name="password"
            id="password"
            invalid={errors.password && touched.password}
            placeholder="insert password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange} />
          <ErrorMessage name="password" component={CustomErrorMsg} />
        </InputGroup>
      </FormGroup>
      <div className="mb-3"></div>
      <Row>
        <Col>
          <Button type="submit" color="primary" className="px-4">
            Sign In to your account
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default LoginForm;