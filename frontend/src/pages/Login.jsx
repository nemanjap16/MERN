import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, message, loading, isError, success } = useSelector(
    (state) => state.auth
  );

  const [form, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  useEffect(() => {
    if (isError) {
      toast.error(loginUser.error);
    }
    if (success) {
      toast.success("You have successfully logged in");
      navigate("/");
    }

    dispatch(reset());
  }, [user, message, isError, success, loading, navigate, dispatch]);

  const onChange = (e) => {
    setUser({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(loginUser(userData));
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Login User</h1>
        <p>Log In</p>
      </section>
      <section className="form">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              id="email"
              placeholder="example@gmail.com"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              id="password"
              placeholder="Password"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Login
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
