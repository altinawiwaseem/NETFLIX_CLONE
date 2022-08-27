import React, { useState, useEffect } from "react";
import instance from "../../fetch";
import "./Row.css";
import Movie from "../Movie/Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function Row({ title, fetchUrl, isLargeRow, id }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await instance.get(fetchUrl);
        setMovies(request.data.results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [fetchUrl]);
  const slideLeft = () => {
    const slider = document.getElementById("slider" + id);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    const slider = document.getElementById("slider" + id);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <h2>{title} </h2>
      <div className="row">
        <MdChevronLeft onClick={slideLeft} className="arrow arrow-left" />
        <div className="row-posters" id={"slider" + id}>
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} isLargeRow={isLargeRow} />
          ))}
        </div>
        <MdChevronRight onClick={slideRight} className="arrow arrow-right" />
      </div>
    </>
  );
}

export default Row;
