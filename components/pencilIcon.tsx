import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const PencilIcon = (props: { color?: string; size?: number }) => (
  <Svg
    width={props.size || 24}
    height={props.size || 24}
    fill="none"
    stroke={props.color || "currentColor"}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <Path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
    <Path d="m15 5 4 4" />
  </Svg>
);
