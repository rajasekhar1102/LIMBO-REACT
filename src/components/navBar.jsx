import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ user, userProfile }) => {
  return (
    <nav className="navbar navbar-expand-lg  fs-5 bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand fs-3" to="/">
          LIMBO
        </NavLink>

        <div className="collapse navbar-collapse mx-5" id="navbarNav">
          <ul className="navbar-nav mx-2 position-relative">
            <li className="nav-item ">
              <NavLink className="nav-link " aria-current="page" to="/movies">
                Movies
              </NavLink>
            </li>
            <li className="nav-item  mx-2">
              <NavLink className="nav-link" to="/customers">
                Customers
              </NavLink>
            </li>
            <li className="nav-item  mx-2">
              <NavLink className="nav-link" to="/rentals">
                Rentals
              </NavLink>
            </li>

            {!user && (
              <React.Fragment>
                <li className="nav-item  mx-2">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item  mx-2">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>
      {user && (
        <div
          className="position-fixed  end-0 top-0  pt-2  "
          style={{ width: 150, height: 100 }}>
          <div className="position-relative ">
            <NavLink
              to="/profile"
              className="d-block mb-2 m-0 text-capitalize text-decoration-none">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                data-bs-title="profile">
                <strong> {user.username}</strong>
              </button>
            </NavLink>
            {userProfile && (
              <img
                src={userProfile}
                className="rounded-circle mb-3 avatar"
                alt="Avatar"
              />
            )}
            <span className="d-block badge bg-danger w-50">
              <NavLink className="nav-link" to="/logout">
                Logout
              </NavLink>
            </span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
