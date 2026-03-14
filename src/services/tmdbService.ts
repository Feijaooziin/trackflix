import { tmdbApi } from "./tmdbApi";

export interface TMDBMovie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
}

export async function searchMovies(query: string) {
  const url = `${tmdbApi.BASE_URL}/search/movie?api_key=${tmdbApi.API_KEY}&query=${query}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

export async function searchSeries(query: string) {
  const url = `${tmdbApi.BASE_URL}/search/tv?api_key=${tmdbApi.API_KEY}&query=${query}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

export function getPosterUrl(path: string) {
  if (!path) return "";
  return `https://image.tmdb.org/t/p/w500${path}`;
}
