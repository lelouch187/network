import React from 'react';
import {ThemeType} from '../types';
import {styled} from 'styled-components/native';
import ProfileHeader from '../components/profileScreen/ProfileHeader';
import {Colors} from '../constant/colors';
import {Image} from 'react-native';

const Profile = ({isDarkMode}: ThemeType) => {
  return (
    <Root isDarkMode={isDarkMode}>
      <ProfileHeader isDarkMode={isDarkMode} />
      <PhotoWrapper>
        {isDarkMode ? (
          <Image source={require('../assets/images/dark-profile.png')} />
        ) : (
          <Image source={require('../assets/images/light-profile.png')} />
        )}
        <BtnPhotoWrapper>
          {isDarkMode ? (
            <Image source={require('../assets/images/dark-btn-photo.png')} />
          ) : (
            <Image source={require('../assets/images/light-btn-photo.png')} />
          )}
        </BtnPhotoWrapper>
      </PhotoWrapper>
    </Root>
  );
};
export default Profile;

const Root = styled.View<{isDarkMode: boolean}>`
  background-color: ${props =>
    props.isDarkMode ? Colors.Dark_700 : Colors.Light_100};
  height: 100%;
`;

const PhotoWrapper = styled.View`
  display: flex;
  align-items: center;
  margin-top: 12px;
  position: relative;
`;

const BtnPhotoWrapper = styled.View`
  position: absolute;
  right: 30%;
  bottom: 5%;
`;
