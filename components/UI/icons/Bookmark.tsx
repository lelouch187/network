import React from 'react';
import {ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg';
import {Colors} from '../../../constant/colors';

const Bookmark = ({color = Colors.Dark_400}: any) => {
  return (
    <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
      <G clip-path="url(#clip0_3856_3335)">
        <Path
          d="M18.0933 3.82241C19.1939 3.95014 20 4.899 20 6.00699V21.5L12.5 17.75L5 21.5V6.00699C5 4.899 5.80608 3.95014 6.90668 3.82241C8.74156 3.60947 10.608 3.5 12.5 3.5C14.392 3.5 16.2584 3.60947 18.0933 3.82241Z"
          fill={color}
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_3856_3335">
          <Rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.5 0.5)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
export default Bookmark;
