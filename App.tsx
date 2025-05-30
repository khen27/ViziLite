import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/LoginScreen';
import EmotionalCheckin from './src/screens/EmotionalCheckin';

export type RootStackParamList = {
  Login: undefined;
  EmotionalCheckin: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="EmotionalCheckin" component={EmotionalCheckin} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
