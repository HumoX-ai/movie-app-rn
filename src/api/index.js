import { API_KEY } from "../constants";
import { apiReuqest } from "./axios";

const baseURL = "https://api.themoviedb.org/3";

const trendingMovies = `${baseURL}/trending/movie/day?api_key=${API_KEY}`;
const upComingMovies = `${baseURL}/movie/upcoming?api_key=${API_KEY}`;
const topRatedMovies = `${baseURL}/movie/top_rated?api_key=${API_KEY}`;
const popularMovies = `${baseURL}/movie/popular?api_key=${API_KEY}`;
const searchMovie = `${baseURL}/search/movie?api_key=${API_KEY}`;

const movieDetails = (id) => {
  return `${baseURL}/movie/${id}?api_key=${API_KEY}`;
};

const movieCredits = (id) => {
  return `${baseURL}/movie/${id}/credits?api_key=${API_KEY}`;
};

const similarMovies = (id) => {
  return `${baseURL}/movie/${id}/similar?api_key=${API_KEY}`;
};

const personalDetails = (id) => {
  return `${baseURL}/person/${id}?api_key=${API_KEY}`;
};

const personMovies = (id) => {
  return `${baseURL}/person/${id}/movie_credits?api_key=${API_KEY}`;
};

export const fetchTrendingMovies = () => {
  return apiReuqest(trendingMovies);
};

export const fetchUpComingMovies = () => {
  return apiReuqest(upComingMovies);
};

export const fetchTopRatedMovies = () => {
  return apiReuqest(topRatedMovies);
};

export const fetchPopularMovies = () => {
  return apiReuqest(popularMovies);
};

export const fetchMovieDetails = (id) => {
  return apiReuqest(movieDetails(id));
};

export const fetchMovieCredits = (id) => {
  return apiReuqest(movieCredits(id));
};

export const fetchSimilarMovies = (id) => {
  return apiReuqest(similarMovies(id));
};

export const fetchPersonalDetails = (id) => {
  return apiReuqest(personalDetails(id));
};

export const fetchPersonMovies = (id) => {
  return apiReuqest(personMovies(id));
};

export const fetchSearchMovie = (params) => {
  return apiReuqest(searchMovie, params);
};

export const image500 = (posterPath) => {
  return posterPath ? `https://image.tmdb.org/t/p/w500/${posterPath}` : null;
};
export const image342 = (posterPath) => {
  return posterPath ? `https://image.tmdb.org/t/p/w342/${posterPath}` : null;
};
export const image185 = (posterPath) => {
  return posterPath ? `https://image.tmdb.org/t/p/w185/${posterPath}` : null;
};
