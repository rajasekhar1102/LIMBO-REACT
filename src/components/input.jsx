import React from "react";

const Input = ({ name, label, value, onChange, accept, errors, type }) => {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <input
        className="form-control"
        onChange={onChange}
        value={value}
        type={type}
        name={name}
        id={name}
        accept={accept}
      />
      {errors && <div className="alert alert-danger">{errors}</div>}
    </div>
  );
};

export default Input;
