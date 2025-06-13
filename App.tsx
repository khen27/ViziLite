import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/LoginScreen';
import NameInputScreen from './src/screens/NameInputScreen';
import BirthdayScreen from './src/screens/BirthdayScreen';
import SelfieScreen from './src/screens/SelfieScreen';
import InterestsScreen from './src/screens/InterestsScreen';
import EmotionalCheckin from './src/screens/EmotionalCheckin';
import Interests from './src/screens/Interests';
import ChatScreen from './src/screens/ChatScreen';
import TripDetails from './src/screens/TripDetails';
import { db } from './firebaseConfig';
import InstagramScreen from './src/screens/InstagramScreen';
import LinkedInScreen from './src/screens/LinkedInScreen';
import TabNavigator from './src/navigation/TabNavigator';
import { UserProvider } from './src/context/UserContext';
import { AuthProvider } from './src/context/AuthContext';

export type RootStackParamList = {
  Login: undefined;
  NameInput: undefined;
  Birthday: undefined;
  Selfie: undefined;
  EmotionalCheckin: undefined;
  Interests: undefined;
  Instagram: undefined;
  LinkedIn: undefined;
  MainTabs: undefined;
  Chat: { chatId?: string; userId?: string };
  TripDetails: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="NameInput" component={NameInputScreen} />
              <Stack.Screen name="Birthday" component={BirthdayScreen} />
              <Stack.Screen name="Selfie" component={SelfieScreen} />
              <Stack.Screen name="Interests" component={InterestsScreen} />
                          <Stack.Screen name="Instagram" component={InstagramScreen} />
            <Stack.Screen name="LinkedIn" component={LinkedInScreen} />
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen
              name="Chat"
              component={ChatScreen}
              initialParams={{ chatId: 'global', userId: 'userA' }}
              options={{ title: 'Chat', headerShown: true }}
            />
            <Stack.Screen name="TripDetails" component={TripDetails} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </UserProvider>
    </AuthProvider>
  );
}
