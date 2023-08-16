import React from "react";
import Form from "./form";
import Joi from "joi";
import * as userService from "../services/userService";
import { loginWithJwt } from "../services/authService";

class RegisterForm extends Form {
  state = { data: { email: "", password: "", username: "" }, errors: {} };
  schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string()
      .label("Password")
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,15}$/)
      .message(
        "Password must contains a lower case ,a upper case, a number and minimum of size 8  "
      ),

    username: Joi.string().required().label("Username"),
  });

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      const token = JSON.parse(response.headers["x-auth-token"]);
      loginWithJwt(token);
      window.location = "/";
    } catch (e) {
      if (e.response && e.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = "";
        for (let key in e.response.data)
          errors.username += e.response.data[key];
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <div className="container w-50">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}

          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
