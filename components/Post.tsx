import React from 'react';
import {styled} from 'styled-components/native';
import {ThemeType} from '../types';
import {Image} from 'react-native';
import {Colors} from '../constant/colors';

const Post = ({isDarkMode}: ThemeType) => {
  return (
    <Root isDarkMode={isDarkMode}>
      <HeaderPost>
        <HeaderText isDarkMode={isDarkMode}>Apple love</HeaderText>
        <PostDate>11.09.22</PostDate>
      </HeaderPost>
      <ImageWrapper>
        <Image
          style={{width: '100%'}}
          source={require('../assets/images/post-image.png')}
        />
      </ImageWrapper>
      <PostBottom>
        <UserInfo>
          <UserImageWrapper>
            <Image
              style={{width: '100%', height: '100%'}}
              source={require('../assets/images/post-image.png')}
            />
          </UserImageWrapper>
          <UserName>Hannah K.</UserName>
        </UserInfo>
        <Social>
          {isDarkMode ? (
            <Image source={require('../assets/images/heart-dark.png')} />
          ) : (
            <Image source={require('../assets/images/heart-light.png')} />
          )}
          <LikesCount>137</LikesCount>
          {isDarkMode ? (
            <Image source={require('../assets/images/share-dark.png')} />
          ) : (
            <Image source={require('../assets/images/share-light.png')} />
          )}
        </Social>
      </PostBottom>
    </Root>
  );
};
export default Post;

const Root = styled.View<{isDarkMode: boolean}>`
  padding: 24px 20px 32px;
  margin-bottom: 3px;
  width: 100%;
  background-color: ${props =>
    props.isDarkMode ? Colors.Dark_600 : Colors.Light_150};
`;

const HeaderPost = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const HeaderText = styled.Text<{isDarkMode: boolean}>`
  font-family: 'Outfit-Medium';
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 12px;
  color: ${props => (props.isDarkMode ? Colors.Dark_100 : Colors.Light_700)};
`;
const PostDate = styled.Text``;
const ImageWrapper = styled.View`
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 20px;
`;
const PostBottom = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const UserInfo = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const UserImageWrapper = styled.View`
  height: 25px;
  width: 25px;
  border-radius: 16px;
  overflow: hidden;
`;
const UserName = styled.Text`
  margin-left: 5px;
  color: ${Colors.Light_300};
  font-family: 'Outfit-Regular';
  font-size: 14px;
  font-weight: 400;
`;
const Social = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const LikesCount = styled.Text`
  color: ${Colors.Light_300};
  font-family: 'Outfit-Regular';
  font-size: 14px;
  font-weight: 400;
  margin: 0 5px 0;
`;
