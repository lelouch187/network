import React from 'react';
import styled from 'styled-components/native';
import {Colors} from '../constant/colors';
import FormRegistration from '../components/FormRegistration';
import {ThemeType} from '../types';

const Registration = ({isDarkMode}: ThemeType) => {
  return (
    <Root isDarkMode={isDarkMode}>
      <Title>Join us</Title>
      <SubTitle isDarkMode={isDarkMode}>
        You will be able to fully communicate
      </SubTitle>
      <FormRegistration isDarkMode={isDarkMode} />
    </Root>
  );
};
export default Registration;

const Root = styled.View<{isDarkMode: boolean}>`
  height: 100%;
  padding: 0 16px 0;
  background-color: ${props =>
    props.isDarkMode ? Colors.Dark_700 : Colors.Light_100};
`;

const Title = styled.Text`
  color: ${Colors.Dark_primary_default};
  font-family: 'Outfit-Regular';
  font-size: 32px;
  font-weight: 400;
  margin-top: 180px;
`;

const SubTitle = styled.Text<{isDarkMode: boolean}>`
  color: ${props => (props.isDarkMode ? Colors.Dark_100 : Colors.Dark_700)};
  font-family: 'Outfit-Regular';
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.48px;
`;
