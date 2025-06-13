import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface TabBarIconProps {
  color: string;
  size?: number;
}

export const QuestionIcon = ({ color, size = 24 }: TabBarIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 343 60" fill="none">
    <Path
      d="M35.8333 37.5017H31.1667L25.975 40.955C25.205 41.4683 24.1667 40.9201 24.1667 39.9867V37.5017C20.6667 37.5017 18.3333 35.1684 18.3333 31.6684V24.6683C18.3333 21.1683 20.6667 18.835 24.1667 18.835H35.8333C39.3333 18.835 41.6667 21.1683 41.6667 24.6683V31.6684C41.6667 35.1684 39.3333 37.5017 35.8333 37.5017Z"
      stroke={color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M30 29.2533V29.0084C30 28.215 30.49 27.795 30.98 27.4567C31.4584 27.13 31.9366 26.71 31.9366 25.94C31.9366 24.8667 31.0733 24.0033 30 24.0033C28.9267 24.0033 28.0634 24.8667 28.0634 25.94"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M29.9948 32.0417H30.0053"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ChatIcon = ({ color, size = 24 }: TabBarIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 343 60" fill="none">
    <Path
      d="M119.667 38.1667C115 38.1667 112.667 37 112.667 31.1667V25.3333C112.667 20.6667 115 18.3333 119.667 18.3333H129C133.667 18.3333 136 20.6667 136 25.3333V31.1667C136 35.8333 133.667 38.1667 129 38.1667H128.417C128.055 38.1667 127.705 38.3417 127.483 38.6333L125.733 40.9667C124.963 41.9933 123.703 41.9933 122.933 40.9667L121.183 38.6333C120.997 38.3767 120.565 38.1667 120.25 38.1667H119.667Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M118.5 25.3333H130.167"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M118.5 31.1667H125.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const NotificationIcon = ({ color, size = 24 }: TabBarIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 343 60" fill="none">
    <Path
      d="M211.69 26.3949V29.7666C211.69 30.4782 211.387 31.5632 211.025 32.1699L209.683 34.3982C208.855 35.7749 209.427 37.3032 210.943 37.8166C215.972 39.4966 221.397 39.4966 226.425 37.8166C227.837 37.3499 228.455 35.6816 227.685 34.3982L226.343 32.1699C225.993 31.5632 225.69 30.4782 225.69 29.7666V26.3949C225.69 22.5449 222.54 19.3949 218.69 19.3949C214.828 19.3949 211.69 22.5332 211.69 26.3949Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <Path
      d="M219.728 19.4999C218.608 19.3599 217.535 19.4416 216.532 19.7333C216.87 18.8699 217.71 18.2633 218.69 18.2633C219.67 18.2633 220.51 18.8699 220.848 19.7333C220.487 19.6283 220.113 19.5466 219.728 19.4999Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M222.19 38.2367C222.19 40.1617 220.615 41.7367 218.69 41.7367C217.733 41.7367 216.847 41.3401 216.217 40.7101C215.587 40.0801 215.19 39.1934 215.19 38.2367"
      stroke={color}
      strokeWidth="1.5"
    />
  </Svg>
);

export const ProfileIcon = ({ color, size = 24 }: TabBarIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 343 60" fill="none">
    <Path
      d="M312.86 30.91C310.807 30.84 309.173 29.16 309.173 27.095C309.173 24.9833 310.877 23.2683 313 23.2683C315.112 23.2683 316.827 24.9833 316.827 27.095C316.815 29.16 315.193 30.84 313.14 30.91C313.058 30.8983 312.953 30.8983 312.86 30.91Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M313 41.6667C309.967 41.6667 307.213 40.5117 305.137 38.6101C305.253 37.5134 305.953 36.4401 307.202 35.6001C310.398 33.4767 315.625 33.4767 318.798 35.6001C320.047 36.4401 320.747 37.5134 320.863 38.6101C318.787 40.5117 316.033 41.6667 313 41.6667Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M313 41.6667C306.557 41.6667 301.333 36.4433 301.333 30C301.333 23.5567 306.557 18.3333 313 18.3333C319.443 18.3333 324.667 23.5567 324.667 30C324.667 36.4433 319.443 41.6667 313 41.6667Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
); 