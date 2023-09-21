import React from 'react';
import {styled} from 'styled-components/native';
import {PostModel} from '../types';
import {Image, View} from 'react-native';
import {Colors} from '../constant/colors';
import Like from './UI/icons/Like';
import {useMutation} from '@apollo/client';
import {POST_LIKE, POST_UNLIKE} from '../apollo/posts';

type PostPropsType = {
  post: PostModel;
  isDarkMode: boolean;
};

const Post = ({isDarkMode, post}: PostPropsType) => {
  const [likePost] = useMutation(POST_LIKE);
  const [unLikePost] = useMutation(POST_UNLIKE);

  return (
    <Root isDarkMode={isDarkMode}>
      <HeaderPost>
        <HeaderText isDarkMode={isDarkMode}>{post.title}</HeaderText>
        <PostDate>{post.createdAt.split('T')[0]}</PostDate>
      </HeaderPost>
      <ImageWrapper>
        <Image
          style={{width: '100%', height: '100%'}}
          source={{uri: post.mediaUrl}}
        />
      </ImageWrapper>
      <PostBottom>
        <UserInfo>
          <UserImageWrapper>
            <Image
              style={{width: '100%', height: '100%'}}
              source={
                !post.author.avatarUrl
                  ? isDarkMode
                    ? require('../assets/images/dark-profile.png')
                    : require('../assets/images/light-profile.png')
                  : {uri: post.author.avatarUrl}
              }
            />
          </UserImageWrapper>
          <UserName>{post.author.firstName}</UserName>
        </UserInfo>
        <Social>
          <View
            onTouchStart={
              post.isLiked
                ? () => unLikePost({variables: {id: post.id}})
                : () => likePost({variables: {id: post.id}})
            }>
            <Like
              color={
                post.isLiked
                  ? Colors.Error
                  : isDarkMode
                  ? Colors.Dark_200
                  : Colors.Light_700
              }
            />
          </View>
          <LikesCount>{post.likesCount.toString()}</LikesCount>
          {isDarkMode ? (
            <Image source={require('../assets/images/share-dark.png')} />
          ) : (
            <Image source={require('../assets/images/share-light.png')} />
          )}
        </Social>
      </PostBottom>
    </Root>
  );
};
export default Post;

const Root = styled.View<{isDarkMode: boolean}>`
  padding: 24px 20px 32px;
  margin-bottom: 3px;
  width: 100%;
  background-color: ${props =>
    props.isDarkMode ? Colors.Dark_600 : Colors.Light_150};
`;

const HeaderPost = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const HeaderText = styled.Text<{isDarkMode: boolean}>`
  font-family: 'Outfit-Medium';
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 12px;
  color: ${props => (props.isDarkMode ? Colors.Dark_100 : Colors.Light_700)};
`;
const PostDate = styled.Text``;
const ImageWrapper = styled.View`
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 20px;
  height: 226px;
  width: 100%;
`;
const PostBottom = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const UserInfo = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const UserImageWrapper = styled.View`
  height: 25px;
  width: 25px;
  border-radius: 16px;
  overflow: hidden;
`;
const UserName = styled.Text`
  margin-left: 5px;
  color: ${Colors.Light_300};
  font-family: 'Outfit-Regular';
  font-size: 14px;
  font-weight: 400;
`;
const Social = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const LikesCount = styled.Text`
  color: ${Colors.Light_300};
  font-family: 'Outfit-Regular';
  font-size: 14px;
  font-weight: 400;
  margin: 0 5px 0;
`;
