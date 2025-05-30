import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/LoginScreen';
import EmotionalCheckin from './src/screens/EmotionalCheckin';
import Interests from './src/screens/Interests';
import ChatScreen from './src/screens/ChatScreen';
import TripDetails from './src/screens/TripDetails';
import { db } from './firebaseConfig';

export type RootStackParamList = {
  Login: undefined;
  EmotionalCheckin: undefined;
  Interests: undefined;
  Chat: { chatId?: string; userId?: string };
  TripDetails: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="EmotionalCheckin" component={EmotionalCheckin} />
          <Stack.Screen name="Interests" component={Interests} />
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
  );
}
