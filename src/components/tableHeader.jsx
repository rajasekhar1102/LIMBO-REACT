import React, { Component } from "react";
import { faSortAsc, faSortDesc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TableHeader extends Component {
  raiseSort = (path) => {
    let sort = { ...this.props.sort };
    if (sort.path === path) {
      if (sort.order === "asc") {
        sort.order = "desc";
      } else {
        sort.order = "asc";
      }
    } else {
      sort.path = path;
      sort.order = "asc";
    }
    this.props.onSortClick(sort);
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((c, index) => (
            <th
              className="clickable"
              key={index}
              onClick={() => {
                this.raiseSort(c.col);
              }}>
              {c.label}
              {this.renderSortIcon(c)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }

  renderSortIcon = (column) => {
    if (this.props.sort.path !== column.col) {
      return null;
    }
    if (this.props.sort.order === "asc")
      return <FontAwesomeIcon className="px-2" icon={faSortDesc} />;
    return <FontAwesomeIcon className="px-2" icon={faSortAsc} />;
  };
}

export default TableHeader;
