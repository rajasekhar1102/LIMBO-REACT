import React, { Component } from "react";

import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Like = (props) => {
  return (
    <FontAwesomeIcon
      style={props.movie.like ? { color: "red" } : {}}
      onClick={props.onLike}
      icon={faHeart}
    />
  );
};

export default Like;
