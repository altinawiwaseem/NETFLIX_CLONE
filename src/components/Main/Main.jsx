import axios from "axios";
import { useState, useEffect } from "react";
import requests from "../../Requests";
import "./Main.css";

function Main() {
  const baseUrl = "https://image.tmdb.org/t/p/";

  const [movies, setMovies] = useState([]);
  const movie = movies[Math.floor(Math.random() * movies.length - 1)];

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  console.log(movie);

  return (
    <div className="banner">
      <img
        src={`${baseUrl}/original/${movie?.backdrop_path}`}
        alt={movie?.title}
      />
    </div>
  );
}

export default Main;
