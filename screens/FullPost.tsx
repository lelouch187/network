import React from 'react';
import {ThemeType} from '../types';
import {styled} from 'styled-components/native';
import {Colors} from '../constant/colors';
import {Image, View} from 'react-native';
import ArrowBack from '../components/UI/icons/ArrowBack';
import {useNavigation} from '@react-navigation/native';

const FullPost = ({isDarkMode}: ThemeType) => {
  const navigation = useNavigation();

  return (
    <Root isDarkMode={isDarkMode}>
      <HeaderPost>
        <View onTouchStart={() => navigation.goBack()}>
          <ArrowBack color={isDarkMode ? Colors.Dark_100 : Colors.Light_100} />
        </View>
        <HeaderText isDarkMode={isDarkMode}>Apple love</HeaderText>
      </HeaderPost>
      <PostDate>11.09.22</PostDate>
      <ImageWrapper>
        <Image
          style={{width: '100%'}}
          source={require('../assets/images/post-image.png')}
        />
      </ImageWrapper>
      <PostText isDarkMode={isDarkMode}>
        The Queen of the Carnival in Rio de Janeiro and up to two princesses
        having the duty to woo the revelry, along with the King Momo. Unlike
        some cities, in the city of Rio de Janeiro, Queens of Carnival do not
        see a certain school of samba. In competitions, princesses are usually
        placed as second and third, and are correspondingly 1st and
        2nd Princess. Some of them after the reign become queens or battery
        bridesmaids. Incorporated into every aspect of the Rio carnival are
        dancing and music. The most famous dance is carnival samba, a Brazilian
        dance with African influences. The samba remains a popular dance not
        only in carnival but in the ghettos outside of the main cities.Some
        of them after the reign become queens or battery bridesmaids.
        Incorporated into every aspect of the Rio
      </PostText>
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
export default FullPost;

const Root = styled.View<{isDarkMode: boolean}>`
  padding: 0 16px;
  margin-bottom: 3px;
  width: 100%;
  height: 100%;
  background-color: ${props =>
    props.isDarkMode ? Colors.Dark_600 : Colors.Light_150};
`;

const HeaderPost = styled.View`
  padding: 20px 0px 20px 0px;
  display: flex;
  flex-direction: row;
  justify-content: left;
`;

const HeaderText = styled.Text<{isDarkMode: boolean}>`
  font-family: 'Outfit-SemiBold';
  font-size: 18px;
  margin-left: 35%;
  color: ${props => (props.isDarkMode ? Colors.Dark_100 : Colors.Light_700)};
`;
const PostDate = styled.Text`
  text-align: center;
  margin-bottom: 8px;
`;

const ImageWrapper = styled.View`
  border-radius: 16px;
  height: 226px;
  width: 100%;
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
const PostText = styled.Text<{isDarkMode: boolean}>`
  margin-bottom: 20px;
  font-family: 'Outfit-Regular';
  font-size: 14px;
  color: ${props => (props.isDarkMode ? Colors.Dark_200 : Colors.Light_700)};
`;
