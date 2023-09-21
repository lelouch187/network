import React, {useState} from 'react';
import {ActivityIndicator, Image, Text} from 'react-native';
import {styled} from 'styled-components/native';
import {Colors} from '../constant/colors';
import {useNavigation} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {EMAILVALIDATION} from '../constant/variables';
import {SignInRequest, SignInResponse, ThemeType} from '../types';
import {useMutation} from '@apollo/client';
import {SIGN_IN} from '../apollo/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FormLogin = ({isDarkMode}: ThemeType) => {
  const [userSignIn, {data: result, loading, error: err}] =
    useMutation<SignInResponse>(SIGN_IN);

  const [visibleInput, setVisibleInput] = useState({
    password: true,
  });
  const navigation = useNavigation<any>();

  const {
    control,
    handleSubmit,
    trigger,
    formState: {errors, isDirty, isValid},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInRequest) => {
    await AsyncStorage.removeItem('token');
    userSignIn({
      variables: data,
    }).then(async () => {
      if (result?.userSignIn.token) {
        await AsyncStorage.setItem(
          'token',
          result?.userSignIn.token as any,
        ).then(() => {
          navigation.navigate('Main');
        });
      }
    });
  };

  return (
    <Root>
      <Controller
        control={control}
        rules={{
          pattern: {
            value: EMAILVALIDATION,
            message: 'incorrect email',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <InputTitle errors={errors.email || ''}>E-mail</InputTitle>
            <MyInput
              onPressIn={() => trigger()}
              errors={errors.email || ''}
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
      {errors.email && (
        <Text style={{color: Colors.Error}}>Enter correct e-mail</Text>
      )}
      <InputWrapper>
        <Controller
          control={control}
          rules={{
            minLength: 5,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <>
              <InputTitle errors={errors.password || ''}>Password</InputTitle>
              <MyInput
                onPressIn={() => trigger()}
                errors={errors.password || ''}
                secureTextEntry={visibleInput.password}
                placeholderTextColor={Colors.Dark_400}
                isDarkMode={isDarkMode}
                placeholder="Enter your password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </>
          )}
          name="password"
        />
        <IconWrapper
          onTouchStart={() =>
            setVisibleInput({
              ...visibleInput,
              password: !visibleInput.password,
            })
          }>
          {errors.password ? (
            <Image source={require('../assets/images/eue-error.png')} />
          ) : (
            <Image source={require('../assets/images/eue.png')} />
          )}
        </IconWrapper>
      </InputWrapper>

      {errors.password && (
        <Text style={{color: Colors.Error}}>
          Password field must be at leat 5 characters
        </Text>
      )}
      <TextWrapper>
        <TextInfo isDarkMode={isDarkMode}>No account?{'\t'}</TextInfo>
        <TextLink
          isDarkMode={isDarkMode}
          onPress={() => navigation.navigate('Registration')}>
          Register
        </TextLink>
      </TextWrapper>
      <ButtonWrapper isDarkMode={isDarkMode} disabled={!isDirty || !isValid}>
        <MyButton
          isDarkMode={isDarkMode}
          disabled={!isDirty || !isValid}
          onPress={handleSubmit(onSubmit)}>
          {loading ? <ActivityIndicator /> : 'Continue'}
        </MyButton>
      </ButtonWrapper>
      {result?.userSignIn.problem && (
        <Text style={{color: Colors.Error}}>
          {result?.userSignIn.problem.message}
        </Text>
      )}
      {err && <Text style={{color: Colors.Error}}>{err.message}</Text>}
    </Root>
  );
};
export default FormLogin;

const Root = styled.View`
  margin-top: 40px;
  display: flex;
  gap: 8px;
`;

const InputTitle = styled.Text<{errors: Object}>`
  color: ${props => (!props.errors ? Colors.Light_300 : Colors.Error)};
  font-family: 'Outfit-SemiBold';
  font-size: 14px;
  font-weight: 600;
`;

const MyInput = styled.TextInput<{isDarkMode: boolean; errors: Object}>`
  position: relative;
  padding: 12px 0;
  border-bottom-color: ${props =>
    props.errors
      ? Colors.Error
      : props.isDarkMode
      ? Colors.Dark_100
      : Colors.Light_700};
  border-bottom-width: 1.5px;
  color: ${props =>
    props.errors
      ? Colors.Error
      : props.isDarkMode
      ? Colors.Dark_100
      : Colors.Light_700};
`;

const TextWrapper = styled.Text`
  margin-top: 174px;
  margin-bottom: 20px;
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
  line-height: 24px;
  color: ${props =>
    props.isDarkMode
      ? Colors.Dark_primary_default
      : Colors.Light_primary_default};
  font-family: 'Outfit-Medium';
  font-size: 16px;
  font-weight: 500;
  text-decoration: underline;
`;

const IconWrapper = styled.View`
  position: absolute;
  right: 0;
  top: 50%;
`;

const InputWrapper = styled.View`
  position: relative;
`;

const ButtonWrapper = styled.View<{disabled: boolean; isDarkMode: boolean}>`
  border-radius: 21px;
  background: ${props =>
    props.disabled
      ? !props.isDarkMode
        ? Colors.Light_300
        : Colors.Dark_500
      : !props.isDarkMode
      ? Colors.Light_primary_default
      : Colors.Dark_500};
  overflow: hidden;
  padding: 16px 0;
  display: flex;
  align-items: center;
`;

const MyButton = styled.Text<{disabled: boolean; isDarkMode: boolean}>`
  color: ${props =>
    props.disabled
      ? !props.isDarkMode
        ? '#CFCFCF'
        : Colors.Dark_400
      : !props.isDarkMode
      ? Colors.Light_100
      : Colors.Light_primary_default};
  font-family: 'Outfit-Regular';
  font-size: 16px;
`;
