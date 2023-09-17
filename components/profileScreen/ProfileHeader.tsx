import React from 'react';
import {styled} from 'styled-components/native';
import {ThemeType} from '../../types';
import ArrowBack from '../UI/icons/ArrowBack';
import {Colors} from '../../constant/colors';

const ProfileHeader = ({isDarkMode}: ThemeType) => {
  return (
    <Root isDarkMode={isDarkMode}>
      <ArrowBack color={isDarkMode ? Colors.Dark_100 : Colors.Light_100} />
      <Title isDarkMode={isDarkMode}>Profile</Title>
      <HeaderButton isDarkMode={isDarkMode}>Done</HeaderButton>
    </Root>
  );
};
export default ProfileHeader;

const Root = styled.View<{isDarkMode: boolean}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 16px;
`;

const Title = styled.Text<{isDarkMode: boolean}>`
  font-family: 'Outfit-SemiBold';
  font-size: 18px;
  font-weight: 600;
  color: ${props => (props.isDarkMode ? Colors.Dark_100 : Colors.Light_700)};
`;

const HeaderButton = styled.Text<{isDarkMode: boolean}>`
  color: ${props =>
    props.isDarkMode ? Colors.Green_dark : Colors.Green_light};
  font-family: 'Outfit-Medium';
  font-size: 16px;
  font-weight: 500;
  text-decoration: underline;
`;
