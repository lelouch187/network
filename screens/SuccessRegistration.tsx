import React from 'react';
import {styled} from 'styled-components/native';
import {Colors} from '../constant/colors';
import {useRoute} from '@react-navigation/native';

const SuccessRegistration = () => {
  const {params} = useRoute<any>();
  const isDarkMode = params.isDarkMode;
  return <Root isDarkMode={isDarkMode}>SuccessRegistration</Root>;
};
export default SuccessRegistration;

const Root = styled.View<{isDarkMode: boolean}>`
  height: 100%;
  padding: 0 16px 0;
  background-color: ${props =>
    props.isDarkMode ? Colors.Dark_700 : Colors.Light_100};
`;
