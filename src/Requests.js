const KEY = process.env.REACT_APP_KEY;

const requests = {
  requestTrending: `/trending/all/week?api_key=${KEY}&language=en-US`,
  requestNetflixOriginals: `/discover/tv?api_key=${KEY}&with_networks=213`,
  requestTopRated: `/movie/top_rated?api_key=${KEY}&language=en-US`,
  requestActionMovies: `/discover/movie?api_key=${KEY}&with_genres=28`,
  requestComedyMovies: `/discover/movie?api_key=${KEY}&with_genres=35`,
  requestHorrorMovies: `/discover/movie?api_key=${KEY}&with_genres=27`,
  requestRomanceMovies: `/discover/movie?api_key=${KEY}&with_genres=10749`,
  requestDocumentaries: `/discover/movie?api_key=${KEY}&with_genres=99`,
};

export default requests;
