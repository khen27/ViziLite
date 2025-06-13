import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, Text, Image } from 'react-native';
import ProfileScreen from '../screens/ProfileScreen';

const CustomTabBar = () => {
  return (
    <View style={styles.navigationBar}>
      {/* Question Icon Container */}
      <TouchableOpacity style={styles.iconContainer} activeOpacity={0.7}>
        <Image source={require('../../assets/nav-feedback.png')} style={styles.iconImage} />
      </TouchableOpacity>

      {/* Message Icon Container */}
      <TouchableOpacity style={styles.iconContainer} activeOpacity={0.7}>
        <Image source={require('../../assets/nav-chat.png')} style={styles.iconImage} />
      </TouchableOpacity>

      {/* Notification Icon Container */}
      <TouchableOpacity style={styles.iconContainer} activeOpacity={0.7}>
        <Image source={require('../../assets/nav-notification.png')} style={styles.iconImage} />
      </TouchableOpacity>

      {/* Profile Icon Container */}
      <TouchableOpacity style={styles.iconContainer} activeOpacity={0.7}>
        <Image source={require('../../assets/nav-profile.png')} style={styles.iconImage} />
      </TouchableOpacity>
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
  navigationBar: {
    position: 'absolute',
    width: 343,
    height: 60,
    left: '50%',
    marginLeft: -171.5, // Half of 343
    top: 757,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
    gap: 24,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  iconImage: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
});

export default TabNavigator; 