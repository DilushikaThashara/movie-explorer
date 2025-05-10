import axios from 'axios';

const API_KEY = '1cd02a1492457a5b981197c740a5ce0e';  
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

// Trending movies with optional genre 
export const getTrendingMovies = async (genreId = null, page = 1) => {
  try {
    let url = '/trending/movie/week';
    let params = { page };

    // If a genre is selected, use discover endpoint instead
    if (genreId) {
      url = '/discover/movie';
      params = {
        ...params,
        with_genres: genreId,
        sort_by: 'popularity.desc',
      };
    }

    const response = await tmdb.get(url, { params });
    return response.data.results;
  } catch (error) {
    console.error('Failed to fetch trending movies:', error);
    return [];
  }
};

// Search movies with pagination
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await tmdb.get('/search/movie', {
      params: { query, page },
    });
    return response.data.results;
  } catch (error) {
    console.error('Search failed:', error);
    return [];
  }
};

// Fetch genre list
export const getGenres = async () => {
  try {
    const response = await tmdb.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    console.error('Failed to fetch genres:', error);
    return [];
  }
};
