import { NavLink, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IconHome from '../Icons/IconHome';
import IconStar from '../Icons/IconStar';
import IconWatchLater from '../Icons/IconWatchLater';
import './header.scss';

/**
 * This component renders the header of the application.
 * It contains a logo, navigation links to starred and watch later pages,
 * and a search input field.
 */
const Header = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { starredMovies } = useSelector((state) => state.starred);
  const { watchLaterMovies } = useSelector((state) => state.watchLater);
  const searchQuery = searchParams.get('search') || '';

  /**
   * This function handles the change event of the search input field.
   * It updates the searchParams object with the new search query and navigates to the search page.
   * @param {Object} e - The event object of the change event.
   */
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchParams(value ? { search: value } : {});
    navigate(value ? '/?search=' + value : '/', { replace: true });
  };

  return (
    <header>
      <div className="header-container">
        <div className="logo-container">
          <Link
            to="/"
            data-testid="home"
            className={'home'}
          >
            <IconHome fill="#fff" />
          </Link>
        </div>

        <div className="nav-container">
          <nav>
            <NavLink
              to="/starred"
              data-testid="nav-starred"
            >
              <IconStar
                stroke="#fff"
                fill={`${starredMovies?.length > 0 ? '#fff' : 'transparent'}`}
              />
              {starredMovies?.length > 0 && <sup className="star-number">{starredMovies.length}</sup>}
            </NavLink>
            <NavLink
              to="/watch-later"
              data-testid="nav-watch-later"
            >
              <IconWatchLater
                stroke="#fff"
                fill={`${watchLaterMovies?.length > 0 ? '#fff' : 'transparent'}`}
              />
            </NavLink>
          </nav>

          <div className="search-group rounded">
            <search>
              <input
                id="search"
                type="search"
                data-testid="search-movies"
                onChange={handleChange}
                className="form-control rounded"
                placeholder="Search movies..."
                aria-label="Search movies"
                aria-describedby="search-addon"
                value={searchQuery}
              />
            </search>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
