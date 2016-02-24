import React, { Component } from 'react';
import { Form } from '../forms/Form';
import { FormField } from '../forms/FormField';
import { Input } from '../forms/Input';
import { Select } from '../forms/Select';

export default class SignUpForm extends Component {
  render() {
    return (
      <Form submit={this.props.submit} initialValues={this.initialValues} validators={this.validators} className="signup group">

        <FormField className="form-input">
        <Input type="text" name="fname" id="user-fname" />
        <Input type="text" name="lname" id="user-lname" />
        <Input type="email" name="email" id="user-email" />
        <Input type="password" name="password" id="user-password" />
        <Input type="date" name="birthday" id="user-birthday" />
        <Select id="user-gender" name="gender" options={["", "male", "female"]} />
        </FormField>

        <label htmlFor="user-fname">First Name</label>
        <label htmlFor="user-email">Email</label>
        <label htmlFor="user-lname">Last Name</label>


        <label htmlFor="user-password">Password</label>

        <label htmlFor="user-birthday">Birthday</label>

        <label htmlForm="user-gender">Gender</label>

        <button type="submit" className="signbutton" value="Sign Up">Sign Up</button>
        <a className="btn-facebook" href="/auth/facebook">Login with Facebook</a>

      </Form>
    );
  }
}

SignUpForm.prototype.validators = {
    fname: ["presence"],
    lname: ["presence"],
    email: ["presence"],
    birthday: ["presence"],
    gender: ["presence"],
    password: ["presence", "length"]
};

SignUpForm.prototype.initialValues = {
  fname: "",
  lname: "",
  email: "",
  password: "",
  birthday: "",
  gender: ""
};
