import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../../App';

type LinkedInNavigationProp = NativeStackNavigationProp<RootStackParamList, 'LinkedIn'>;

const LinkedInScreen = () => {
  const navigation = useNavigation<LinkedInNavigationProp>();
  const [linkedin, setLinkedin] = useState('');

  const handleContinue = () => {
    navigation.navigate('EmotionalCheckin');
  };

  const handleSkip = () => {
    navigation.navigate('EmotionalCheckin');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Image source={require('../../assets/back-button.png')} style={styles.backButtonImage} resizeMode="contain" />
          </TouchableOpacity>

          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image source={require('../../assets/mini-v.png')} style={styles.logoImage} resizeMode="contain" />
          </View>

          {/* Title */}
          <Text style={styles.title}>Link your LinkedIn?</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            This helps us verify you're a real traveler – and earn trust faster.
          </Text>

          {/* Input */}
          <View style={styles.inputContainer}>
            <Image source={require('../../assets/icon-link.png')} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="LinkedIn profile url"
              placeholderTextColor="#B2B2B2"
              value={linkedin}
              onChangeText={setLinkedin}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="url"
              returnKeyType="done"
            />
          </View>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip} activeOpacity={0.7}>
              <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.continueButton, !linkedin && styles.continueButtonDisabled]}
              onPress={handleContinue}
              activeOpacity={linkedin ? 0.8 : 1}
              disabled={!linkedin}
            >
              <LinearGradient
                colors={linkedin ? ["#7468E2", "#3C87F5"] : ["#CCCCCC", "#AAAAAA"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.continueButtonGradient}
              >
                <Text style={styles.continueButtonText}>Next</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EAF2F9',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 10,
    top: 20,
    backgroundColor: '#EAF2F9',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  backButtonImage: {
    width: 28,
    height: 28,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 20,
    width: 30,
    height: 33.5,
    justifyContent: 'center',
  },
  logoImage: {
    width: 30,
    height: 33.5,
  },
  title: {
    fontSize: 32,
    fontFamily: 'DMSans_500Medium',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 42,
    letterSpacing: -0.05,
    marginBottom: 10,
    marginTop: 30,
    width: '90%',
    maxWidth: 353,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'DMSans_500Medium',
    color: 'rgba(0, 0, 0, 0.6)',
    textAlign: 'center',
    lineHeight: 24,
    letterSpacing: -0.01,
    marginBottom: 32,
    width: '90%',
    maxWidth: 353,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#B2B2B2',
    borderRadius: 25,
    backgroundColor: '#FFF',
    width: '95%',
    maxWidth: 357,
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 40,
  },
  inputIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    fontFamily: 'DMSans_400Regular',
    fontSize: 17,
    color: '#000',
    height: 50,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 10,
    marginTop: 10,
  },
  skipButton: {
    width: 108,
    height: 50,
    backgroundColor: '#EEF5FA',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButtonText: {
    fontFamily: 'DM Sans',
    fontWeight: '500',
    fontSize: 16,
    color: '#000',
  },
  continueButton: {
    width: 235,
    height: 50,
    borderRadius: 50,
    overflow: 'hidden',
  },
  continueButtonDisabled: {
    opacity: 0.6,
  },
  continueButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  continueButtonText: {
    fontFamily: 'DM Sans',
    fontWeight: '500',
    fontSize: 16,
    color: '#FFF',
  },
});

export default LinkedInScreen; 