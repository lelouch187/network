import React from 'react';
import {Image} from 'react-native';
import {styled} from 'styled-components/native';
import {Colors} from '../../constant/colors';

type MainHeaderPropsType = {
  isDarkMode: boolean;
  setVisiblePopup: any;
};

const MainHeader = ({isDarkMode, setVisiblePopup}: MainHeaderPropsType) => {
  return (
    <Root isDarkMode={isDarkMode}>
      <Title isDarkMode={isDarkMode}>Hello John!</Title>
      <ImageWrapper
        onTouchStart={e => {
          e.stopPropagation();
          setVisiblePopup((prev: boolean) => !prev);
        }}>
        <Image source={require('../../assets/images/post-image.png')} />
      </ImageWrapper>
    </Root>
  );
};
export default MainHeader;

const Root = styled.View<{isDarkMode: boolean}>`
  padding: 16px 16px 20px 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${props =>
    props.isDarkMode ? Colors.Dark_700 : Colors.Light_100};
`;

const Title = styled.Text<{isDarkMode: boolean}>`
  color: ${props => (props.isDarkMode ? Colors.Dark_100 : Colors.Light_700)};
  font-family: 'Outfit-Medium';
  font-size: 32px;
  font-weight: 500;
`;

const ImageWrapper = styled.View`
  border-radius: 20px;
  width: 40px;
  height: 40px;
  overflow: hidden;
`;
