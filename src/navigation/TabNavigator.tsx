import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, Text, Image, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ChatScreen from '../screens/ChatScreen';
import TripDetails from '../screens/TripDetails';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const TabNavigator = () => {
  const [activeTab, setActiveTab] = useState('Notifications');

  const renderScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <TripDetails />;
      case 'Chat':
        return <ChatScreen />;
      case 'Notifications':
        return <NotificationsScreen />;
      case 'Profile':
      default:
        return <ProfileScreen />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Screen Content */}
      <View style={styles.screenContainer}>
        {renderScreen()}
      </View>
      
      {/* Navigation Bar with Gradient Background */}
      <View style={styles.navBarWrapper}>
        <LinearGradient
          colors={['#7389EC', '#4694FD']}
          style={styles.navBarGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.navigationBar}>
            {/* Question/Home Icon Container */}
            <TouchableOpacity 
              style={[styles.iconContainer, activeTab === 'Home' && styles.activeIconContainer]} 
              activeOpacity={0.7}
              onPress={() => setActiveTab('Home')}
            >
              <Image 
                source={require('../../assets/nav-feedback.png')} 
                style={[
                  styles.iconImage,
                  { tintColor: activeTab === 'Home' ? '#FFFFFF' : '#90C2FF' }
                ]} 
              />
            </TouchableOpacity>

            {/* Message Icon Container */}
            <TouchableOpacity 
              style={[styles.iconContainer, activeTab === 'Chat' && styles.activeIconContainer]} 
              activeOpacity={0.7}
              onPress={() => setActiveTab('Chat')}
            >
              <Image 
                source={require('../../assets/nav-chat.png')} 
                style={[
                  styles.iconImage,
                  { tintColor: activeTab === 'Chat' ? '#FFFFFF' : '#90C2FF' }
                ]} 
              />
            </TouchableOpacity>

            {/* Notification Icon Container */}
            <TouchableOpacity 
              style={[styles.iconContainer, activeTab === 'Notifications' && styles.activeIconContainer]} 
              activeOpacity={0.7}
              onPress={() => setActiveTab('Notifications')}
            >
              <Image 
                source={require('../../assets/nav-notification.png')} 
                style={[
                  styles.iconImage,
                  { tintColor: activeTab === 'Notifications' ? '#FFFFFF' : '#90C2FF' }
                ]} 
              />
            </TouchableOpacity>

            {/* Profile Icon Container */}
            <TouchableOpacity 
              style={[styles.iconContainer, activeTab === 'Profile' && styles.activeIconContainer]} 
              activeOpacity={0.7}
              onPress={() => setActiveTab('Profile')}
            >
              <Image 
                source={require('../../assets/nav-profile.png')} 
                style={[
                  styles.iconImage,
                  { tintColor: activeTab === 'Profile' ? '#FFFFFF' : '#90C2FF' }
                ]} 
              />
            </TouchableOpacity>
          </View>
          
          {/* Home Indicator */}
          <View style={styles.homeIndicator} />
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  screenContainer: {
    flex: 1,
  },
  navBarWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 95,
  },
  navBarGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 0 : 10,
  },
  navigationBar: {
    width: 343,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
    gap: 24,
    marginTop: 10,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  activeIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  iconImage: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  homeIndicator: {
    width: 134,
    height: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    marginTop: 15,
    marginBottom: 8,
  },
});

export default TabNavigator; 