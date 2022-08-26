/* import axios from "axios"; */
import instance from "../../fetch";
import { useState, useEffect } from "react";
import requests from "../../Requests";
import "./Banner.css";

function Main() {
  const baseUrl = "https://image.tmdb.org/t/p/";

  const [movies, setMovies] = useState([]);
  const movie = movies[Math.floor(Math.random() * movies.length - 1)];

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await instance.get(requests.requestTopRated);
        setMovies(request.data.results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  function truncate(str, number) {
    const result =
      str?.length > number ? str.slice(0, number - 1) + "..." : str;
    return result;
  }

  return (
    <div className="banner">
      <div className="banner-container">
        <img
          src={`${baseUrl}/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        {/* title */}
        <div className="banner-contents">
          <h1 className="banner-title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>

          {/* div > 2 buttons */}
          <div className="banner-buttons">
            <button className="banner-button">Play</button>
            <button className="banner-button">My List</button>
          </div>
          {/* description */}
          <h1 className="banner-description">
            {truncate(movie?.overview, 150)}
          </h1>
        </div>
        <div className="gradient" />
      </div>
    </div>
  );
}

export default Main;
