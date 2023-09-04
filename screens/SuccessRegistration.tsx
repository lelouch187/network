import React from 'react';
import {styled} from 'styled-components/native';
import {Colors} from '../constant/colors';
import {useRoute} from '@react-navigation/native';
import {Image} from 'react-native';

const SuccessRegistration = () => {
  const {params} = useRoute<any>();
  const isDarkMode = params.isDarkMode;
  return (
    <Root isDarkMode={isDarkMode}>
      {isDarkMode ? (
        <Image source={require('../assets/images/Congrats-dark.png')} />
      ) : (
        <Image source={require('../assets/images/Congrats-light.png')} />
      )}

      <TextInfo isDarkMode={isDarkMode}>
        <Image source={require('../assets/images/check-circle.png')} />
        You have been registered
      </TextInfo>
      <ButtonWrapper isDarkMode={isDarkMode}>
        <MyButton isDarkMode={isDarkMode} onPress={() => {}}>
          Continue
        </MyButton>
      </ButtonWrapper>
    </Root>
  );
};
export default SuccessRegistration;

const Root = styled.View<{isDarkMode: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 16px 0;
  background-color: ${props =>
    props.isDarkMode ? Colors.Dark_700 : Colors.Light_100};
`;

const TextInfo = styled.Text<{isDarkMode: boolean}>`
  color: ${props => (props.isDarkMode ? Colors.Dark_100 : Colors.Dark_700)};
  font-family: 'Outfit-Regular';
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.48px;
  margin-top: 10px;
`;
const ButtonWrapper = styled.View<{isDarkMode: boolean}>`
  margin-top: 52px;
  width: 100%;
  border-radius: 21px;
  background: ${props =>
    !props.isDarkMode ? Colors.Light_primary_default : Colors.Dark_500};
  overflow: hidden;
  padding: 16px 0;
  display: flex;
  align-items: center;
`;

const MyButton = styled.Text<{isDarkMode: boolean}>`
  color: ${props =>
    !props.isDarkMode ? Colors.Light_100 : Colors.Light_primary_default};
  font-family: 'Outfit-Regular';
  font-size: 16px;
`;
