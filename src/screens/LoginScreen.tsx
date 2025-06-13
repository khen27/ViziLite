import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import React from 'react';
import { 
  StyleSheet, 
  View, 
  ImageBackground, 
  Image, 
  Text, 
  TouchableOpacity, 
  Platform, 
  Pressable, 
  SafeAreaView,
  ActivityIndicator 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, DMSans_400Regular, DMSans_500Medium } from '@expo-google-fonts/dm-sans';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3888F6" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/background-login.png')}
          style={styles.background}
          resizeMode="cover"
        >
          {/* Vizi Logo */}
          <Image
            source={require('../../assets/icon-vizi-letter.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Welcome Text */}
          <Text style={styles.welcome}>Welcome to Vizi</Text>
          
          {/* Location Text */}
          <Text style={styles.subtitle}>
            Join real-time group chats with others nearby who match your interests.
          </Text>

          {/* Apple Button */}
          <TouchableOpacity 
            style={styles.button} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('NameInput')}
          >
            <LinearGradient
              colors={["#7965E0", "#3888F6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Image
                source={require('../../assets/icon-apple.png')}
                style={styles.buttonIcon}
                resizeMode="contain"
              />
              <Text style={styles.buttonText}>Sign in with Apple</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Google Button */}
          <TouchableOpacity 
            style={[styles.button, styles.googleButton]} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('MainTabs')}
          >
            <View style={styles.buttonContent}>
              <Image
                source={require('../../assets/icon-google.png')}
                style={styles.buttonIcon}
                resizeMode="contain"
              />
              <Text style={styles.googleButtonText}>Sign in with Google</Text>
            </View>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>By continuing, you agree to our </Text>
            <Pressable>
              <Text style={[styles.footerText, styles.footerLink]}>Terms of Service</Text>
            </Pressable>
            <Text style={styles.footerText}> and </Text>
            <Pressable>
              <Text style={[styles.footerText, styles.footerLink]}>Privacy Policy</Text>
            </Pressable>
            <Text style={styles.footerText}>.</Text>
          </View>

          <StatusBar style={(Platform.OS === 'ios' ? 'light-content' : 'auto') as StatusBarStyle} />
        </ImageBackground>
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
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#3888F6',
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
    backgroundColor: '#EAF2F9',
  },
  logo: {
    position: 'absolute',
    width: 128,
    height: 150,
    left: '50%',
    marginLeft: -64,
    top: '20%',
  },
  welcome: {
    position: 'absolute',
    width: 353,
    height: 42,
    left: 21,
    top: '45%',
    fontFamily: 'DMSans_500Medium',
    fontSize: 32,
    lineHeight: 42,
    textAlign: 'center',
    letterSpacing: -0.05,
    color: '#000000',
    display: 'flex',
    alignItems: 'center',
  },
  subtitle: {
    position: 'absolute',
    width: 353,
    height: 48,
    left: 17,
    top: '52%',
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    letterSpacing: -0.01,
    color: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    width: 373,
    height: 55,
    left: '50%',
    marginLeft: -186.5,
    top: '65%',
    borderRadius: 50,
    overflow: 'hidden',
  },
  buttonGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  buttonContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  buttonIcon: {
    width: 28,
    height: 28,
  },
  buttonText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    lineHeight: 21,
    textAlign: 'center',
    letterSpacing: -0.05,
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
  },
  googleButton: {
    top: '73%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  googleButtonText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    lineHeight: 21,
    textAlign: 'center',
    letterSpacing: -0.05,
    color: '#000000',
    display: 'flex',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    width: 373,
    minHeight: 44,
    left: 7,
    bottom: '10%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  footerText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 12,
    lineHeight: 22,
    textAlign: 'center',
    letterSpacing: -0.015,
    color: '#000000',
  },
  footerLink: {
    color: '#3888F6',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen; 