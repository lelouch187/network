import React, {useState} from 'react';
import {ThemeType, UserMeResponse} from '../types';
import {styled} from 'styled-components/native';
import {Colors} from '../constant/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Image, Platform, ScrollView, Text, View} from 'react-native';
import {useQuery} from '@apollo/client';
import {USER_ME} from '../apollo/user';
import ArrowBack from '../components/UI/icons/ArrowBack';
import {Controller, useForm} from 'react-hook-form';
import RadioBtn from '../components/UI/icons/RadioBtn';
import {EMAILVALIDATION, PHONEVALIDATION} from '../constant/variables';

const Profile = ({isDarkMode}: ThemeType) => {
  const {loading, error, data} = useQuery<UserMeResponse>(USER_ME);
  console.log(data);

  const [date, setDate] = useState<any>(null);
  const [show, setShow] = useState(false);

  const onChanged = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const [gender, setGender] = useState(data?.userMe.gender || 'MALE');
  const {
    control,
    handleSubmit,
    trigger,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      surName: '',
      radio: '',
      email: '',
      phone: '',
      country: '',
    },
  });

  const onSubmit = (userInfo: any) => console.log(userInfo);

  return (
    <Root isDarkMode={isDarkMode}>
      <Header isDarkMode={isDarkMode}>
        <ArrowBack color={isDarkMode ? Colors.Dark_100 : Colors.Light_100} />
        <HeaderTitle isDarkMode={isDarkMode}>Profile</HeaderTitle>
        <HeaderButton isDarkMode={isDarkMode}>Done</HeaderButton>
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
          <BtnPhotoWrapper>
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
            rules={{minLength: 3}}
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
                  value={data?.userMe.firstName || value}
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
            rules={{minLength: 3}}
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
                  value={data?.userMe.lastName || value}
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
            rules={{minLength: 3}}
            render={({field: {onChange, onBlur, value}}) => (
              <>
                <InputTitle errors={errors.surName || ''}>Surname</InputTitle>
                <MyInput
                  onPressIn={() => trigger()}
                  errors={errors.surName || ''}
                  placeholderTextColor={Colors.Dark_400}
                  isDarkMode={isDarkMode}
                  placeholder="Enter your sur name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={data?.userMe.middleName || value}
                />
              </>
            )}
            name="surName"
          />
          {errors.surName && (
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
              {data?.userMe.birthDate ? (
                data.userMe.birthDate
              ) : (
                <Text style={{color: `${Colors.Dark_400}`}}>
                  Select bate of birth
                </Text>
              )}
            </DateText>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={new Date()}
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
                  value={data?.userMe.email || value}
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
                  value={data?.userMe.phone || value}
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
            rules={{minLength: 3}}
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
                  value={data?.userMe.country || value}
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
