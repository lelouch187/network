import React, {useRef, useState} from 'react';
import {FindPostsPaginationResponse, ThemeType} from '../../types';
import {styled} from 'styled-components/native';
import {Colors} from '../../constant/colors';
import {FlatList, View} from 'react-native';
import Post from '../Post';
import {useQuery} from '@apollo/client';
import {POSTS} from '../../apollo/posts';
import {useNavigation} from '@react-navigation/native';

const MainPosts = ({isDarkMode}: ThemeType) => {
  const [activeSwitch, setActiveSwitch] = useState(0);
  const {data, refetch} = useQuery<FindPostsPaginationResponse>(POSTS, {
    variables: {limit: 20, type: activeSwitch === 0 ? 'NEW' : 'TOP'},
  });

  const navigation = useNavigation<any>();

  const flatListRef = useRef<any>();

  return (
    <Root>
      <SwitchToogle>
        <ToogleText
          onPress={() => {
            setActiveSwitch(0);
            refetch({limit: 20, type: activeSwitch === 0 ? 'NEW' : 'TOP'});
          }}
          isDarkMode={isDarkMode}
          active={activeSwitch === 0 ? true : false}>
          New
        </ToogleText>
        <ToogleText
          onPress={() => {
            setActiveSwitch(1);
            refetch({limit: 20, type: activeSwitch === 0 ? 'NEW' : 'TOP'});
          }}
          isDarkMode={isDarkMode}
          active={activeSwitch === 1 ? true : false}>
          Top
        </ToogleText>
      </SwitchToogle>
      <FlatList
        ref={flatListRef}
        onEndReached={() => {
          refetch({
            limit: 20,
            type: activeSwitch === 0 ? 'NEW' : 'TOP',
            afterCursor: data?.posts.pageInfo.afterCursor,
          });
          flatListRef.current.scrollToOffset({animated: false, offset: 0});
        }}
        data={data?.posts.data}
        renderItem={({item}: any) => (
          <View
            onTouchStart={() => navigation.navigate('FullPost', {id: item.id})}>
            <Post post={item} isDarkMode={isDarkMode} />
          </View>
        )}
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
