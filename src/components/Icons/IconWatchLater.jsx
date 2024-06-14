import React from 'react';
import { ICON_SIZE } from '../../constants';
const IconWatchLater = (props) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={props?.width || ICON_SIZE}
    height={props?.height || ICON_SIZE}
    {...props}
  >
    <path d="M12 7V12L14.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
    <title>Watch Later</title>
  </svg>
);

export default IconWatchLater;
