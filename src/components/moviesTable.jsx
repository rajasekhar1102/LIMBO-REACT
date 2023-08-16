import React, { Component } from "react";

import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import Like from "./like";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

class MoviesTable extends Component {
  render() {
    const user = getCurrentUser();
    const columns = [
      {
        col: "title",
        label: "Title",
        content: (movie) => (
          <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
        ),
      },
      { col: "genre.name", label: "genre" },
      { col: "numberInStock", label: "Stock" },
      { col: "dailyRentalRate", label: "Rate" },
      {
        key: "like",
        content: (m) => <Like movie={m} onLike={() => this.props.onLike(m)} />,
      },
      user && user.isAdmin
        ? {
            key: "delete",
            content: (m) => (
              <button
                onClick={() => {
                  this.props.onDelete(m);
                }}
                className="btn btn-danger">
                delete
              </button>
            ),
          }
        : null,
    ].filter((c) => c);
    return (
      <table className=" table table-dark table-hover">
        <TableHeader
          sort={this.props.sort}
          onSortClick={this.props.onSortClick}
          columns={columns}
        />
        <TableBody data={this.props} columns={columns} />
      </table>
    );
  }
}

export default MoviesTable;
