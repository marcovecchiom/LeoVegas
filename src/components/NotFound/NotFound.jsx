import React from 'react';
import { Link } from 'react-router-dom';
import IconMovieNotFound from '../Icons/IconMovieNotFound';
import './notFound.scss';
import Button from '../Button/Button';

/**
 * The NotFound component is used to display a message when a movie is not found.
 * It accepts the following props:
 * - title: The title of the error message. Defaults to 'Movie not found'.
 * - link: The URL to navigate to when the user clicks the link. Defaults to '/'.
 * - linkText: The text to display in the link. Defaults to 'Go back to Home'.
 * - icon: A boolean indicating whether to display an icon or not. Defaults to false.
 *
 * @param {Object} props - The props object containing the above properties.
 * @returns {JSX.Element} - The JSX code for the NotFound component.
 */
const NotFound = ({ title = 'Movie not found', link = '/', linkText = 'Go back to Home', icon }) => {
  return (
    <section className="notFound">
      {icon && (
        <IconMovieNotFound
          fill="#fff"
          stroke="transparent"
          width="7rem"
          height="7rem"
        />
      )}
      <h4 className="header">{title}</h4>
      {link && (
        <Link to={link}>
          <Button className="btn btn-primary">{linkText}</Button>
        </Link>
      )}
    </section>
  );
};

export default NotFound;
