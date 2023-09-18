import React from 'react';
import {Rect, Svg} from 'react-native-svg';

const RadioBtn = ({color}: any) => {
  return (
    <Svg width="20" height="21" viewBox="0 0 20 21" fill={color}>
      <Rect x="0.5" y="1" width="19" height="19" rx="9.5" stroke="#696969" />
    </Svg>
  );
};
export default RadioBtn;
