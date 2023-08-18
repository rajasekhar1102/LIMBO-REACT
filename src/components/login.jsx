import React from "react";
import Joi from "joi";
import Form from "./form";
import { login } from "../services/authService";
import withRouter from "./router";
import { Navigate } from "react-router-dom";

class LoginForm extends Form {
  state = { data: { username: "", password: "" }, errors: {}, disabled: "" };
  schema = Joi.object({
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  });

  doSubmit = async () => {
    this.setState({ disabled: true });
    try {
      await login(this.state.data);
      if (
        this.props.router.location.state &&
        this.props.router.location.state.prevpath
      ) {
        this.props.router.navigate("/");
        this.props.router.navigate(0);
      } else {
        this.props.router.navigate("/");
        this.props.router.navigate(0);
      }
    } catch (e) {
      if (e.response && e.response.status === 401) {
        const errors = { ...this.state.errors };
        errors.username = e.response.data.detail;
        this.setState({ errors });
      }
    }
    this.setState({ disabled: false });
  };

  render() {
    if (this.props.context.User) <Navigate to="/" />;
    return (
      <div className="container w-50  ">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
