import React, {useState} from 'react';
import {styled} from 'styled-components/native';
import {Colors} from '../constant/colors';
import MainHeader from '../components/mainScreen/MainHeader';
import MainPosts from '../components/mainScreen/MainPosts';
import BottomMenu from '../components/mainScreen/BottomMenu';
import Popup from '../components/mainScreen/Popup';

type MainPropsType = {
  isDarkMode: boolean;
  setIsDarkMode: any;
};

const Main = ({isDarkMode, setIsDarkMode}: MainPropsType) => {
  const [activeTab, setActiveTab] = useState(0);
  const [visiblePopup, setVisiblePopup] = useState(false);

  const changeTab = (tab: number) => {
    setActiveTab(tab);
  };

  return (
    <Root onTouchStart={() => setVisiblePopup(false)} isDarkMode={isDarkMode}>
      <MainHeader setVisiblePopup={setVisiblePopup} isDarkMode={isDarkMode} />
      <MainPosts isDarkMode={isDarkMode} />
      <BottomMenu
        changeTab={tub => changeTab(tub)}
        activeTab={activeTab}
        isDarkMode={isDarkMode}
      />
      <Popup
        setVisiblePopup={setVisiblePopup}
        visiblePopup={visiblePopup}
        setIsDarkMode={setIsDarkMode}
        isDarkMode={isDarkMode}
      />
    </Root>
  );
};
export default Main;

const Root = styled.View<{isDarkMode: boolean}>`
  flex: 1;
  position: relative;
  background-color: ${props =>
    props.isDarkMode ? Colors.Dark_700 : Colors.Light_100};
`;
