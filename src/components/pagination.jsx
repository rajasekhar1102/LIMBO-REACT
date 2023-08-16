import React, { Component } from "react";
import _ from "lodash";

const Pagination = (props) => {
  let pages = _.range(1, Math.ceil(props.count / props.size) + 1);
  if (pages.length === 1) return null;

  return (
    <nav>
      <ul className="pagination">
        {pages.map((i) => (
          <li
            key={i}
            className={"page-item" + (props.curPage == i ? " active" : "")}>
            <a className="page-link" onClick={() => props.onPageChange(i)}>
              {i}
            </a>{" "}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
