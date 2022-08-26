import React from "react";
import SavedShows from "../../components/SavedShows/SavedShow";
import "./Account.css";

function Account() {
  return (
    <>
      <div className="account-main">
        <img
          className="account-img"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt=""
        />
        <div className="overlay"></div>
        <div className="j">
          <h1>My Shows</h1>
        </div>
      </div>
      <SavedShows />
    </>
  );
}

export default Account;
