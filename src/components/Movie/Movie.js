import React, { useState } from "react";
import "./Movie.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

const baseUrl = "https://image.tmdb.org/t/p/original/";
function Movie({ movie, isLargeRow }) {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();
  const movieID = doc(db, "users", `${user?.email}`);
  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: movie.id,
          title: movie.title,
          img: movie.backdrop_path,
        }),
      });
    } else {
      alert("Please log in to save a movie");
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

      <div className="show-info">
        {" "}
        <span>
          {movie?.title || movie?.name || movie?.original_name}
        </span> Rate: {movie.vote_average.toFixed(1)}{" "}
        <span onClick={saveShow}>
          {like ? (
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
