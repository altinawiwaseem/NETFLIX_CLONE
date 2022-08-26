import React, { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";

const baseUrl = "https://image.tmdb.org/t/p/original/";
function SavedShows() {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth;

  const slideLeft = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);

  return (
    <div>
      <h2>My Shows </h2>
      <div className="row">
        <MdChevronLeft onClick={slideLeft} className="arrow arrow-left" />
        <div className="row-posters" id={"slider"}>
          {movies &&
            movies.map((movie) => (
              <div key={movie.id} className="movie-container">
                <img
                  className={`row-poster }`}
                  src={` ${baseUrl}${movie?.img}`}
                  alt={movie.name}
                />

                <div className="show-info">
                  {" "}
                  <span>
                    {movie?.title || movie?.name || movie?.original_name}
                  </span>{" "}
                  Rate: {movie.vote_average.toFixed(1)}{" "}
                </div>
              </div>
            ))}
        </div>
        <MdChevronRight onClick={slideRight} className="arrow arrow-right" />
      </div>
    </div>
  );
}

export default SavedShows;
