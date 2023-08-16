
import './App.css';
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notfound";
import MoviesForm from "./components/moviesform";
import Movies from "./components/movies";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import LoginForm from "./components/login";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import Home from './home';
import Profile from './components/profile';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route path="" element={<Navigate to="/movies" />} />
      <Route path="movies/:id" element={<MoviesForm />} />
      <Route path="login" element={<LoginForm />} />
      <Route path="logout" element={<Logout/>}/>
      <Route path='profile' element={<Profile/>}/>
      <Route path="register" element={<RegisterForm/> }/>
      <Route path="movies" element={<Movies />} />
      <Route path="customers" element={<Customers />} />
      <Route path="rentals" element={<Rentals />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);


function App() {
  

  return (
 <RouterProvider router={router} />
  );
}

export default App;
