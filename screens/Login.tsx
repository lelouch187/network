import {useRoute} from '@react-navigation/native';
import React from 'react';
import {styled} from 'styled-components/native';
import {Colors} from '../constant/colors';
import FormLogin from '../components/FormLogin';

const Login = () => {
  const {params} = useRoute<any>();
  const isDarkMode = params.isDarkMode;

  return (
    <Root isDarkMode={isDarkMode}>
      <Title isDarkMode={isDarkMode}>Log in</Title>
      <SubTitle isDarkMode={isDarkMode}>
        You will be able to fully communicate
      </SubTitle>
      <FormLogin isDarkMode={isDarkMode} />
    </Root>
  );
};

export default Login;

const Root = styled.View<{isDarkMode: boolean}>`
  height: 100%;
  padding: 0 16px 0;
  background-color: ${props =>
    props.isDarkMode ? Colors.Dark_700 : Colors.Light_100};
`;

const Title = styled.Text<{isDarkMode: boolean}>`
  color: ${props =>
    props.isDarkMode
      ? Colors.Dark_primary_default
      : Colors.Light_primary_default};
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
