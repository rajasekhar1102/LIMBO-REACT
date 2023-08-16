import React from "react";
import { getMovie, saveMovie } from "../services/movieService";
import withRouter from "./router";
import Form from "./form";
import Joi from "joi";
import { Navigate } from "react-router-dom";
import { getGenres } from "../services/genreService";

class MoviesForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };
  schema = Joi.object({
    id: Joi.number(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.number().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(200)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
  });

  async componentDidMount() {
    const { router } = this.props;
    const { data: genres } = await getGenres();
    this.setState({ genres });
    const { id } = router.params;
    if (id === "new") return;
    try {
      const { data: movie } = await getMovie(id);
      this.setState({ data: this.mapToData(movie) });
    } catch (e) {
      if (e.response && e.response.status === 404) {
        router.navigate("/");
        router.navigate(0);
        return;
      }
    }
  }
  mapToData = (movie) => {
    const data = {};
    data.id = movie.id;
    data.title = movie.title;
    data.genreId = movie.genre.id;
    data.numberInStock = movie.numberInStock;
    data.dailyRentalRate = movie.dailyRentalRate;

    return data;
  };

  doSubmit = async () => {
    try {
      await saveMovie(this.state.data);
    } catch (ex) {}
    this.props.router.navigate(-1);
  };
  render() {
    if (!this.props.context.User)
      return (
        <Navigate
          to="/login"
          state={{ prevpath: this.props.router.location.pathname }}
        />
      );
    return (
      <div className="container w-50  ">
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default withRouter(MoviesForm);
