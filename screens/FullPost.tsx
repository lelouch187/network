import React from 'react';
import {styled} from 'styled-components/native';
import {Colors} from '../constant/colors';
import {Image, View} from 'react-native';
import ArrowBack from '../components/UI/icons/ArrowBack';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQuery} from '@apollo/client';
import {POST, POST_LIKE, POST_UNLIKE} from '../apollo/posts';
import {PostResponse} from '../types';
import Like from '../components/UI/icons/Like';

type FullPostPropsType = {
  isDarkMode: boolean;
};

const FullPost = ({isDarkMode}: FullPostPropsType) => {
  const navigation = useNavigation();
  const {params} = useRoute();

  const {data: post} = useQuery<PostResponse>(POST, {
    variables: {id: params?.id},
  });

  const [likePost] = useMutation(POST_LIKE);
  const [unLikePost] = useMutation(POST_UNLIKE);

  return (
    <Root isDarkMode={isDarkMode}>
      <HeaderPost>
        <View onTouchStart={() => navigation.goBack()}>
          <ArrowBack color={isDarkMode ? Colors.Dark_100 : Colors.Light_100} />
        </View>
        <HeaderText isDarkMode={isDarkMode}>{post?.post.title}</HeaderText>
      </HeaderPost>
      <PostDate>{post?.post.createdAt.split('T')[0]}</PostDate>
      <ImageWrapper>
        <Image
          style={{width: '100%', height: '100%'}}
          source={{uri: post?.post.mediaUrl}}
        />
      </ImageWrapper>
      <PostText isDarkMode={isDarkMode}>{post?.post.description}</PostText>
      <PostBottom>
        <UserInfo>
          <UserImageWrapper>
            <Image
              style={{width: '100%', height: '100%'}}
              source={
                !post?.post.author.avatarUrl
                  ? isDarkMode
                    ? require('../assets/images/dark-profile.png')
                    : require('../assets/images/light-profile.png')
                  : {uri: post.post.author.avatarUrl}
              }
            />
          </UserImageWrapper>
          <UserName>{post?.post.author.firstName}</UserName>
        </UserInfo>
        <Social>
          <View
            onTouchStart={
              post?.post.isLiked
                ? () => unLikePost({variables: {id: post.post.id}})
                : () => likePost({variables: {id: post?.post.id}})
            }>
            <Like
              color={
                post?.post.isLiked
                  ? Colors.Error
                  : isDarkMode
                  ? Colors.Dark_200
                  : Colors.Light_700
              }
            />
          </View>
          <LikesCount>{post?.post.likesCount}</LikesCount>
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
export default FullPost;

const Root = styled.View<{isDarkMode: boolean}>`
  padding: 0 16px;
  margin-bottom: 3px;
  width: 100%;
  height: 100%;
  background-color: ${props =>
    props.isDarkMode ? Colors.Dark_600 : Colors.Light_150};
`;

const HeaderPost = styled.View`
  padding: 20px 0px 20px 0px;
  display: flex;
  flex-direction: row;
  justify-content: left;
`;

const HeaderText = styled.Text<{isDarkMode: boolean}>`
  font-family: 'Outfit-SemiBold';
  font-size: 18px;
  margin-left: 35%;
  color: ${props => (props.isDarkMode ? Colors.Dark_100 : Colors.Light_700)};
`;
const PostDate = styled.Text`
  text-align: center;
  margin-bottom: 8px;
`;

const ImageWrapper = styled.View`
  border-radius: 16px;
  height: 226px;
  width: 100%;
  overflow: hidden;
  margin-bottom: 20px;
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
const PostText = styled.Text<{isDarkMode: boolean}>`
  margin-bottom: 20px;
  font-family: 'Outfit-Regular';
  font-size: 14px;
  color: ${props => (props.isDarkMode ? Colors.Dark_200 : Colors.Light_700)};
`;
