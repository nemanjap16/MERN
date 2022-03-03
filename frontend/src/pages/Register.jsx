import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, message, loading, isError, success } = useSelector(
    (state) => state.auth
  );

  const [form, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = form;

  useEffect(() => {
    if (isError) {
      toast.error(registerUser.error);
    }
    if (success) {
      toast.success("You have successfully registered");
      navigate("/");
    }

    dispatch(reset());
  }, [user, message, isError, success, loading, navigate, dispatch]);

  const onChange = (e) => {
    setUser({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const newUser = {
        name,
        email,
        password,
      };
      dispatch(registerUser(newUser));
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Register User</h1>
        <p>Create an account</p>
      </section>
      <section className="form">
        <form onSubmit={(e) => onSubmit(e)}>
          {" "}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={name}
              id="name"
              placeholder="John Doe"
              onChange={(e) => onChange(e)}
            />
          </div>
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
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              name="password2"
              value={password2}
              id="password2"
              placeholder="Confirm Password"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Register
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
