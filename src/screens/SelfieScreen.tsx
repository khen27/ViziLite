import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFonts, DMSans_400Regular, DMSans_500Medium, DMSans_600SemiBold } from '@expo-google-fonts/dm-sans';
import * as ImagePicker from 'expo-image-picker';
import { RootStackParamList } from '../../App';
import { StatusBar as ExpoStatusBar, StatusBarStyle } from 'expo-status-bar';

type SelfieScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Selfie'>;

const SelfieScreen = () => {
  const navigation = useNavigation<SelfieScreenNavigationProp>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
  });

  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
      Alert.alert('Permission needed', 'We need camera and photo library permissions to take or select photos.');
    }
  };

  const takePhoto = async () => {
    await requestPermissions();
    
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const uploadPhoto = async () => {
    await requestPermissions();
    
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

  const handleNext = () => {
    navigation.navigate('EmotionalCheckin');
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
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
          <Image source={require('../../assets/back-button.png')} style={styles.backButtonImage} resizeMode="contain" />
        </TouchableOpacity>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/mini-v.png')} style={styles.logoImage} resizeMode="contain" />
        </View>

        {/* Title */}
        <Text style={styles.mainTitle}>Drop a selfie!</Text>
        <Text style={styles.subtitle}>We need a bit more info to help you connect{"\n"}with others. Let's start with a profile pic.</Text>

        {/* Central Image Area with Decorative Elements */}
        <View style={styles.imageAreaContainer}>
          {/* Decorative dots */}
          <View style={[styles.decorativeDot, styles.dot1]} />
          <View style={[styles.decorativeDot, styles.dot2]} />
          <View style={[styles.decorativeDot, styles.dot3]} />
          
          {/* Central Image - Default or Selected */}
          <View style={styles.imageContainer}>
            {selectedImage ? (
              <TouchableOpacity onPress={uploadPhoto} activeOpacity={0.8} style={styles.selectedImageContainer}>
                <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
                <TouchableOpacity onPress={uploadPhoto} style={styles.editButton} activeOpacity={0.8}>
                  <Image source={require('../../assets/edit-image.png')} style={styles.editIcon} resizeMode="contain" />
                </TouchableOpacity>
              </TouchableOpacity>
            ) : (
              <Image source={require('../../assets/image-selfie.png')} style={styles.selfieImage} resizeMode="contain" />
            )}
          </View>
        </View>

        {/* Action Buttons - Only show if no image is selected */}
        {!selectedImage && (
          <>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={uploadPhoto}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#7965E0", "#3888F6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.uploadButtonGradient}
              >
                <Text style={styles.uploadButtonText}>Upload a photo</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={takePhoto} activeOpacity={0.7}>
              <Text style={styles.takePhotoText}>Take a photo</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Next Button - Only show when image is selected */}
        {selectedImage && (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
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
        )}

        <ExpoStatusBar style={(Platform.OS === 'ios' ? 'dark-content' : 'auto') as StatusBarStyle} />
      </View>
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
    marginTop: 46,
    marginBottom: 20,
    width: 37.5,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 37.5,
    height: 45,
  },
  mainTitle: {
    marginTop: 20,
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
  imageContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(70, 148, 253, 0.1)',
    borderRadius: 100,
  },
  selfieImage: {
    width: 60,
    height: 60,
  },
  selectedImageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    position: 'relative',
  },
  selectedImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  editButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  imageAreaContainer: {
    width: 300,
    height: 300,
    marginTop: 40,
    marginBottom: 60,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  decorativeDot: {
    position: 'absolute',
    borderRadius: 50,
  },
  dot1: {
    width: 16,
    height: 16,
    backgroundColor: '#7ACBFF',
    left: 20,
    top: 80,
  },
  dot2: {
    width: 12,
    height: 12,
    backgroundColor: '#4B91FB',
    right: 40,
    top: 120,
  },
  dot3: {
    width: 10,
    height: 10,
    backgroundColor: '#A3DBFF',
    right: 20,
    bottom: 60,
  },
  uploadButton: {
    width: '90%',
    maxWidth: 373,
    height: 55,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 20,
  },
  uploadButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  uploadButtonText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    lineHeight: 21,
    textAlign: 'center',
    letterSpacing: -0.05,
    color: '#FFFFFF',
  },
  takePhotoText: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 16,
    lineHeight: 21,
    textAlign: 'center',
    letterSpacing: -0.05,
    color: '#7468E2',
  },
  nextButton: {
    width: '90%',
    maxWidth: 373,
    height: 55,
    borderRadius: 50,
    overflow: 'hidden',
    marginTop: 20,
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

export default SelfieScreen; 