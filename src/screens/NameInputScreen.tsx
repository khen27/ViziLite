import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Pressable,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useFonts, DMSans_400Regular, DMSans_500Medium } from '@expo-google-fonts/dm-sans';
import { RootStackParamList } from '../../App';
import { StatusBar as ExpoStatusBar, StatusBarStyle } from 'expo-status-bar';

type NameInputNavigationProp = NativeStackNavigationProp<RootStackParamList, 'NameInput'>;

const NameInputScreen = () => {
  const navigation = useNavigation<NameInputNavigationProp>();
  const [name, setName] = useState('');
  const inputRef = useRef<TextInput>(null);

  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
  });

  useEffect(() => {
    // Auto-focus the input field to show keyboard
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
    if (name.trim()) {
      navigation.navigate('EmotionalCheckin');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <LinearGradient
          colors={['#EAF2F9', '#EAF2F9']}
          style={styles.background}
        >
          {/* Status Bar - removed extra dynamic island */}

          {/* Back Button */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <Image
              source={require('../../assets/back-button.png')}
              style={styles.backButtonImage}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Vizi Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/mini-v.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          {/* Main Content */}
          <Text style={styles.mainTitle}>What's your name?</Text>
          
          <Text style={styles.subtitle}>
            This is how it'll appear on your profile.{'\n'}You can't change this later.
          </Text>

          {/* Input Field */}
          <View style={styles.inputContainer}>
            <View style={styles.userIcon}>
              <Image
                source={require('../../assets/name-icon.png')}
                style={styles.userIconImage}
                resizeMode="contain"
              />
            </View>
            <TextInput
              ref={inputRef}
              style={styles.textInput}
              placeholder="Enter your first name"
              placeholderTextColor="#B2B2B2"
              value={name}
              onChangeText={setName}
              autoFocus={true}
              returnKeyType="next"
              onSubmitEditing={handleNext}
            />
          </View>

          {/* Next Button */}
          <TouchableOpacity
            style={[styles.nextButton, !name.trim() && styles.nextButtonDisabled]}
            onPress={handleNext}
            disabled={!name.trim()}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#7965E0', '#3888F6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.nextButtonGradient}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>

          <ExpoStatusBar style={(Platform.OS === 'ios' ? 'dark-content' : 'auto') as StatusBarStyle} />
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#EAF2F9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAF2F9',
  },
  container: {
    flex: 1,
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 10,
    top: 60,
    backgroundColor: '#EAF2F9',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonImage: {
    width: 28,
    height: 28,
  },
  logoContainer: {
    position: 'absolute',
    width: 30,
    height: 33.5,
    left: '50%',
    marginLeft: -15,
    top: 66,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 30,
    height: 33.5,
  },
  mainTitle: {
    position: 'absolute',
    width: 353,
    height: 42,
    left: 25,
    top: 126,
    fontFamily: 'DMSans_500Medium',
    fontSize: 32,
    lineHeight: 42,
    textAlign: 'center',
    letterSpacing: -0.05,
    color: '#000000',
  },
  subtitle: {
    position: 'absolute',
    width: 353,
    height: 48,
    left: 21,
    top: 178,
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    letterSpacing: -0.01,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  inputContainer: {
    position: 'absolute',
    width: 357,
    height: 50,
    left: '50%',
    marginLeft: -178.5,
    top: 285,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    borderWidth: 0.5,
    borderColor: '#B2B2B2',
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
  },
  userIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userIconImage: {
    width: 24,
    height: 24,
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontFamily: 'DMSans_400Regular',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.015,
    color: '#000000',
    paddingRight: 15,
  },
  nextButton: {
    position: 'absolute',
    width: 373,
    height: 55,
    left: '50%',
    marginLeft: -186.5,
    top: 398,
    borderRadius: 50,
    overflow: 'hidden',
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  nextButtonText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    lineHeight: 21,
    textAlign: 'center',
    letterSpacing: -0.05,
    color: '#FFFFFF',
  },
});

export default NameInputScreen; 