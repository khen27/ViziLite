import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFonts, DMSans_400Regular, DMSans_500Medium } from '@expo-google-fonts/dm-sans';
import { LinearGradient } from 'expo-linear-gradient';

type RootStackParamList = {
  Instagram: undefined;
  LinkedIn: undefined;
  EmotionalCheckin: undefined;
};

type LinkedInNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LinkedInScreen = () => {
  const navigation = useNavigation<LinkedInNavigationProp>();
  const [linkedin, setLinkedin] = useState('');
  const inputRef = useRef<TextInput>(null);

  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
  });

  useEffect(() => {
    // Auto-focus the input field
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const handleNext = () => {
    navigation.navigate('EmotionalCheckin');
  };

  const handleSkip = () => {
    navigation.navigate('EmotionalCheckin');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -50 : 20}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Image source={require('../../assets/back-button.png')} style={styles.backIcon} />
          </TouchableOpacity>

          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image source={require('../../assets/mini-v.png')} style={styles.logo} />
          </View>

          {/* Title */}
          <Text style={styles.title}>Link your LinkedIn?</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            This helps us verify you're a real traveler – and earn trust faster.
          </Text>

          {/* Input Container */}
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>💼</Text>
            </View>
            <TextInput
              ref={inputRef}
              style={styles.textInput}
              placeholder="LinkedIn profile url"
              placeholderTextColor="#B2B2B2"
              value={linkedin}
              onChangeText={setLinkedin}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={handleNext}
            />
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <LinearGradient
                colors={['#7468E2', '#3C87F5']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Text style={styles.nextButtonText}>Next</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EAF2F9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAF2F9',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EAF2F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: -10,
  },
  backIcon: {
    width: 28,
    height: 28,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 60,
  },
  logo: {
    width: 30,
    height: 33.5,
  },
  title: {
    fontSize: 32,
    fontFamily: 'DMSans_500Medium',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 42,
    letterSpacing: -0.05 * 32,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'DMSans_500Medium',
    color: 'rgba(0, 0, 0, 0.6)',
    textAlign: 'center',
    lineHeight: 24,
    letterSpacing: -0.01 * 16,
    marginBottom: 60,
    paddingHorizontal: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: '#B2B2B2',
    marginBottom: 60,
    height: 50,
    paddingLeft: 15,
  },
  iconContainer: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  inputIcon: {
    width: 24,
    height: 24,
  },
  iconText: {
    fontSize: 20,
    color: '#666',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'DMSans_400Regular',
    color: '#000000',
    paddingRight: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  skipButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#EEF5FA',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButtonText: {
    fontSize: 16,
    fontFamily: 'DMSans_500Medium',
    color: '#000000',
    letterSpacing: -0.015 * 16,
  },
  nextButton: {
    flex: 2.17,
  },
  gradientButton: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: 'DMSans_500Medium',
    color: '#FFFFFF',
    letterSpacing: -0.015 * 16,
  },
});

export default LinkedInScreen; 