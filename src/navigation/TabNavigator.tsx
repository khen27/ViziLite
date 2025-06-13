import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import { QuestionIcon, ChatIcon, ProfileIcon } from '../components/icons/TabBarIcons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#3888F6',
        tabBarInactiveTintColor: '#B2B2B2',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <QuestionIcon color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <ChatIcon color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <ProfileIcon color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator; 