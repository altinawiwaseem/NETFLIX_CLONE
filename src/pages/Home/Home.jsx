import React from "react";
import Banner from "../../components/Banner/Banner";
import Row from "../../components/Row/Row";
import requests from "../../Requests";
import "./Home.css";

function Home() {
  return (
    <div className="main">
      <Banner />
      <Row
        id="1"
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.requestTrending}
        isLargeRow
      />
      <Row id="2" title="Trending Now" fetchUrl={requests.requestTrending} />
      <Row id="3" title="Top Rated" fetchUrl={requests.requestTopRated} />
      <Row
        id="4"
        title="Action Movies"
        fetchUrl={requests.requestActionMovies}
      />
      <Row
        id="5"
        title="Comedy Movies"
        fetchUrl={requests.requestComedyMovies}
      />
      <Row
        id="6"
        title="Horror Movies"
        fetchUrl={requests.requestHorrorMovies}
      />
      <Row
        id="7"
        title="Romance Movies"
        fetchUrl={requests.requestRomanceMovies}
      />
      <Row
        id="8"
        title="Documentaries"
        fetchUrl={requests.requestDocumentaries}
      />
    </div>
  );
}

export default Home;
