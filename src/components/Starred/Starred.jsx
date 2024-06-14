import { useSelector, useDispatch } from 'react-redux';
import starredSlice from '../../data/starredSlice';
import Movie from '../Movie/Movie';
import Button from '../Button/Button';
import NotFound from '../NotFound/NotFound';
import IconStar from '../Icons/IconStar';

const Starred = ({ viewTrailer }) => {
  const { starred } = useSelector((state) => state);
  const { clearAllStarred } = starredSlice.actions;
  const dispatch = useDispatch();

  const movies = starred?.starredMovies || [];

  return (
    <section
      className="starred"
      data-testid="starred"
    >
      {movies.length > 0 ? (
        <>
          <div className="titleContainer">
            <IconStar
              fill="transparent"
              stroke="#fff"
              width="2rem"
              height="2rem"
            />
            <h4 className="header">Starred movies</h4>
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
              onClick={() => dispatch(clearAllStarred())}
            >
              Remove all starred
            </Button>
          </div>
        </>
      ) : (
        <NotFound
          title="There are no starred movies."
          link="/"
          linkText="Go to Home"
          icon
        />
      )}
    </section>
  );
};

export default Starred;
