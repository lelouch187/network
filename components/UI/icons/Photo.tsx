import React from 'react';
import {ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg';
import {Colors} from '../../../constant/colors';

const Photo = ({color = Colors.Dark_400}: any) => {
  return (
    <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
      <G clip-path="url(#clip0_81_3147)">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2 6.5C2 5.25736 3.00736 4.25 4.25 4.25H20.75C21.9926 4.25 23 5.25736 23 6.5V18.5C23 19.7426 21.9926 20.75 20.75 20.75H4.25C3.00736 20.75 2 19.7426 2 18.5V6.5ZM3.5 16.5607V18.5C3.5 18.9142 3.83579 19.25 4.25 19.25H20.75C21.1642 19.25 21.5 18.9142 21.5 18.5V16.5607L18.8107 13.8713C18.2249 13.2855 17.2751 13.2855 16.6893 13.8713L15.8107 14.75L16.7803 15.7197C17.0732 16.0126 17.0732 16.4874 16.7803 16.7803C16.4874 17.0732 16.0126 17.0732 15.7197 16.7803L10.5607 11.6213C9.97487 11.0355 9.02513 11.0355 8.43934 11.6213L3.5 16.5607ZM13.625 8.75C13.625 8.12868 14.1287 7.625 14.75 7.625C15.3713 7.625 15.875 8.12868 15.875 8.75C15.875 9.37132 15.3713 9.875 14.75 9.875C14.1287 9.875 13.625 9.37132 13.625 8.75Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_81_3147">
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
export default Photo;
