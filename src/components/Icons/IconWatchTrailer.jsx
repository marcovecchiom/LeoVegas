import React from 'react';
import { ICON_SIZE } from '../../constants';

const IconWatchTrailer = (props) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -5 32 32"
    width={props?.width || ICON_SIZE}
    height={props?.height || ICON_SIZE}
    {...props}
  >
    <path d="M31.507,20.862 C31.351,20.954 31.176,21.000 31.000,21.000 C30.833,21.000 30.665,20.958 30.515,20.874 L23.000,16.699 L23.000,20.000 C23.000,21.103 22.102,22.000 21.000,22.000 L2.000,22.000 C0.897,22.000 0.000,21.103 0.000,20.000 L0.000,2.000 C0.000,0.897 0.897,-0.000 2.000,-0.000 L21.000,-0.000 C22.102,-0.000 23.000,0.897 23.000,2.000 L23.000,5.301 L30.515,1.126 C30.822,0.953 31.201,0.958 31.507,1.138 C31.813,1.318 32.000,1.646 32.000,2.000 L32.000,20.000 C32.000,20.354 31.813,20.682 31.507,20.862 ZM30.000,3.700 L22.485,7.874 C22.470,7.883 22.453,7.882 22.437,7.889 C22.376,7.919 22.311,7.933 22.245,7.951 C22.180,7.967 22.117,7.986 22.051,7.990 C22.033,7.991 22.018,8.000 22.000,8.000 C21.954,8.000 21.916,7.980 21.872,7.974 C21.802,7.965 21.736,7.957 21.670,7.933 C21.609,7.912 21.556,7.880 21.500,7.847 C21.446,7.815 21.393,7.785 21.345,7.742 C21.292,7.696 21.252,7.641 21.210,7.584 C21.184,7.549 21.148,7.525 21.126,7.486 C21.117,7.470 21.118,7.452 21.110,7.436 C21.081,7.376 21.067,7.312 21.050,7.246 C21.033,7.181 21.014,7.118 21.010,7.051 C21.009,7.033 21.000,7.018 21.000,7.000 L21.000,2.000 L2.000,2.000 L2.000,20.000 L21.000,20.000 L21.000,15.000 C21.000,14.982 21.009,14.967 21.010,14.949 C21.014,14.883 21.033,14.820 21.050,14.754 C21.067,14.688 21.081,14.624 21.110,14.564 C21.118,14.548 21.117,14.530 21.126,14.514 C21.148,14.475 21.184,14.451 21.210,14.416 C21.252,14.359 21.292,14.305 21.345,14.258 C21.393,14.215 21.445,14.185 21.500,14.153 C21.555,14.120 21.609,14.088 21.670,14.067 C21.736,14.043 21.802,14.035 21.871,14.026 C21.915,14.020 21.954,14.000 22.000,14.000 C22.018,14.000 22.033,14.009 22.051,14.010 C22.117,14.014 22.180,14.033 22.245,14.049 C22.311,14.067 22.376,14.081 22.437,14.110 C22.452,14.118 22.470,14.117 22.485,14.126 L30.000,18.300 L30.000,3.700 Z" />
    <title>Watch Trailer</title>
  </svg>
);

export default IconWatchTrailer;
