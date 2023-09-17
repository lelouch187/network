import React, {useState} from 'react';
import {ThemeType} from '../../types';
import {styled} from 'styled-components/native';
import {Colors} from '../../constant/colors';
import {FlatList} from 'react-native';
import Post from '../Post';

const MainPosts = ({isDarkMode}: ThemeType) => {
  const [activeSwitch, setActiveSwitch] = useState(0);

  return (
    <Root>
      <SwitchToogle>
        <ToogleText
          onPress={() => setActiveSwitch(0)}
          isDarkMode={isDarkMode}
          active={activeSwitch === 0 ? true : false}>
          New
        </ToogleText>
        <ToogleText
          onPress={() => setActiveSwitch(1)}
          isDarkMode={isDarkMode}
          active={activeSwitch === 1 ? true : false}>
          Top
        </ToogleText>
      </SwitchToogle>
      <FlatList
        data={[1, 2, 3, 4]}
        renderItem={({item}) => <Post isDarkMode={isDarkMode} />}
      />
    </Root>
  );
};
export default MainPosts;

const Root = styled.View`
  display: flex;
  flex: 1;
  height: max-content;
  justify-content: space-between;
`;

const SwitchToogle = styled.View`
  margin: 20px 17px;
  display: flex;
  flex-direction: row;
  border-radius: 16px;
  overflow: hidden;
`;
const ToogleText = styled.Text<{active: boolean; isDarkMode: boolean}>`
  width: 50%;
  text-align: center;
  padding: 12px 0;
  background-color: ${props =>
    props.isDarkMode
      ? props.active
        ? '#B8DE64'
        : Colors.Dark_600
      : props.active
      ? '#87B71F'
      : Colors.Light_150};
  color: ${props =>
    props.isDarkMode
      ? props.active
        ? Colors.Dark_700
        : Colors.Dark_100
      : props.active
      ? Colors.Light_100
      : Colors.Light_700};
`;
