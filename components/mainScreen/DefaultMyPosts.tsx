import React from 'react';
import {styled} from 'styled-components/native';
import {Colors} from '../../constant/colors';
import {ThemeType} from '../../types';
import {Image} from 'react-native';

const DefaultMyPosts = ({isDarkMode}: ThemeType) => {
  return (
    <Root isDarkMode={isDarkMode}>
      <ImgWrapper>
        <Image source={require('../../assets/images/default-posts.png')} />
      </ImgWrapper>
      <MainText isDarkMode={isDarkMode}>
        You haven't added anything to your favorites yet
      </MainText>
    </Root>
  );
};
export default DefaultMyPosts;

const Root = styled.View<{isDarkMode: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: ${props =>
    props.isDarkMode ? Colors.Dark_700 : Colors.Light_100};
`;

const ImgWrapper = styled.View``;

const MainText = styled.Text<{isDarkMode: boolean}>`
  margin-top: 24px;
  width: 210px;
  font-family: 'Outfit-Regular';
  font-size: 16px;
  color: ${props => (props.isDarkMode ? Colors.Dark_400 : Colors.Light_700)};
`;
