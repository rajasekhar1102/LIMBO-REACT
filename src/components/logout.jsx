import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    logout();
    navigate("/", { replace: true });
    navigate(0);
  });

  return null;
};

export default Logout;
