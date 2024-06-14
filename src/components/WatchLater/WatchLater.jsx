import { useSelector, useDispatch } from 'react-redux';
import NotFound from '../NotFound/NotFound';
import watchLaterSlice from '../../data/watchLaterSlice';
import Movie from '../Movie/Movie';
import IconWatchLater from '../Icons/IconWatchLater';
import Button from '../Button/Button';

const WatchLater = ({ viewTrailer }) => {
  const { watchLater } = useSelector((state) => state);
  const { remveAllWatchLater } = watchLaterSlice.actions;
  const dispatch = useDispatch();

  const movies = watchLater?.watchLaterMovies || [];

  return (
    <section
      className="watchLater"
      data-testid="watch-later-div"
    >
      {movies.length > 0 ? (
        <>
          <div className="titleContainer">
            <IconWatchLater
              fill="transparent"
              stroke="#fff"
            />
            <h4 className="header">Watch Later List</h4>
          </div>
          <div className="moviesGrid">
            {movies.map((movie) => (
              <Movie
                movie={movie}
                key={movie.id}
                viewTrailer={viewTrailer}
              />
            ))}
          </div>
          <div className="text-center">
            <Button
              className="btn btn-primary"
              onClick={() => dispatch(remveAllWatchLater())}
            >
              Empty list
            </Button>
          </div>
        </>
      ) : (
        <NotFound
          title="You have no movies saved to watch later."
          link="/"
          linkText="Go to Home"
          icon
        />
      )}
    </section>
  );
};

export default WatchLater;
