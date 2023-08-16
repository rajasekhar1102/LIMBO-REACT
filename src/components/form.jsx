import React, { Component } from "react";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = { data: {}, errors: {} };

  validateProperty = ({ name, value, files }) => {
    const subschema = this.schema.extract([name]);

    if (!subschema) return;
    let error = {};
    if (files) {
      error = subschema.validate(files[0]).error;
    } else {
      error = subschema.validate(value).error;
    }
    return error ? error.details[0].message : null;
  };
  validate = () => {
    const result = this.schema.validate(this.state.data, {
      abortEarly: false,
    });

    if (!result.error) return null;
    const errors = {};

    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = ({ target: input }) => {
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };
    if (input.type === "number") {
      data[input.name] = Number(input.value);
    } else if (input.type === "file") {
      data[input.name] = input.files[0];
    } else {
      data[input.name] = input.value;
    }
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    this.setState({ data, errors });
  };
  renderButton = (label) => {
    return (
      <button
        disabled={this.validate()}
        type="submit"
        className="btn btn-primary">
        {label}
      </button>
    );
  };
  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  renderInput = (name, label, type = "text") => {
    return (
      <Input
        type={type}
        value={this.state.data[name]}
        label={label}
        name={name}
        onChange={this.handleChange}
        errors={this.state.errors[name]}
      />
    );
  };

  renderFileInput = (name, label, accept) => {
    return (
      <Input
        type="file"
        accept={accept}
        label={label}
        name={name}
        onChange={this.handleChange}
        errors={this.state.errors[name]}
      />
    );
  };
}

export default Form;
