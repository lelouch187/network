import React from 'react';
import {ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg';

const Like = ({color}: any) => {
  return (
    <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <G clipPath="url(#clip0_3856_411)">
        <Path
          d="M22.0999 10.7273C22.0999 8.55829 20.2111 6.79999 17.8812 6.79999C16.1391 6.79999 14.6437 7.78292 13.9999 9.18552C13.3562 7.78292 11.8607 6.79999 10.1187 6.79999C7.7887 6.79999 5.8999 8.55829 5.8999 10.7273C5.8999 17.0288 13.9999 21.2 13.9999 21.2C13.9999 21.2 22.0999 17.0288 22.0999 10.7273Z"
          fill={color}
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_3856_411">
          <Rect
            width="18"
            height="18"
            fill={color}
            transform="translate(5 5)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
export default Like;
