import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import ProfileScreen from '../screens/ProfileScreen';
import Svg, { Path } from 'react-native-svg';

const QuestionIcon = () => (
  <Svg width={40} height={40} viewBox="0 0 28 28" fill="none">
    <Path d="M16.75 17.5h-2.33l-2.59 1.73c-.39.26-.92-.04-.92-.5v-1.23c-2.33 0-3.5-1.17-3.5-3.5v-4.67c0-2.33 1.17-3.5 3.5-3.5h7c2.33 0 3.5 1.17 3.5 3.5v4.67c0 2.33-1.17 3.5-3.5 3.5z" stroke="#90C2FF" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M14 13.65v-.11c0-.4.22-.6.44-.75.22-.15.44-.35.44-.8 0-.7-.57-1.27-1.27-1.27-.7 0-1.27.57-1.27 1.27" stroke="#90C2FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M13.99 15.44h.01" stroke="#90C2FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

const ChatIcon = () => (
  <Svg width={40} height={40} viewBox="0 0 61 60" fill="none">
    <Path d="M25.6667 38.1667C21 38.1667 18.6667 37 18.6667 31.1667V25.3333C18.6667 20.6667 21 18.3333 25.6667 18.3333H35C39.6667 18.3333 42 20.6667 42 25.3333V31.1667C42 35.8333 39.6667 38.1667 35 38.1667H34.4167C34.055 38.1667 33.705 38.3417 33.4833 38.6333L31.7333 40.9667C30.9633 41.9933 29.7033 41.9933 28.9333 40.9667L27.1833 38.6333C26.9967 38.3767 26.565 38.1667 26.25 38.1667H25.6667Z" stroke="#90C2FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M24.5 25.3333H36.1666" stroke="#90C2FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M24.5 31.1667H31.5" stroke="#90C2FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

const NotificationIcon = () => (
  <Svg width={40} height={40} viewBox="0 0 28 28" fill="none">
    <Path d="M10.5 12.3v1.52c0 .3-.13.77-.27 1.02l-.53.89c-.39.65.13 1.39.87 1.63 2.13.7 4.5.7 6.63 0 .74-.24 1.26-.98.87-1.63l-.53-.89a2.1 2.1 0 0 1-.27-1.02v-1.52c0-2.13-1.72-3.85-3.85-3.85-2.13 0-3.85 1.72-3.85 3.85z" stroke="#90C2FF" strokeWidth="1.5" strokeLinecap="round"/>
    <Path d="M14.01 8.17c-.44-.05-.89-.02-1.32.1.13-.33.48-.6.92-.6.44 0 .79.27.92.6-.43-.12-.88-.15-1.32-.1z" stroke="#90C2FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M15.5 19.5c0 .83-.67 1.5-1.5 1.5-.83 0-1.5-.67-1.5-1.5" stroke="#90C2FF" strokeWidth="1.5"/>
  </Svg>
);

const ProfileIcon = () => (
  <Svg width={40} height={40} viewBox="0 0 28 28" fill="none">
    <Path d="M14 15.45c-2.33-.07-4.22-1.93-4.22-4.28 0-2.37 1.92-4.29 4.29-4.29 2.37 0 4.29 1.92 4.29 4.29 0 2.35-1.89 4.21-4.22 4.28-.03 0-.07 0-.14 0z" stroke="#90C2FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M14 22.17c-2.03 0-3.93-.82-5.13-2.01.06-.56.47-1.23 1.19-1.7 2.01-1.34 5.87-1.34 7.88 0 .72.47 1.13 1.14 1.19 1.7-1.2 1.19-3.1 2.01-5.13 2.01z" stroke="#90C2FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <Path fillRule="evenodd" clipRule="evenodd" d="M14 22.17c-3.7 0-6.7-3-6.7-6.7 0-3.7 3-6.7 6.7-6.7 3.7 0 6.7 3 6.7 6.7 0 3.7-3 6.7-6.7 6.7z" stroke="#90C2FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

const ICONS = [QuestionIcon, ChatIcon, NotificationIcon, ProfileIcon];

const CustomTabBar = () => {
  return (
    <View style={styles.tabBarWrapper}>
      <View style={styles.tabBarContainer}>
        {ICONS.map((Icon, idx) => (
          <TouchableOpacity key={idx} style={styles.iconContainer} activeOpacity={0.7}>
            <Icon />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const TabNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
      <ProfileScreen />
      <CustomTabBar />
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: Platform.OS === 'ios' ? 24 : 0,
    alignItems: 'center',
    zIndex: 100,
  },
  tabBarContainer: {
    width: 343,
    height: 60,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

export default TabNavigator; 