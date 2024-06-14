import React from 'react';
import './Skeleton.scss';

/**
 * Skeleton component is a placeholder component that is used to display
 * a loading state. It is often used to display skeletons of UI elements while
 * data is being fetched.
 *
 * @param {Object} props - The properties passed to the Skeleton component.
 * @returns {JSX.Element} - A div element with the class name "skeleton" and
 *                          the properties passed to the component.
 */
const Skeleton = (props) => {
  return (
    <div
      className="skeleton"
      {...props}
    />
  );
};

export default Skeleton;
