import React, {useEffect, useState} from 'react';
import {EditProfileResponse, ThemeType, UserMeResponse} from '../types';
import {styled} from 'styled-components/native';
import {Colors} from '../constant/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Image, Platform, ScrollView, Text, View} from 'react-native';
import {useMutation, useQuery} from '@apollo/client';
import {USER_EDIT_PROFILE, USER_ME} from '../apollo/user';
import ArrowBack from '../components/UI/icons/ArrowBack';
import {Controller, useForm} from 'react-hook-form';
import {EMAILVALIDATION, PHONEVALIDATION} from '../constant/variables';
import {useNavigation} from '@react-navigation/native';
import RadioBtn from '../components/UI/icons/RadioBtn';
import {launchImageLibrary} from 'react-native-image-picker';

type ProfileInputTipe = {
  firstName: String;
  lastName: String;
  middleName: String;
  email: String;
  phone: String;
  country: String;
};

const Profile = ({isDarkMode}: ThemeType) => {
  const {data} = useQuery<UserMeResponse>(USER_ME);
  const [userEditProfile] = useMutation<EditProfileResponse>(USER_EDIT_PROFILE);

  const navigation = useNavigation<any>();
  const [date, setDate] = useState<any>(new Date());
  const [show, setShow] = useState(false);
  const [selectImage, setSelectImage] = useState('');

  const onChanged = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const saveImg = async () => {
    let options = {
      storageOptions: {
        path: 'image',
      },
    };
    const result = await launchImageLibrary(options);
    console.log(result);
  };

  const [gender, setGender] = useState(data?.userMe.gender || 'MALE');

  const {
    control,
    handleSubmit,
    trigger,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: data?.userMe.firstName || '',
      lastName: data?.userMe.lastName || '',
      middleName: data?.userMe.middleName || '',
      email: data?.userMe.email || '',
      phone: data?.userMe.phone || '',
      country: data?.userMe.country || '',
    },
  });

  const onSubmit = async (userInfo: ProfileInputTipe) => {
    await userEditProfile({
      variables: {
        email: userInfo.email,
        firstName: userInfo.firstName || data?.userMe.firstName,
        gender: gender,
        lastName: userInfo.lastName || data?.userMe.lastName,
        middleName: userInfo.middleName || data?.userMe.middleName,
        phone: userInfo.phone || data?.userMe.phone,
        country: userInfo.country || data?.userMe.country,
        birthDate: `${date.getFullYear()}-${
          date.getMonth().length > 2
            ? date.getMonth() - 1
            : '0' + (date.getMonth() + 1)
        }-${
          date.getDay().length > 2
            ? date.getDay() - 1
            : '0' + (date.getDay() - 1)
        }`,
      },
    });
  };

  return (
    <Root isDarkMode={isDarkMode}>
      <Header isDarkMode={isDarkMode}>
        <View onTouchStart={() => navigation.goBack()}>
          <ArrowBack color={isDarkMode ? Colors.Dark_100 : Colors.Light_100} />
        </View>
        <HeaderTitle isDarkMode={isDarkMode}>Profile</HeaderTitle>
        <HeaderButton onPress={handleSubmit(onSubmit)} isDarkMode={isDarkMode}>
          Done
        </HeaderButton>
      </Header>
      <ScrollView>
        <PhotoWrapper>
          {isDarkMode ? (
            <Image
              source={
                data?.userMe.avatarUrl
                  ? {
                      uri: data?.userMe.avatarUrl,
                    }
                  : require('../assets/images/dark-profile.png')
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
                  : require('../assets/images/light-profile.png')
              }
              style={{width: '100%', height: '100%'}}
            />
          )}
          <BtnPhotoWrapper onTouchStart={() => saveImg()}>
            {isDarkMode ? (
              <Image source={require('../assets/images/dark-btn-photo.png')} />
            ) : (
              <Image source={require('../assets/images/light-btn-photo.png')} />
            )}
          </BtnPhotoWrapper>
        </PhotoWrapper>
        <ProfileForm>
          <Title isDarkMode={isDarkMode}>Personal info</Title>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <InputTitle errors={errors.firstName || ''}>
                  First name
                </InputTitle>
                <MyInput
                  onPressIn={() => trigger()}
                  errors={errors.firstName || ''}
                  placeholderTextColor={Colors.Dark_400}
                  isDarkMode={isDarkMode}
                  placeholder="Enter your first name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </>
            )}
            name="firstName"
          />
          {errors.firstName && (
            <Text style={{color: Colors.Error}}>name too short</Text>
          )}
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <InputTitle errors={errors.lastName || ''}>
                  Last name
                </InputTitle>
                <MyInput
                  onPressIn={() => trigger()}
                  errors={errors.lastName || ''}
                  placeholderTextColor={Colors.Dark_400}
                  isDarkMode={isDarkMode}
                  placeholder="Enter your last name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </>
            )}
            name="lastName"
          />
          {errors.lastName && (
            <Text style={{color: Colors.Error}}>name too short</Text>
          )}
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <InputTitle errors={errors.middleName || ''}>
                  middleName
                </InputTitle>
                <MyInput
                  onPressIn={() => trigger()}
                  errors={errors.middleName || ''}
                  placeholderTextColor={Colors.Dark_400}
                  isDarkMode={isDarkMode}
                  placeholder="Enter your sur name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </>
            )}
            name="middleName"
          />
          {errors.middleName && (
            <Text style={{color: Colors.Error}}>name too short</Text>
          )}
          <Title isDarkMode={isDarkMode}>Gender</Title>
          <GenderItem onTouchStart={() => setGender('MALE')}>
            <RadioBtn color={gender === 'MALE' ? Colors.Dark_100 : 'none'} />
            <GenderTitle isDarkMode={isDarkMode}>Male</GenderTitle>
          </GenderItem>
          <GenderItem onTouchStart={() => setGender('FEMALE')}>
            <RadioBtn color={gender === 'FEMALE' ? Colors.Dark_100 : 'none'} />
            <GenderTitle isDarkMode={isDarkMode}>Female</GenderTitle>
          </GenderItem>
          <Title isDarkMode={isDarkMode}>Date of birth</Title>
          <View onTouchStart={() => setShow(true)}>
            <DateTitle>B-day</DateTitle>
            <DateText isDarkMode={isDarkMode}>
              <Text style={{color: `${Colors.Dark_400}`}}>
                {date.toDateString() ||
                  data?.userMe.birthDate ||
                  'Select bate of birth'}
              </Text>
            </DateText>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={date}
                mode="date"
                display="default"
                onChange={onChanged}
              />
            )}
          </View>
          <Title isDarkMode={isDarkMode}>Account info</Title>
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
          <Controller
            control={control}
            rules={{
              pattern: {
                value: PHONEVALIDATION,
                message: 'incorrect phone',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <InputTitle errors={errors.phone || ''}>
                  Phone number
                </InputTitle>
                <MyInput
                  onPressIn={() => trigger()}
                  errors={errors.phone || ''}
                  placeholderTextColor={Colors.Dark_400}
                  isDarkMode={isDarkMode}
                  placeholder="Enter your phone number"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </>
            )}
            name="phone"
          />
          {errors.phone && (
            <Text style={{color: Colors.Error}}>Enter correct phone</Text>
          )}
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <InputTitle errors={errors.country || ''}>Country</InputTitle>
                <MyInput
                  onPressIn={() => trigger()}
                  errors={errors.country || ''}
                  placeholderTextColor={Colors.Dark_400}
                  isDarkMode={isDarkMode}
                  placeholder="Enter your country"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </>
            )}
            name="country"
          />
          {errors.country && (
            <Text style={{color: Colors.Error}}>incorrect country</Text>
          )}
        </ProfileForm>
      </ScrollView>
    </Root>
  );
};
export default Profile;

const Root = styled.View<{isDarkMode: boolean}>`
  background-color: ${props =>
    props.isDarkMode ? Colors.Dark_700 : Colors.Light_100};
  height: 100%;
`;
const Header = styled.View<{isDarkMode: boolean}>`
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 16px;
`;

const HeaderTitle = styled.Text<{isDarkMode: boolean}>`
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

const PhotoWrapper = styled.View`
  display: flex;
  margin-left: 25%;
  align-items: center;
  margin-top: 12px;
  position: relative;
  width: 160px;
  height: 160px;
  border-radius: 80px;
  overflow: hidden;
`;

const BtnPhotoWrapper = styled.View`
  position: absolute;
  right: 12%;
  bottom: 10%;
`;

const ProfileForm = styled.View`
  padding: 0 16px;
`;

const Title = styled.Text<{isDarkMode: boolean}>`
  margin: 32px 0 16px;
  font-family: 'Outfit-Medium';
  font-size: 18px;
  font-weight: 500;
  color: ${props => (props.isDarkMode ? Colors.Dark_100 : Colors.Light_700)};
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
  margin-bottom: 16px;
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

const GenderItem = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

const GenderTitle = styled.Text<{isDarkMode: boolean}>`
  margin-left: 8px;
  font-family: 'Outfit-Regular';
  font-size: 16px;
  font-weight: 400;
  color: ${props => (props.isDarkMode ? Colors.Dark_100 : Colors.Light_700)};
`;

const DateTitle = styled.Text`
  color: ${Colors.Light_300};
  font-family: 'Outfit-SemiBold';
  font-size: 14px;
  font-weight: 600;
`;
const DateText = styled.Text<{isDarkMode: boolean}>`
  position: relative;
  padding: 12px 0;
  margin-bottom: 16px;
  border-bottom-color: ${props =>
    props.isDarkMode ? Colors.Dark_100 : Colors.Light_700};
  border-bottom-width: 1.5px;
  color: ${props => (props.isDarkMode ? Colors.Dark_100 : Colors.Light_700)};
`;
