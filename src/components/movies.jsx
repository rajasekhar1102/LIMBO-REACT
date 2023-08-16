import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import Pagination from "./pagination";
import ListGroup from "./listGroup";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import SearchBox from "./searchbox";
import { like } from "../services/userlikeService";
import withRouter from "./router";
import "react-toastify/dist/ReactToastify.css";

class Movies extends Component {
  state = {
    user: null,
    movies: [],
    genres: [],
    pageSize: 5,
    curPage: 1,
    selectedGenre: null,
    searchQuery: "",
    sort: { path: "title", order: "asc" },
  };
  async componentDidMount() {
    const { data: genres } = await getGenres();
    const { data: movies } = await getMovies();
    const { User: user } = this.props.context;
    this.setState({ genres, movies, user });
  }
  render() {
    let moviesList =
      this.state.selectedGenre === null
        ? this.state.searchQuery === ""
          ? this.state.movies
          : this.state.movies.filter((m) =>
              m.title
                .toLowerCase()
                .startsWith(this.state.searchQuery.toLowerCase())
            )
        : this.state.movies.filter(
            (m) => m.genre.name === this.state.selectedGenre.name
          );

    if (moviesList.length === 0) {
      return <h1>oops! no movies in the database</h1>;
    }
    moviesList = _.orderBy(
      moviesList,
      [this.state.sort.path],
      [this.state.sort.order]
    );

    return (
      <>
        <div className="container p-5">
          <div className="row">
            <div className="col-2 pt-5 ">
              <ListGroup
                selectedGenre={this.state.selectedGenre}
                onGenreSelected={this.genreHandle}
                items={this.state.genres}
              />
            </div>
            <div className="col">
              {this.state.user && (
                <Link to="/movies/new">
                  <button className="btn btn-primary m-2">New Movie </button>
                </Link>
              )}
              <h4>Showing {moviesList.length} movies in the database</h4>
              <SearchBox
                value={this.state.searchQuery}
                onChange={this.handleSearch}
              />
              <MoviesTable
                moviesList={moviesList}
                pageSize={this.state.pageSize}
                curPage={this.state.curPage}
                onLike={this.likeHandle}
                onDelete={this.deleteHandle}
                onSortClick={this.sortHandle}
                sort={this.state.sort}
              />

              <Pagination
                onPageChange={this.pageChangeHandle}
                count={moviesList.length}
                curPage={this.state.curPage}
                size={this.state.pageSize}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
  sortHandle = (sort) => {
    this.setState({ sort });
  };
  genreHandle = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", curPage: 1 });
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, curPage: 1 });
  };

  likeHandle = async (movie) => {
    const oldstate = this.state.movies;
    let newstate = [...oldstate];

    let index = oldstate.indexOf(movie);
    newstate[index] = { ...oldstate[index] };
    newstate[index].like = !newstate[index].like;
    if (this.state.user) {
      try {
        await like(movie);
        this.setState({ movies: newstate });
      } catch (ex) {
        if (ex.response) toast.error(ex.response.data.detail);
        this.setState({ movies: oldstate });
      }
    } else {
      this.setState({ movies: newstate });
    }
  };
  pageChangeHandle = (page) => {
    this.setState({ curPage: page });
  };

  deleteHandle = async (movie) => {
    const prevMovies = this.state.movies;
    const prevCurPage = this.state.curPage;
    let newstate = {
      movies: this.state.movies.filter((m) => m.id !== movie.id),
    };
    if (
      newstate.movies.length <=
      (this.state.curPage - 1) * this.state.pageSize
    ) {
      newstate.curPage = this.state.curPage - 1;
    }
    this.setState(newstate);
    try {
      await deleteMovie(movie.id);
    } catch (e) {
      if (e.response) {
        toast(e.response.data.detail);
      }
      this.setState({ movies: prevMovies });
      if (newstate.curPage) {
        this.setState({ curPage: prevCurPage });
      }
    }
  };
}

export default withRouter(Movies);

/* <tbody>
          {Paginate(moviesList, pageSize, curPage).map((m) => (
            <tr key={m.id}>
              <td>{m.title}</td>
              <td>{m.genre.name}</td>
              <td>{m.numberInStock}</td>
              <td>{m.dailyRentalRate}</td>
              <td>
                <Like movie={m} onLike={() => onLike(m)} />
              </td>
              <td>
                <button
                  onClick={() => {
                    onDelete(m);
                  }}
                  className="btn btn-danger">
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>*/
