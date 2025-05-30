import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { useFonts, DMSans_400Regular, DMSans_500Medium } from '@expo-google-fonts/dm-sans';
import { LinearGradient } from 'expo-linear-gradient';

type EmotionalCheckinNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EmotionalCheckin'>;

const EmotionalCheckin = () => {
  const navigation = useNavigation<EmotionalCheckinNavigationProp>();
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
  });

  const moods = [
    { emoji: '😀', label: 'Happy' },
    { emoji: '😕', label: 'Sad' },
    { emoji: '⚡️', label: 'Energetic' },
    { emoji: '😴', label: 'Tired' },
    { emoji: '🧘', label: 'Relaxed' },
    { emoji: '🎉', label: 'Social' },
  ];

  const handleMoodSelect = (mood: string) => {
    console.log('Selected mood:', mood);
    navigation.navigate('Interests');
  };

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3888F6" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/icon-vizi-letter.png')} 
          style={styles.logo} 
        />
      </View>
      <Text style={styles.title}>How are you feeling?</Text>
      <Text style={styles.subtitle}>
        We'll suggest something meaningful that matches your vibe.
      </Text>
      <View style={styles.grid}>
        {moods.map((m, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => handleMoodSelect(m.label)}
            style={[styles.moodButton, { width: buttonSize, height: buttonSize }]}
          >
            <LinearGradient
              colors={['#3888F6', '#7965E0']}
              style={styles.moodGradient}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            >
              <Text style={styles.emoji}>{m.emoji}</Text>
              <Text style={styles.label}>{m.label}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const buttonSize = (width - 60) / 2;  // 20px margin each side + 20px between

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#EAF2F9', 
    alignItems: 'center' 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#3888F6',
  },
  header: { 
    marginTop: 20 
  },
  logo: { 
    width: 50, 
    height: 50, 
    resizeMode: 'contain' 
  },
  title: { 
    fontFamily: 'DMSans_500Medium',
    fontSize: 32, 
    color: '#000', 
    textAlign: 'center', 
    marginTop: 20 
  },
  subtitle: { 
    fontFamily: 'DMSans_500Medium',
    fontSize: 16, 
    color: 'rgba(0,0,0,0.6)', 
    textAlign: 'center', 
    marginTop: 10, 
    paddingHorizontal: 20 
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 30,
    width: '100%'
  },
  moodButton: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  moodGradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  emoji: { 
    fontSize: 64,
    marginBottom: 8
  },
  label: { 
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    color: '#FFFFFF'
  },
});

export default EmotionalCheckin; 