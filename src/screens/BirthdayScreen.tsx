import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFonts, DMSans_400Regular, DMSans_500Medium } from '@expo-google-fonts/dm-sans';
import { RootStackParamList } from '../../App';
import { StatusBar as ExpoStatusBar, StatusBarStyle } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const isValidDate = (digits: string[]) => {
  if (digits.some(d => d.length !== 1)) return false;
  const year = digits.slice(0, 4).join('');
  const month = digits.slice(4, 6).join('');
  const day = digits.slice(6, 8).join('');
  if (year.length !== 4 || month.length !== 2 || day.length !== 2) return false;
  const y = parseInt(year, 10);
  const m = parseInt(month, 10);
  const d = parseInt(day, 10);
  if (isNaN(y) || isNaN(m) || isNaN(d)) return false;
  if (m < 1 || m > 12) return false;
  if (d < 1 || d > 31) return false;
  const date = new Date(y, m - 1, d);
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d
  ) {
    return false;
  }
  // Check age >= 18
  const today = new Date();
  const age = today.getFullYear() - y - (today.getMonth() + 1 < m || (today.getMonth() + 1 === m && today.getDate() < d) ? 1 : 0);
  return age >= 18;
};

type BirthdayScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Birthday'>;

const BirthdayScreen = () => {
  const navigation = useNavigation<BirthdayScreenNavigationProp>();
  const [digits, setDigits] = useState(Array(8).fill(''));
  const inputs = Array.from({ length: 8 }, () => useRef<TextInput>(null));
  const insets = useSafeAreaInsets();

  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
  });

  useEffect(() => {
    // Auto-focus the first input
    const timer = setTimeout(() => {
      inputs[0].current?.focus();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleDigitChange = (idx: number, val: string) => {
    if (!/^[0-9]?$/.test(val)) return;
    const newDigits = [...digits];
    newDigits[idx] = val;
    setDigits(newDigits);
    if (val && idx < 7) {
      inputs[idx + 1].current?.focus();
    }
    if (!val && idx > 0) {
      // If cleared, stay or go back
      inputs[idx - 1].current?.focus();
    }
  };

  const handleKeyPress = (idx: number, e: any) => {
    if (e.nativeEvent.key === 'Backspace' && digits[idx] === '' && idx > 0) {
      inputs[idx - 1].current?.focus();
    }
  };

  const handleNext = () => {
    if (isValidDate(digits)) {
      navigation.navigate('Selfie');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

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
          <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
            <Image source={require('../../assets/back-button.png')} style={styles.backButtonImage} resizeMode="contain" />
          </TouchableOpacity>

          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image source={require('../../assets/mini-v.png')} style={styles.logoImage} resizeMode="contain" />
          </View>

          {/* Title */}
          <Text style={styles.mainTitle}>Your birthday?</Text>
          <Text style={styles.subtitle}>You need to be at least 18 years old.{"\n"}Your age isn't public.</Text>

          {/* Segmented Input */}
          <View style={styles.segmentedInputRow}>
            {[0, 1, 2, 3].map(i => (
              <TextInput
                key={i}
                ref={inputs[i]}
                style={[styles.segmentInput, { width: 12, height: 25 }]}
                placeholder="Y"
                placeholderTextColor="#C6C5C7"
                keyboardType="number-pad"
                maxLength={1}
                value={digits[i]}
                onChangeText={val => handleDigitChange(i, val)}
                onKeyPress={e => handleKeyPress(i, e)}
                returnKeyType="next"
              />
            ))}
            <Text style={[styles.segmentDivider, { width: 8, height: 25 }]}>/</Text>
            {[4, 5].map(i => (
              <TextInput
                key={i}
                ref={inputs[i]}
                style={[styles.segmentInput, { width: 17, height: 25 }]}
                placeholder="M"
                placeholderTextColor="#C6C5C7"
                keyboardType="number-pad"
                maxLength={1}
                value={digits[i]}
                onChangeText={val => handleDigitChange(i, val)}
                onKeyPress={e => handleKeyPress(i, e)}
                returnKeyType="next"
              />
            ))}
            <Text style={[styles.segmentDivider, { width: 8, height: 25 }]}>/</Text>
            {[6, 7].map(i => (
              <TextInput
                key={i}
                ref={inputs[i]}
                style={[styles.segmentInput, { width: 14, height: 25 }]}
                placeholder="D"
                placeholderTextColor="#C6C5C7"
                keyboardType="number-pad"
                maxLength={1}
                value={digits[i]}
                onChangeText={val => handleDigitChange(i, val)}
                onKeyPress={e => handleKeyPress(i, e)}
                returnKeyType="done"
                onSubmitEditing={handleNext}
              />
            ))}
          </View>

          {/* Next Button */}
          <TouchableOpacity
            style={[styles.nextButton, !isValidDate(digits) && styles.nextButtonDisabled]}
            onPress={handleNext}
            disabled={!isValidDate(digits)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#7965E0", "#3888F6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.nextButtonGradient}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>

          <ExpoStatusBar style={(Platform.OS === 'ios' ? 'dark-content' : 'auto') as StatusBarStyle} />
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
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 120,
    minHeight: '100%',
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
    marginTop: 80,
    marginBottom: 20,
    width: 30,
    height: 33.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 30,
    height: 33.5,
  },
  mainTitle: {
    marginTop: 30,
    width: '90%',
    maxWidth: 353,
    fontFamily: 'DMSans_500Medium',
    fontSize: 32,
    lineHeight: 42,
    textAlign: 'center',
    letterSpacing: -0.05,
    color: '#000000',
  },
  subtitle: {
    marginTop: 16,
    width: '90%',
    maxWidth: 353,
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    letterSpacing: -0.01,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  segmentedInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    maxWidth: 280,
    height: 25,
    marginTop: 60,
    marginBottom: 20,
    justifyContent: 'center',
    gap: 12,
  },
  segmentInput: {
    borderBottomWidth: 1.5,
    borderColor: '#C6C5C7',
    fontFamily: 'DMSans_400Regular',
    fontSize: 19.1,
    lineHeight: 25,
    color: '#000',
    textAlign: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 0,
  },
  segmentDivider: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 19.1,
    lineHeight: 25,
    color: '#C6C5C7',
    textAlign: 'center',
  },
  nextButton: {
    width: '90%',
    maxWidth: 373,
    height: 55,
    marginTop: 40,
    marginBottom: 40,
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

export default BirthdayScreen; 