import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, logIn } = UserAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  return (
    <div className="signin">
      <img
        className="signin-img"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
        alt=""
      />
      <div className="overlay"></div>
      <div className="form-box">
        <div className="form-overlay">
          <div className="overlay-inner-box">
            <h1>Sign In</h1>
            {error ? <p className="error">{error}</p> : null}
            <form onSubmit={handleSubmit}>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                name=""
                id=""
                autoComplete="email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                name=""
                id=""
                autoComplete="current-password"
              />
              <button>Sign In</button>
              <div className="checkbox">
                <p>
                  <input type="checkbox" />
                  Remember me
                </p>
                <p>Need Help?</p>
              </div>
              <p className="sub">
                <span>New to Netflix?</span> <Link to="/signup"> Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
