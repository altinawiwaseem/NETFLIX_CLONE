import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { UserAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const [show, setShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else setShow(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        if (window.scrollY < 100) {
          setShow(false);
        } else setShow(true);
      });
    };
  });
  return (
    <div className={`navbar ${show && "nav-black"}`}>
      <Link to="/">
        <h1>NETFLIX</h1>
      </Link>
      {user?.email ? (
        <div className="logo-account">
          <div>
            <Link to="/account">
              <img
                className="nav_avatar"
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                alt="Netflix Logo"
              />
            </Link>
          </div>
          <div>
            {" "}
            <button onClick={handleLogout}> Logout </button>
          </div>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button
              style={{
                backgroundColor: "rgba(51, 51, 51, 0.5)",
                border: "none",
                color: "white",
              }}
            >
              Sign In
            </button>
          </Link>

          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
