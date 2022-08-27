import React, { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";
import "./SavedShows.css";

const baseUrl = "https://image.tmdb.org/t/p/original/";
function SavedShows() {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

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
  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteShow = async (passedID) => {
    try {
      const result = movies.filter((item) => item.id !== passedID);
      await updateDoc(movieRef, {
        savedShows: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

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
                  className={`saved-poster`}
                  src={` ${baseUrl}${movie?.img}`}
                  alt={movie.name}
                />

                <div className="show-info">
                  {" "}
                  <span>{movie?.title}</span> Rate: {movie.rate.toFixed(1)}{" "}
                  <p className="cancel-icon">
                    <AiOutlineClose onClick={() => deleteShow(movie.id)} />
                  </p>
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
