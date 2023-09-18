import React, {useState} from 'react';
import {styled} from 'styled-components/native';
import {ThemeType} from '../../types';
import {Controller, useForm} from 'react-hook-form';
import {Platform, Text, View} from 'react-native';
import {Colors} from '../../constant/colors';
import RadioBtn from '../UI/icons/RadioBtn';
import DateTimePicker from '@react-native-community/datetimepicker';
import {EMAILVALIDATION, PHONEVALIDATION} from '../../constant/variables';

const ProfileForm = ({isDarkMode}: ThemeType) => {
  const [date, setDate] = useState<any>(null);
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const [gender, setGender] = useState<any>(null);
  const {
    control,
    handleSubmit,
    trigger,
    formState: {errors, isDirty, isValid},
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

  const onSubmit = (data: any) => console.log(data);

  return (
    <Root>
      <Title isDarkMode={isDarkMode}>Personal info</Title>
      <Controller
        control={control}
        rules={{minLength: 3}}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <InputTitle errors={errors.firstName || ''}>First name</InputTitle>
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
        rules={{minLength: 3}}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <InputTitle errors={errors.lastName || ''}>Last name</InputTitle>
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
              value={value}
            />
          </>
        )}
        name="surName"
      />
      {errors.surName && (
        <Text style={{color: Colors.Error}}>name too short</Text>
      )}
      <Title isDarkMode={isDarkMode}>Gender</Title>
      <GenderItem onTouchStart={() => setGender(0)}>
        <RadioBtn color={gender === 0 ? Colors.Dark_100 : 'none'} />
        <GenderTitle isDarkMode={isDarkMode}>Male</GenderTitle>
      </GenderItem>
      <GenderItem onTouchStart={() => setGender(1)}>
        <RadioBtn color={gender === 1 ? Colors.Dark_100 : 'none'} />
        <GenderTitle isDarkMode={isDarkMode}>Female</GenderTitle>
      </GenderItem>
      <Title isDarkMode={isDarkMode}>Date of birth</Title>
      <View onTouchStart={() => setShow(true)}>
        <DateTitle>B-day</DateTitle>
        <DateText isDarkMode={isDarkMode}>
          {date ? (
            `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
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
            onChange={onChange}
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
            <InputTitle errors={errors.phone || ''}>Phone number</InputTitle>
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
              value={value}
            />
          </>
        )}
        name="country"
      />
      {errors.country && (
        <Text style={{color: Colors.Error}}>incorrect country</Text>
      )}
    </Root>
  );
};
export default ProfileForm;

const Root = styled.View`
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
