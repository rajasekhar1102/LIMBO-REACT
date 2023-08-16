import React from "react";
import Joi from "joi";
import Form from "./form";
import { toast } from "react-toastify";
import withRouter from "./router";
import { getProfile, saveprofile } from "../services/profileService";

class Profile extends Form {
  state = {
    data: {
      id: "",
      first_name: "",
      last_name: "",
      date_of_birth: "",
      picture: "",
      phone_number: "",
    },
    errors: {},
  };

  method = (value, helper) => {
    const LIMIT = Math.round((1024 * 1024 * 10) / 2);
    if (value && value.size >= LIMIT) {
      return helper.message(
        `image size should be under ${LIMIT / (1024 * 1024)} MB`
      );
    }
    return value;
  };

  schema = Joi.object({
    id: Joi.optional(),
    first_name: Joi.string().required().label("First Name"),
    date_of_birth: Joi.optional(),
    last_name: Joi.optional(),
    phone_number: Joi.optional(),
    picture: Joi.any().optional().custom(this.method, "file size validation"),
  });

  async componentDidMount() {
    try {
      await getProfile();

      if (localStorage.getItem("profile")) {
        console.log(localStorage.getItem("profile"));
        this.setState({ data: JSON.parse(localStorage.getItem("profile")) });
        this.props.context.setProfile(localStorage.getItem("profileurl"));
      }
    } catch (er) {
      if (er.response) toast.error(er.response.data.detail);
    }
  }

  render() {
    return (
      <div className="container w-50  ">
        <h1>Profile</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("first_name", "First Name")}
          {this.renderInput("last_name", "Last Name")}
          {this.renderInput("date_of_birth", "Date of Birth", "date")}
          {this.renderInput("phone_number", "Phone Number")}
          {this.renderFileInput("picture", "Picture", "image/*")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }

  doSubmit = async () => {
    try {
      await saveprofile(this.state.data);
      this.setState({ data: JSON.parse(localStorage.getItem("profile")) });
      this.props.context.setProfile(localStorage.getItem("profileurl"));
      toast("successfully profile updated");
    } catch (er) {
      console.log(er);
      if (er.response) toast.error(er.response.data.detail);
    }
  };
}

export default withRouter(Profile);
