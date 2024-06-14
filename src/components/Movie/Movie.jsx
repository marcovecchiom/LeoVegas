import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import starredSlice from '../../data/starredSlice';
import watchLaterSlice from '../../data/watchLaterSlice';
import placeholder from '../../assets/not-found-500X750.jpeg';
import './Movie.scss';

// Components ans icons
import Skeleton from '../Skeleton/Skeleton';
import IconStar from '../Icons/IconStar';
import IconWatchLater from '../Icons/IconWatchLater';
import IconWatchTrailer from '../Icons/IconWatchTrailer';

// This component renders a movie item in a grid
const Movie = ({ movie, viewTrailer }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  // Get the starred and watchLater objects from the Redux store.
  const { starred, watchLater } = useSelector((state) => state);
  // Get the action creators for adding/removing movies from the starred and watchLater lists.
  const { starMovie, unstarMovie } = starredSlice.actions;
  const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions;
  // Keep track of whether the movie's poster image has finished loading.
  const [loadedImg, setLoadedImg] = useState(false);

  // Function to handle when the movie's poster image has finished loading.
  const handleOnLoad = () => {
    setLoadedImg(true);
  };

  return (
    <div className="wrapper">
      <div className="card">
        <div className="card-body text-center">
          <div className="overlay" />
          <div className="info_panel">
            <h6 className="title">{movie.title}</h6>
            <div className="overview">{movie.overview}</div>
            {/* Controls for the movie: star it, watch later, and watch trailer */}
            <div className="panelFooter">
              <div className="year">{movie.release_date?.substring(0, 4)}</div>
              <div className="controls">
                {!starred?.starredMovies.map((movie) => movie.id).includes(movie.id) ? (
                  <IconStar
                    data-testid="starred-link"
                    stroke="#fff"
                    fill="transparent"
                    onClick={() =>
                      dispatch(
                        starMovie({
                          id: movie.id,
                          overview: movie.overview,
                          release_date: movie.release_date?.substring(0, 4),
                          poster_path: movie.poster_path,
                          title: movie.title,
                        }),
                      )
                    }
                  />
                ) : (
                  <IconStar
                    data-testid="unstar-link"
                    fill="#fff"
                    onClick={() => dispatch(unstarMovie(movie))}
                  />
                )}

                {!watchLater?.watchLaterMovies.map((movie) => movie.id).includes(movie.id) ? (
                  <IconWatchLater
                    data-testid="watch-later"
                    stroke="#fff"
                    fill="transparent"
                    onClick={() =>
                      dispatch(
                        addToWatchLater({
                          id: movie.id,
                          overview: movie.overview,
                          release_date: movie.release_date?.substring(0, 4),
                          poster_path: movie.poster_path,
                          title: movie.title,
                        }),
                      )
                    }
                  />
                ) : (
                  <IconWatchLater
                    data-testid="watch-later"
                    fill="#fff"
                    stroke="#000"
                    onClick={() => dispatch(removeFromWatchLater(movie))}
                  />
                )}

                {/* Watch the movie trailer */}
                {/* Create a link to the movie modal */}
                <Link
                  to={`/modal/${movie.id}`}
                  state={{ background: location }}
                >
                  <IconWatchTrailer
                    fill="#ffF"
                    data-testid="watch-trailer"
                  />
                </Link>
              </div>
            </div>
          </div>
          {/* Movie poster image */}
          <div className="poster">
            <img
              // Set the source of the image to the movie's poster path, or a placeholder image if the poster path is undefined.
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : placeholder}
              alt="Movie poster"
              loading="lazy"
              // When the image has finished loading, call the handleOnLoad function.
              onLoad={handleOnLoad}
            />
            {/* Skeleton loading animation to display while the image is loading */}
            <Skeleton style={{ display: loadedImg ? 'none' : 'block' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
