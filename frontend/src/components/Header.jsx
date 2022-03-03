import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(logOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          {" "}
          <FaUser /> Goalsetter{" "}
        </Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={logout}>
              {" "}
              <FaSignOutAlt /> Log Out{" "}
            </button>
          </li>
        ) : (
          <>
            {" "}
            <li>
              <Link to="/login">
                {" "}
                <FaSignInAlt /> Log In{" "}
              </Link>
            </li>
            <li>
              <Link to="/register">
                {" "}
                <FaUser /> Register{" "}
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
