import axios from "axios";

const API_KEY = "9062f1ddb63f12302c3230329940ea8d";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
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
}

export const getNowPlayingMovies = async () => {
  return await axios.get(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`);
};
export const getAiringTodaySeries = async () => {
  return await axios.get(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`);
};
