import React from 'react';
import {Image} from 'react-native';
import {styled} from 'styled-components/native';
import {Colors} from '../../constant/colors';
import {useQuery} from '@apollo/client';
import {UserMeResponse} from '../../types';
import {USER_ME} from '../../apollo/user';

type MainHeaderPropsType = {
  isDarkMode: boolean;
  setVisiblePopup: any;
  activeTab: number;
};

const MainHeader = ({
  isDarkMode,
  setVisiblePopup,
  activeTab,
}: MainHeaderPropsType) => {
  const {data} = useQuery<UserMeResponse>(USER_ME);

  return (
    <Root isDarkMode={isDarkMode}>
      <Title isDarkMode={isDarkMode}>
        {activeTab === 0
          ? `Hello ${data?.userMe.firstName}!`
          : activeTab === 1
          ? 'Favorites'
          : 'My posts'}
      </Title>
      <ImageWrapper
        onTouchStart={e => {
          e.stopPropagation();
          setVisiblePopup((prev: boolean) => !prev);
        }}>
        <Image
          style={{width: '100%', height: '100%'}}
          source={
            data?.userMe.avatarUrl
              ? {uri: data.userMe.avatarUrl}
              : isDarkMode
              ? require('../../assets/images/dark-profile.png')
              : require('../../assets/images/light-profile.png')
          }
        />
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
