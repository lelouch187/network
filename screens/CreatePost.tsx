import React from 'react';
import {ThemeType} from '../types';
import {styled} from 'styled-components/native';
import {Colors} from '../constant/colors';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, Image, Text, View} from 'react-native';
import ArrowBack from '../components/UI/icons/ArrowBack';
import CloseBtn from '../components/UI/icons/CloseBtn';
import {Controller, useForm} from 'react-hook-form';

const CreatePost = ({isDarkMode}: ThemeType) => {
  const navigation = useNavigation<any>();

  const {
    control,
    handleSubmit,
    trigger,
    formState: {errors, isDirty, isValid},
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = data => {};

  return (
    <Root isDarkMode={isDarkMode}>
      <Header isDarkMode={isDarkMode}>
        <View onTouchStart={() => navigation.goBack()}>
          <ArrowBack color={isDarkMode ? Colors.Dark_100 : Colors.Light_100} />
        </View>
        <HeaderTitle isDarkMode={isDarkMode}>Create post</HeaderTitle>
        <View onTouchStart={() => navigation.goBack()}>
          <CloseBtn color={isDarkMode ? Colors.Dark_100 : Colors.Light_100} />
        </View>
      </Header>
      <ImgWrapper>
        <Image source={require('../assets/images/upload-photo.png')} />
      </ImgWrapper>
      <Controller
        control={control}
        rules={{minLength: 3}}
        render={({field: {onChange, onBlur, value}}) => (
          <InputWrapper>
            <InputTitle errors={errors.title || ''}>Title</InputTitle>
            <MyInput
              onPressIn={() => trigger()}
              errors={errors.title || ''}
              placeholderTextColor={Colors.Dark_400}
              isDarkMode={isDarkMode}
              placeholder="Enter title of post"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </InputWrapper>
        )}
        name="title"
      />
      {errors.title && (
        <Text style={{color: Colors.Error}}>To short title</Text>
      )}
      <Controller
        control={control}
        rules={{minLength: 10}}
        render={({field: {onChange, onBlur, value}}) => (
          <InputWrapper>
            <InputTitle errors={errors.description || ''}>Post</InputTitle>
            <MyInput
              onPressIn={() => trigger()}
              errors={errors.description || ''}
              placeholderTextColor={Colors.Dark_400}
              isDarkMode={isDarkMode}
              placeholder="Enter your post"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </InputWrapper>
        )}
        name="description"
      />
      {errors.description && (
        <Text style={{color: Colors.Error}}>Enter correct post</Text>
      )}
      <ButtonWrapper isDarkMode={isDarkMode} disabled={!isDirty || !isValid}>
        <MyButton
          isDarkMode={isDarkMode}
          disabled={!isDirty || !isValid}
          onPress={handleSubmit(onSubmit)}>
          {'loading' ? <ActivityIndicator /> : 'Publish'}
        </MyButton>
      </ButtonWrapper>
    </Root>
  );
};
export default CreatePost;

const Root = styled.View<{isDarkMode: boolean}>`
  background-color: ${props =>
    props.isDarkMode ? Colors.Dark_700 : Colors.Light_100};
  height: 100%;
  display: flex;
  padding: 0 16px;
`;
const Header = styled.View<{isDarkMode: boolean}>`
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 0;
`;

const HeaderTitle = styled.Text<{isDarkMode: boolean}>`
  font-family: 'Outfit-SemiBold';
  font-size: 18px;
  font-weight: 600;
  color: ${props => (props.isDarkMode ? Colors.Dark_100 : Colors.Light_700)};
`;

const ImgWrapper = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  max-height: 166px;
  overflow: hidden;
`;

const InputWrapper = styled.View`
  margin-top: 24px;
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

const ButtonWrapper = styled.View<{disabled: boolean; isDarkMode: boolean}>`
  margin-top: 52px;
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
