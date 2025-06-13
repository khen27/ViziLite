import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, Text, StyleSheet } from 'react-native';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatScreen from '../screens/ChatScreen';
import TripDetailsScreen from '../screens/TripDetailsScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;
          
          switch (route.name) {
            case 'Home':
              iconSource = require('../../assets/nav-feedback.png');
              break;
            case 'Chat':
              iconSource = require('../../assets/nav-chat.png');
              break;
            case 'Notifications':
              iconSource = require('../../assets/nav-notification.png');
              break;
            case 'Profile':
              iconSource = require('../../assets/nav-profile.png');
              break;
            default:
              iconSource = require('../../assets/nav-feedback.png');
          }

          return (
            <View style={styles.iconContainer}>
              <Image 
                source={iconSource} 
                style={[
                  styles.iconImage,
                  { tintColor: focused ? '#4694FD' : '#90C2FF' }
                ]} 
              />
            </View>
          );
        },
        tabBarActiveTintColor: '#4694FD',
        tabBarInactiveTintColor: '#90C2FF',
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'DMSans_500Medium',
          marginTop: 4,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={TripDetailsScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="Chat" 
        component={ChatScreen}
        options={{
          tabBarLabel: 'Chat',
        }}
      />
      <Tab.Screen 
        name="Notifications" 
        component={NotificationsScreen}
        options={{
          tabBarLabel: 'Notifications',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
});

export default BottomTabNavigator; 