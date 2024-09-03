import axios from "axios";

const API_KEY = "9062f1ddb63f12302c3230329940ea8d";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IVideo {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  name: string;
}

export const getNowPlayingMovies = async () => {
  return await axios.get(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`);
};
export const getTopRatedMovies = async () => {
  return await axios.get(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`);
};
export const getUpcomingMovies = async () => {
  return await axios.get(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`);
};
export const getAiringTodaySeries = async () => {
  return await axios.get(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`);
};
export const getPopularSeries = async () => {
  return await axios.get(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`);
};
export const getTopRatedSeries = async () => {
  return await axios.get(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`);
};
export const getMovieDetails = async (movieId: string) => {
  return await axios.get(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}`);
};
export const getSeriesDetails = async (seriesId: string) => {
  return await axios.get(`${BASE_PATH}/tv/${seriesId}?api_key=${API_KEY}`);
};
export const getSearchMulti = async (videoName: string | null) => {
  return await axios.get(
    `${BASE_PATH}/search/multi?api_key=${API_KEY}&query=${videoName}`
  );
};
export const getMovieProviders = async (movieId: string) => {
  return await axios.get(
    `${BASE_PATH}/movie/${movieId}/watch/providers?api_key=${API_KEY}`
  );
};
export const getSeriesProviders = async (seriesId: string) => {
  return await axios.get(
    `${BASE_PATH}/tv/${seriesId}/watch/providers?api_key=${API_KEY}`
  );
};
