import React from "react";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  console.log(useLocation());
  return <h1>Not Found</h1>;
};

export default NotFound;
