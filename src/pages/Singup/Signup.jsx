import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { UserAuth } from "../../context/AuthContext";
import { async } from "@firebase/util";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signUp } = UserAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="signup">
        <img
          className="signup-img"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt=""
        />
        <div className="overlay"></div>
        <div className="form-box">
          <div className="form-overlay">
            <div className="overlay-inner-box">
              <h1>Sign Up</h1>
              <form onSubmit={handleSubmit}>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  name=""
                  id=""
                  autoComplete="email"
                />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  name=""
                  id=""
                  autoComplete="current-password"
                />
                <button>Sign Up</button>
                <div className="checkbox">
                  <p>
                    <input type="checkbox" />
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className="sub">
                  <span>Already subscribed to Netflix?</span>{" "}
                  <Link to="/login"> Sign In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
