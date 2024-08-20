import axios from "axios";

const API_KEY = "9062f1ddb63f12302c3230329940ea8d";
const BASE_PATH = "https://api.themoviedb.org/3";

export const getMovies = async () => {
  return await axios.get(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`);
};
