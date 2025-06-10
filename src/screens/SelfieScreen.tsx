import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFonts, DMSans_400Regular, DMSans_500Medium } from '@expo-google-fonts/dm-sans';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

type RootStackParamList = {
  Birthday: undefined;
  Selfie: undefined;
  Instagram: undefined;
  LinkedIn: undefined;
  EmotionalCheckin: undefined;
};

type SelfieNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SelfieScreen = () => {
  const navigation = useNavigation<SelfieNavigationProp>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your photos.');
      return false;
    }
    return true;
  };

  const requestCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your camera.');
      return false;
    }
    return true;
  };

  const pickImageFromLibrary = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const hasPermission = await requestCameraPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleNext = () => {
    navigation.navigate('Instagram');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleEditImage = () => {
    pickImageFromLibrary();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Image source={require('../../assets/back-button.png')} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/mini-v.png')} style={styles.logo} />
      </View>

      {/* Title */}
      <Text style={styles.title}>Drop a selfie!</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        We need a bit more info to help you connect with others. Let's start with a profile pic.
      </Text>

      {/* Image Area */}
      <View style={styles.imageAreaContainer}>
        {/* Decorative blue dots */}
        <View style={[styles.decorativeDot, { backgroundColor: '#7ACBFF', top: 50, left: 20 }]} />
        <View style={[styles.decorativeDot, { backgroundColor: '#4B91FB', top: 80, right: 30 }]} />
        <View style={[styles.decorativeDot, { backgroundColor: '#A3DBFF', bottom: 60, left: 40 }]} />
        
        <View style={styles.imageContainer}>
          {selectedImage ? (
            <>
              <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
              <TouchableOpacity style={styles.editButton} onPress={handleEditImage}>
                <Text style={styles.editText}>✏️</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderIcon}>👤</Text>
            </View>
          )}
        </View>
      </View>

      {/* Upload/Camera Buttons or Next Button */}
      {!selectedImage ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.uploadButton} onPress={pickImageFromLibrary}>
            <Text style={styles.uploadButtonText}>Upload from library</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
            <LinearGradient
              colors={['#7965E0', '#3888F6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <Text style={styles.cameraButtonText}>Take photo</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.nextButtonContainer} onPress={handleNext}>
          <LinearGradient
            colors={['#7965E0', '#3888F6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.nextButton}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EAF2F9',
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAF2F9',
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
    marginBottom: 40,
    paddingHorizontal: 5,
  },
  imageAreaContainer: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
    position: 'relative',
  },
  decorativeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: 'absolute',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    position: 'relative',
  },
  selectedImage: {
    width: 196,
    height: 196,
    borderRadius: 98,
  },
  placeholderImage: {
    width: 80,
    height: 80,
    opacity: 0.3,
  },
  placeholderContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4694FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    fontSize: 40,
    color: '#FFFFFF',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    width: 24,
    height: 24,
  },
  editText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  buttonContainer: {
    gap: 15,
  },
  uploadButton: {
    height: 50,
    backgroundColor: '#EEF5FA',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButtonText: {
    fontSize: 16,
    fontFamily: 'DMSans_500Medium',
    color: '#000000',
    letterSpacing: -0.015 * 16,
  },
  cameraButton: {
    height: 50,
  },
  gradientButton: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButtonText: {
    fontSize: 16,
    fontFamily: 'DMSans_500Medium',
    color: '#FFFFFF',
    letterSpacing: -0.015 * 16,
  },
  nextButtonContainer: {
    width: '100%',
  },
  nextButton: {
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

export default SelfieScreen; 