import React from 'react';
import { ICON_SIZE } from '../../constants';
const IconHome = (props) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width={props?.width || ICON_SIZE}
    height={props?.height || ICON_SIZE}
    {...props}
  >
    <path d="M0,0v512h512V0H0z M63.9,490.7H21.3v-42.7h42.7V490.7z M63.9,405.4H21.3v-42.7h42.7V405.4z M63.9,320H21.3v-42.7h42.7V320z   M63.9,234.7H21.3V192h42.7V234.7z M63.9,149.3H21.3v-42.7h42.7V149.3z M63.9,63.9H21.3V21.3h42.7V63.9z M426.7,469.4H85.3V277.3  h341.4V469.4z M426.7,234.7H85.3V42.6h341.4V234.7z M490.7,490.7h-42.7v-42.7h42.7V490.7z M490.7,405.4h-42.7v-42.7h42.7V405.4z   M490.7,320h-42.7v-42.7h42.7V320z M490.7,234.7h-42.7V192h42.7V234.7z M490.7,149.3h-42.7v-42.7h42.7V149.3z M490.7,63.9h-42.7  V21.3h42.7V63.9z" />
    <title>Movie Land Home</title>
  </svg>
);

export default IconHome;
