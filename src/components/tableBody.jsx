import React, { Component } from "react";
import Paginate from "../utils/paginate";
import _ from "lodash";

class TableBody extends Component {
  state = {};

  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.col);
  };

  render() {
    const { moviesList, pageSize, curPage } = this.props.data;

    return (
      <tbody>
        {Paginate(moviesList, pageSize, curPage).map((m, i) => {
          return (
            <tr key={m.id}>
              {this.props.columns.map((c) => (
                <td key={m.id + (c.col || c.key)}>{this.renderCell(m, c)} </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    );
  }
}

export default TableBody;
