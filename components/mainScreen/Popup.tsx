import React from 'react';
import {styled} from 'styled-components/native';
import {Colors} from '../../constant/colors';
import {Image} from 'react-native';
import User from '../UI/icons/User';
import Exit from '../UI/icons/Exit';
import Moon from '../UI/icons/Moon';
import Sun from '../UI/icons/Sun';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_ME} from '../../apollo/user';
import {UserMeResponse} from '../../types';
import {useQuery} from '@apollo/client';

type PopupPropsType = {
  visiblePopup: boolean;
  isDarkMode: boolean;
  setIsDarkMode: any;
  setVisiblePopup: any;
};

const Popup = ({
  isDarkMode,
  setIsDarkMode,
  visiblePopup,
  setVisiblePopup,
}: PopupPropsType) => {
  const navigation = useNavigation<any>();

  const {data} = useQuery<UserMeResponse>(USER_ME);

  const onProfile = () => {
    setVisiblePopup(false);
    navigation.navigate('Profile');
  };

  const logout = async () => {
    setVisiblePopup(false);
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };

  return (
    <Root
      onTouchStart={e => e.stopPropagation()}
      visible={visiblePopup}
      isDarkMode={isDarkMode}>
      <ImageWrapper>
        {isDarkMode ? (
          <Image
            source={
              data?.userMe.avatarUrl
                ? {
                    uri: data?.userMe.avatarUrl,
                  }
                : require('../../assets/images/dark-profile.png')
            }
            style={{width: '100%', height: '100%'}}
          />
        ) : (
          <Image
            source={
              data?.userMe.avatarUrl
                ? {
                    uri: data?.userMe.avatarUrl,
                  }
                : require('../../assets/images/light-profile.png')
            }
            style={{width: '100%', height: '100%'}}
          />
        )}
      </ImageWrapper>
      <Title isDarkMode={isDarkMode}>Hello {data?.userMe.firstName}!</Title>
      <LinksWrapper>
        <Item onTouchStart={onProfile}>
          <User color={isDarkMode ? Colors.Dark_100 : Colors.Light_700} />
          <TextLink isDarkMode={isDarkMode}>Profile</TextLink>
        </Item>
        <Item onTouchStart={logout}>
          <Exit color={isDarkMode ? Colors.Dark_100 : Colors.Light_700} />
          <TextLink isDarkMode={isDarkMode}>Exit</TextLink>
        </Item>
      </LinksWrapper>
      <ThemeMode
        onTouchStart={e => {
          e.stopPropagation();
          setIsDarkMode((prev: boolean) => !prev);
        }}>
        {isDarkMode ? <Moon /> : <Sun />}
        <ThemeText isDarkMode={isDarkMode}>
          {isDarkMode ? 'Night theme' : 'Light theme'}
        </ThemeText>
      </ThemeMode>
    </Root>
  );
};
export default Popup;

const Root = styled.View<{isDarkMode: boolean; visible: boolean}>`
  padding: 80px 32px 40px;
  flex: 1;
  position: absolute;
  left: ${props => (props.visible ? '0' : '-400px')};
  top: 0;
  bottom: 0;
  width: 75%;
  background-color: ${props =>
    props.isDarkMode ? Colors.Dark_700 : Colors.Light_100};
`;

const Title = styled.Text<{isDarkMode: boolean}>`
  color: ${props => (props.isDarkMode ? Colors.Dark_100 : Colors.Light_700)};
  font-family: 'Outfit-SemoBold';
  font-size: 20px;
  font-weight: 600;
  margin-top: 12px;
  margin-bottom: 60px;
`;

const ImageWrapper = styled.View`
  border-radius: 16px;
  overflow: hidden;
  height: 80px;
  width: 80px;
`;

const LinksWrapper = styled.View``;

const Item = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 32px;
`;

const TextLink = styled.Text<{isDarkMode: boolean}>`
  margin-left: 8px;
  color: ${props => (props.isDarkMode ? Colors.Dark_100 : Colors.Light_700)};
  font-family: 'Outfit-Regular';
  font-size: 18px;
  font-weight: 400;
`;

const ThemeMode = styled.View`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 40px;
  left: 32px;
`;

const ThemeText = styled.Text<{isDarkMode: boolean}>`
  margin-left: 8px;
  color: ${props => (props.isDarkMode ? Colors.Dark_100 : Colors.Light_700)};
  font-family: 'Outfit-Regular';
  font-size: 18px;
  font-weight: 400;
`;
