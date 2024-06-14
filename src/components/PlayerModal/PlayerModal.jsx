import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getMovie, clearMovieData } from '../../data/moviesSlice';
import YouTubePlayer from '../YouTubePlayer/YouTubePlayer';
import Loading from '../Loading/Loading';
import NotFound from '../NotFound/NotFound';
import IconCross from '../Icons/IconCross';
import './PlayerModal.scss';
import {
  ENDPOINT_STATUS_ERROR,
  ENDPOINT_STATUS_LOADING,
  ENDPOINT_STATUS_NOTFOUND,
  ENDPOINT_STATUS_SUCCES,
  VIDEO_TYPE_TRAILER,
} from '../../constants';

// This component is responsible for displaying a modal with a YouTubePlayer component.
// It receives the movie ID from the URL and uses it to fetch movie data from the API.
// Once the data is fetched, it checks if there is a trailer available for the movie.
// If there is a trailer, it sets the video key for the YouTubePlayer component.
// The user can close the modal by clicking the close button or by navigating back.
// The modal also disables scrolling while it is open.
const PlayerModal = () => {
  // Get movie data and status from the Redux store
  const { movieData, getMovieStatus } = useSelector((state) => state.movies);
  // Get movie ID from the URL
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Store the video key for the YouTubePlayer component
  const [videoKey, setVideoKey] = useState(null);

  // Function to handle the video key based on the movie data
  const hanldeVideoKey = () => {
    // Check if the movie data is fetched successfully and there are video results
    if (getMovieStatus === ENDPOINT_STATUS_SUCCES && movieData?.videos?.results?.length > 0) {
      // Find the trailer in the video results
      const trailer = movieData.videos.results.find((vid) => vid.type.toLowerCase() === VIDEO_TYPE_TRAILER);
      // Set the video key to the trailer key if available, otherwise set it to the first video result
      setVideoKey(trailer ? trailer.key : movieData?.videos?.results[0].key);
    }
  };

  const handleClose = () => {
    navigate(-1);
    setVideoKey(null);
    dispatch(clearMovieData());
  };

  // Effect to disable scrolling when the modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'unset');
  }, []);

  // Effect to fetch movie data when the movie ID changes
  useEffect(() => {
    dispatch(getMovie(id));
  }, [id, dispatch]);

  // Effect to handle the video key based on the movie data
  useEffect(() => {
    hanldeVideoKey();
  }, [movieData]);

  return (
    <section className="modalDiv">
      {/* Show a loading spinner if the movie data is still loading */}
      {getMovieStatus === ENDPOINT_STATUS_LOADING ? (
        <Loading />
      ) : (
        <div className="modal">
          {/* Show a not found message if there was an error or the movie data is not available */}
          {getMovieStatus === ENDPOINT_STATUS_ERROR || getMovieStatus === ENDPOINT_STATUS_NOTFOUND || videoKey === null ? (
            <NotFound title="Trailer Not Found" />
          ) : (
            <>
              <IconCross
                fill="#fff"
                onClick={() => handleClose()}
              />

              {/* Show the YouTubePlayer component with the video key */}
              <YouTubePlayer videoKey={videoKey} />
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default PlayerModal;
