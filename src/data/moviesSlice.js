import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  ENDPOINT_MOVIE,
  ENDPOINT_SEARCH,
  ENDPOINT_DISCOVER,
  ENDPOINT_STATUS_ERROR,
  ENDPOINT_STATUS_LOADING,
  ENDPOINT_STATUS_SUCCES,
  ENDPOINT_STATUS_NOTFOUND,
  ENDPOINT_STATUS_INITIAL,
} from '../constants';

// This is an async thunk created using `createAsyncThunk` from the `@reduxjs/toolkit` package.
// It is used to fetch movies data from an external API.
// The thunk is named 'fetch-movies' and it takes a `params` object as input.
export const fetchMovies = createAsyncThunk(
  'fetch-movies', // The name of the thunk
  async (params) => {
    // Destructure the `searchQuery` and `page` properties from the `params` object.
    // If `page` is not provided, default  value is set to 1.
    const { searchQuery, page = 1 } = params;

    // Construct the API endpoint URL based on the `searchQuery`.
    // If `searchQuery` is provided, use the search endpoint with the `query` and `page` parameters.
    // Otherwise, use the discover endpoint with the `page` parameter.
    const url = searchQuery ? `${ENDPOINT_SEARCH}&query=${searchQuery}&page=${page}` : `${ENDPOINT_DISCOVER}&page=${page}`;

    // Fetch the data from the API using the constructed URL.
    const response = await fetch(url);

    // Parse the response as JSON and return it.
    return response.json();
  },
);

/**
 * It is used to fetch movie data from the MovieDB API for a single movie given its ID.
 * The thunk is named 'get-movie' and it takes an `id` as input.
 *
 * The function constructs the API endpoint URL by appending the `id` to the `ENDPOINT_MOVIE`
 * constant and adding the `api_key` query parameter using the `REACT_APP_API_KEY` environment variable,
 * and the `append_to_response` query parameter to include the videos for the movie in the response.
 *
 * The returned data includes information about the movie such as its title, release date, overview,
 * runtime, and the videos trailer associated with the movie.
 */
export const getMovie = createAsyncThunk('get-movie', async (id) => {
  const response = await fetch(`${ENDPOINT_MOVIE}${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`);
  return response.json();
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    moviesList: {
      page: 0,
      hasMore: true,
      total_pages: 0,
      total_results: 0,
      results: [],
    },
    fetchStatus: ENDPOINT_STATUS_INITIAL,
    getMovieStatus: ENDPOINT_STATUS_INITIAL,
    movieData: [],
  },
  reducers: {
    // This reducer function is used to clear the movie data stored in the state.
    // It sets the `getMovieStatus` property of the state to the initial value,
    // and sets the `movieData` property of the state to an empty array.
    //
    clearMovieData: (state) => {
      state.getMovieStatus = ENDPOINT_STATUS_INITIAL;
      state.movieData = [];
    },
    /**
     * This reducer function is used to clear the list of movies stored in the state.
     * It sets the `moviesList` property of the state to an object with the following properties:
     * - `page`: The current page number of movies (initially set to 0).
     * - `hasMore`: A boolean indicating whether there are more movies to fetch (initially set to true).
     * - `total_pages`: The total number of pages of movies available (initially set to 0).
     * - `total_results`: The total number of movies available (initially set to 0).
     * - `results`: An empty array to store the movies (initially set to an empty array).
     * It also sets the `fetchStatus` property of the state to the initial value,
     * indicating that there is no ongoing movie fetch operation.
     */
    clearMoviesList: (state) => {
      state.moviesList = {
        page: 0,
        hasMore: true,
        total_pages: 0,
        total_results: 0,
        results: [],
      };
      state.fetchStatus = ENDPOINT_STATUS_INITIAL;
    },
  },
  // The `extraReducers` configuration is used to handle additional actions
  // that are not handled by the reducers defined in the `reducers` configuration.
  // Here, we handle the `fulfilled`, `pending`, and `rejected` actions of the
  // `fetchMovies` and `getMovie` async thunks.
  extraReducers: (builder) => {
    // Handling the actions of the `fetchMovies` async thunk:
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        const { page, total_pages, total_results, results } = action?.payload;
        // Update the page number of movies in the state
        state.moviesList.page = page;
        // Check if there are more pages of movies to fetch
        state.moviesList.hasMore = page + 1 <= total_pages;
        // Update the list of movies in the state
        // If it's the first page of movies, replace the entire list with the new data
        // Otherwise, concat the new data to the existing list
        state.moviesList.results = page === 1 ? results : [...state.moviesList.results, ...results];
        // Update the total number of pages of movies available in the state
        state.moviesList.total_pages = total_pages;
        // Update the total number of movies available in the state
        state.moviesList.total_results = total_results;
        // Update the fetch status in the state
        // If there are movies in the response, set the fetch status to success
        // Otherwise, set the fetch status to not found and show error messages
        state.fetchStatus = results.length > 0 ? ENDPOINT_STATUS_SUCCES : ENDPOINT_STATUS_NOTFOUND;
      })
      .addCase(fetchMovies.pending, (state) => {
        state.fetchStatus = ENDPOINT_STATUS_LOADING;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.fetchStatus = ENDPOINT_STATUS_ERROR;
      })
      // Handling the actions of the `getMovie` async thunk:
      .addCase(getMovie.fulfilled, (state, action) => {
        // Update the movie data in the state
        state.movieData = action?.payload;
        // Update the get movie status in the state to indicate that the movie data is successfully fetched
        state.getMovieStatus = ENDPOINT_STATUS_SUCCES;
      })
      .addCase(getMovie.pending, (state) => {
        state.getMovieStatus = ENDPOINT_STATUS_LOADING;
      })
      .addCase(getMovie.rejected, (state) => {
        state.getMovieStatus = ENDPOINT_STATUS_ERROR;
        state.movieData = [];
      });
  },
});

export const { clearMovieData, clearMoviesList } = moviesSlice.actions;

export default moviesSlice;
