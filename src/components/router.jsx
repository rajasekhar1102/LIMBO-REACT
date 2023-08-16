import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
const withRouter = (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const context = useOutletContext();
    const navigate = useNavigate();
    const location = useLocation();

    return (
      <WrappedComponent
        {...props}
        context={context}
        router={{ params, navigate, location }}
      />
    );
  };
};

export default withRouter;
