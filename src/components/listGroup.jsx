import React, { Component } from "react";

const ListGroup = (props) => {
  return (
    <ul className="list-group ">
      <li
        onClick={() => props.onGenreSelected(null)}
        className={
          "list-group-item clickable " +
          (props.selectedGenre === null ? "active" : "")
        }>
        All Genres
      </li>
      {props.items.map((g) => (
        <li
          key={g.id}
          onClick={() => props.onGenreSelected(g)}
          className={
            "list-group-item clickable " +
            (props.selectedGenre === g ? "active" : "")
          }>
          {g.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
