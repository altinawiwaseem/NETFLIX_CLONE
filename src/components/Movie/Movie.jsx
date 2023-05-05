import React, { useState } from "react";
import "./Movie.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseUrl = "https://image.tmdb.org/t/p/original/";
function Movie({ movie, isLargeRow }) {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");

  const { user } = UserAuth();

  const movieID = doc(db, "users", `${user?.email}`);
  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: movie.id,
          title: movie?.title || movie?.name || movie?.original_name,
          img: movie?.poster_path,
          rate: movie?.vote_average,
        }),
      });
    } else {
      alert("Please log in to save a movie");
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div key={movie.id} className="movie-container">
      <img
        className={`row-poster ${isLargeRow && "row-posterLarge "}`}
        src={` ${baseUrl}${
          isLargeRow ? movie?.poster_path : movie?.backdrop_path
        }`}
        alt={movie.name}
      />
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
      <div className="show-info" onClick={handleClick}>
        {" "}
        <span>
          {movie?.title || movie?.name || movie?.original_name}
        </span> Rate: {movie.vote_average.toFixed(1)}{" "}
        <span onClick={saveShow}>
          {like && saved ? (
            <FaHeart className="like" />
          ) : (
            <FaRegHeart className="like" />
          )}
        </span>
      </div>
    </div>
  );
}

export default Movie;
