import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Movie from '../Movie/Movie';
import Loading from '../Loading/Loading';
import NotFound from '../NotFound/NotFound';
import { fetchMovies } from '../../data/moviesSlice';
import { useDebounce } from '../../hooks/useDebounce';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import {
  ENDPOINT_STATUS_ERROR,
  ENDPOINT_STATUS_INITIAL,
  ENDPOINT_STATUS_LOADING,
  ENDPOINT_STATUS_NOTFOUND,
  ENDPOINT_STATUS_SUCCES,
} from '../../constants';

// This component renders a list of movies based on user search input or discover movies.
const Movies = () => {
  // Get the current state of the moviesReducer from the Redux store.
  const { moviesList, fetchStatus } = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  // Get the search query from the URL parameters.
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  // Use the useDebounce hook to debounce the search input.
  const debouncedValue = useDebounce(searchQuery, 1500);
  // Use the useIntersectionObserver hook to detect when the user has scrolled to the bottom of the page.
  const targetRef = useRef(null);
  const inViewport = useIntersectionObserver(targetRef, { threshold: 1 });

  // When the user types into the search input, dispatch a fetchMovies action with the debounced search query.
  // Also, scroll the page to the top.
  useEffect(() => {
    // If the search input is not empty, dispatch a fetchMovies action with the debounced search query and scroll to the top.
    if (debouncedValue !== '') {
      dispatch(fetchMovies({ searchQuery: debouncedValue }));
      window.scrollTo(0, 0);
    }
  }, [debouncedValue, dispatch]);

  // When the user scrolls to the bottom of the page, dispatch a fetchMovies action, the next page number. Also dispatch a fetchMovies action with the debounced search query if is not empty.
  useEffect(() => {
    if (
      inViewport &&
      fetchStatus === ENDPOINT_STATUS_SUCCES &&
      fetchStatus !== ENDPOINT_STATUS_LOADING &&
      moviesList?.hasMore &&
      moviesList?.results?.length > 0
    ) {
      dispatch(fetchMovies({ searchQuery: debouncedValue, page: moviesList?.page + 1 }));
    }
  }, [inViewport, dispatch]);

  // Render the movies list.
  return (
    <section
      data-testid="movies"
      className="movies"
    >
      {fetchStatus === ENDPOINT_STATUS_INITIAL ? (
        // If the movies data is initially stated, render a loading message.
        <Loading />
      ) : fetchStatus === ENDPOINT_STATUS_ERROR || fetchStatus === ENDPOINT_STATUS_NOTFOUND ? (
        // If the movies data fetch failed, render a not found message.
        <NotFound icon />
      ) : (
        <>
          <div className="moviesGrid">
            {moviesList?.results.map((movie, index) => (
              // Render a Movie component for each movie in the moviesList.
              <Movie
                movie={movie}
                key={`${movie.id}-${index}`}
              />
            ))}
          </div>
        </>
      )}
      {/* Render a ref that detects when the user has scrolled to the bottom of the page. */}
      <div
        ref={targetRef}
        data-testid="infinite-scroll"
        className="infinite-scroll"
      />
    </section>
  );
};

export default Movies;
