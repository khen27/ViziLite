import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DMSans_400Regular, DMSans_500Medium } from '@expo-google-fonts/dm-sans';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { LinearGradient } from 'expo-linear-gradient';

type InterestsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Interests'>;

const Interests = () => {
  const navigation = useNavigation<InterestsNavigationProp>();

  const goToChatAsUserA = () => {
    navigation.navigate('Chat', { chatId: 'global', userId: 'userA' });
  };

  const goToChatAsUserB = () => {
    navigation.navigate('Chat', { chatId: 'global', userId: 'userB' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Firebase Chat Test</Text>
        <Text style={styles.subtitle}>Choose a user to test real-time messaging</Text>
        
        {/* User A Button */}
        <TouchableOpacity style={styles.chatButton} onPress={goToChatAsUserA}>
          <LinearGradient
            colors={['#3888F6', '#7965E0']}
            style={styles.buttonGradient}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          >
            <Text style={styles.buttonText}>Login as User A</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* User B Button */}
        <TouchableOpacity style={styles.chatButton} onPress={goToChatAsUserB}>
          <LinearGradient
            colors={['#FF6B6B', '#FF8E53']}
            style={styles.buttonGradient}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          >
            <Text style={styles.buttonText}>Login as User B</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.instructions}>
          Tap "User A" → send a message → go back{'\n'}
          Tap "User B" → see the message from A{'\n'}
          Send a reply → go back to A to see it!
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF2F9',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 32,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 16,
    color: 'rgba(0,0,0,0.6)',
    textAlign: 'center',
    marginBottom: 40,
  },
  chatButton: {
    width: 250,
    height: 55,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 20,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  instructions: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)',
    textAlign: 'center',
    marginTop: 30,
    lineHeight: 20,
  },
});

export default Interests; 