import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Button, Text, View} from 'react-native';
import styled from 'styled-components/native';
import {Colors} from '../constant/colors';
import {ThemeType} from '../types';
import {useNavigation} from '@react-navigation/native';

const FormRegistration = ({isDarkMode}: ThemeType) => {
  const navigation = useNavigation<any>();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const onSubmit = (data: any) => console.log(data);

  return (
    <Root>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <InputTitle errors={errors}>E-mail</InputTitle>
            <MyInput
              placeholderTextColor={Colors.Dark_400}
              isDarkMode={isDarkMode}
              placeholder="Enter your e-mail"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </>
        )}
        name="email"
      />
      {errors.email && <Text>Enter correct e-mail</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <MyInput
            placeholderTextColor={Colors.Dark_400}
            isDarkMode={isDarkMode}
            placeholder="Enter your password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
      {errors.password && (
        <Text>Password field must be at leat 5 characters</Text>
      )}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <MyInput
            placeholderTextColor={Colors.Dark_400}
            isDarkMode={isDarkMode}
            placeholder="Confirm your password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="confirmPassword"
      />
      {errors.confirmPassword && <Text>Both passwords must match</Text>}
      <View>
        <TextInfo isDarkMode={isDarkMode}>Already have an account?</TextInfo>
      </View>
      <Button title="Submit" onPress={() => navigation.navigate('Login')} />
    </Root>
  );
};
export default FormRegistration;

const Root = styled.View`
  margin-top: 40px;
  display: flex;
  gap: 8px;
`;

const InputTitle = styled.Text<{errors: Object}>`
  color: ${props => (props.errors ? Colors.Light_300 : Colors.Error)};
  font-family: 'Outfit-SemiBold';
  font-size: 14px;
  font-weight: 600;
`;

const MyInput = styled.TextInput<{isDarkMode: boolean}>`
  padding: 12px 0;
  border-bottom-color: ${props =>
    props.isDarkMode ? Colors.Dark_100 : Colors.Light_700};
  border-bottom-width: 1.5px;
  color: ${props => (props.isDarkMode ? Colors.Dark_100 : Colors.Light_700)};
`;

const TextInfo = styled.Text<{isDarkMode: boolean}>`
  color: ${props => (props.isDarkMode ? Colors.Dark_100 : Colors.Dark_700)};
  font-family: 'Outfit-Regular';
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.48px;
  margin-top: 91px;
`;

const TextLink = styled.Text<{isDarkMode: boolean}>`
  color: ${props => (props.isDarkMode ? Colors.Dark_100 : Colors.Dark_700)};
  font-family: 'Outfit-Regular';
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.48px;
  margin-top: 91px;
`;
