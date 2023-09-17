import React from 'react';
import {styled} from 'styled-components/native';
import {Colors} from '../../constant/colors';
import Bookmark from '../UI/icons/Bookmark';
import Home from '../UI/icons/Home';
import Photo from '../UI/icons/Photo';

type BottomMenuPropsType = {
  isDarkMode: boolean;
  activeTab: number;
  changeTab: (tub: number) => void;
};

const BottomMenu = ({
  isDarkMode,
  activeTab,
  changeTab,
}: BottomMenuPropsType) => {
  return (
    <Root isDarkMode={isDarkMode}>
      <ItemWrapper onTouchStart={() => changeTab(0)}>
        <Home
          color={
            isDarkMode
              ? activeTab === 0
                ? '#B8DE64'
                : Colors.Dark_400
              : activeTab === 0
              ? '#87B71F'
              : Colors.Light_200
          }
        />
        <ImageTitle
          isDarkMode={isDarkMode}
          active={activeTab === 0 ? true : false}>
          Main
        </ImageTitle>
      </ItemWrapper>
      <ItemWrapper onTouchStart={() => changeTab(1)}>
        <Bookmark
          color={
            isDarkMode
              ? activeTab === 1
                ? '#B8DE64'
                : Colors.Dark_400
              : activeTab === 1
              ? '#87B71F'
              : Colors.Light_200
          }
        />
        <ImageTitle
          isDarkMode={isDarkMode}
          active={activeTab === 1 ? true : false}>
          Favorites
        </ImageTitle>
      </ItemWrapper>
      <ItemWrapper onTouchStart={() => changeTab(2)}>
        <Photo
          color={
            isDarkMode
              ? activeTab === 2
                ? '#B8DE64'
                : Colors.Dark_400
              : activeTab === 2
              ? '#87B71F'
              : Colors.Light_200
          }
        />
        <ImageTitle
          isDarkMode={isDarkMode}
          active={activeTab === 2 ? true : false}>
          My posts
        </ImageTitle>
      </ItemWrapper>
    </Root>
  );
};
export default BottomMenu;

const Root = styled.View<{isDarkMode: boolean}>`
  position: fixed;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  display: flex;
  right: 0;
  bottom: 0;
  left: 0;
  min-height: 70px;
  height: 70px;
  background-color: ${props =>
    props.isDarkMode ? Colors.Dark_700 : Colors.Light_100};
`;

const ItemWrapper = styled.View`
  display: flex;
  align-items: center;
`;

const ImageTitle = styled.Text<{active: boolean; isDarkMode: boolean}>`
  color: ${props =>
    props.isDarkMode
      ? props.active
        ? '#B8DE64'
        : Colors.Dark_400
      : props.active
      ? '#87B71F'
      : Colors.Light_200};
`;
