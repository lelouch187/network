import React, {useRef, useState} from 'react';
import {
  FavouritesPostsPaginationResponse,
  FindPostsPaginationResponse,
  MyPostsPaginationResponse,
} from '../../types';
import {styled} from 'styled-components/native';
import {Colors} from '../../constant/colors';
import {FlatList, View} from 'react-native';
import Post from '../Post';
import {useQuery} from '@apollo/client';
import {FAVOURITE_POSTS, MY_POSTS, POSTS} from '../../apollo/posts';
import {useNavigation} from '@react-navigation/native';
import DefaultMyPosts from './DefaultMyPosts';

type MainPostsPropsType = {
  isDarkMode: boolean;
  activeTab: number;
};

const MainPosts = ({isDarkMode, activeTab}: MainPostsPropsType) => {
  const [activeSwitch, setActiveSwitch] = useState(0);
  const {data: posts, refetch: refetchPosts} =
    useQuery<FindPostsPaginationResponse>(POSTS, {
      variables: {limit: 20, type: activeSwitch === 0 ? 'NEW' : 'TOP'},
    });
  const {data: favouritePosts, refetch: refetchFavouritePosts} =
    useQuery<FavouritesPostsPaginationResponse>(FAVOURITE_POSTS, {
      variables: {limit: 20},
    });
  const {data: myPosts, refetch: refetchMyPosts} =
    useQuery<MyPostsPaginationResponse>(MY_POSTS, {
      variables: {limit: 20},
    });

  const navigation = useNavigation<any>();

  const flatListRef = useRef<any>();

  return (
    <Root>
      {activeTab === 0 && (
        <SwitchToogle>
          <ToogleText
            onPress={() => {
              setActiveSwitch(0);
              refetchPosts({
                limit: 20,
                type: activeSwitch === 0 ? 'NEW' : 'TOP',
              });
            }}
            isDarkMode={isDarkMode}
            active={activeSwitch === 0 ? true : false}>
            New
          </ToogleText>
          <ToogleText
            onPress={() => {
              setActiveSwitch(1);
              refetchPosts({
                limit: 20,
                type: activeSwitch === 0 ? 'NEW' : 'TOP',
              });
            }}
            isDarkMode={isDarkMode}
            active={activeSwitch === 1 ? true : false}>
            Top
          </ToogleText>
        </SwitchToogle>
      )}
      {activeTab === 2 &&
      myPosts?.myPosts.data &&
      myPosts.myPosts.data.length < 1 ? (
        <DefaultMyPosts isDarkMode={isDarkMode} />
      ) : (
        <FlatList
          ref={flatListRef}
          onEndReached={
            activeTab === 0
              ? () => {
                  refetchPosts({
                    limit: 20,
                    type: activeSwitch === 0 ? 'NEW' : 'TOP',
                    afterCursor: posts?.posts.pageInfo.afterCursor,
                  });
                  flatListRef.current.scrollToOffset({
                    animated: false,
                    offset: 0,
                  });
                }
              : activeTab === 1
              ? () => {
                  refetchFavouritePosts({
                    limit: 20,
                    afterCursor: posts?.posts.pageInfo.afterCursor || '',
                  });
                }
              : () => {
                  refetchMyPosts({
                    limit: 20,
                    afterCursor: posts?.posts.pageInfo.afterCursor || '',
                  });
                }
          }
          data={
            activeTab === 0
              ? posts?.posts.data
              : activeTab === 1
              ? favouritePosts?.favouritePosts.data
              : myPosts?.myPosts.data
          }
          renderItem={({item}: any) => (
            <View
              onTouchEnd={() => navigation.navigate('FullPost', {id: item.id})}>
              <Post post={item} isDarkMode={isDarkMode} />
            </View>
          )}
        />
      )}
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
