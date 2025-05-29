import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, ImageBackground, Image, Text, TouchableOpacity, Platform, Pressable } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, DMSans_400Regular, DMSans_500Medium } from '@expo-google-fonts/dm-sans';

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.root}>
      <ImageBackground
        source={require('./assets/background-login.png')}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Vector 3233 */}
        <Svg
          width={242.4}
          height={327.9}
          style={styles.vector3233}
          fill="none"
          viewBox="0 0 242.4 327.9"
        >
          <Path
            d="M556.649 137.464C522.379 138.926 453.317 152.852 451.226 196.857C448.611 251.862 531.572 224.524 536.025 204.156C540.478 183.788 533.845 136.277 392.997 181.141C252.148 226.005 407.032 380.772 495.085 308.731C583.139 236.69 360.158 195.323 367.32 317.095C374.481 438.868 515.439 425.663 532.173 385.397C548.908 345.13 427.99 371.562 476.456 442.037C515.229 498.417 584.562 464.994 606.189 413.991"
            stroke="#F2F9FF"
            strokeWidth={8.92255}
            transform="translate(-392.997 -136.277) rotate(-8.33)"
          />
        </Svg>
        {/* Vector 3232 */}
        <Svg
          width={292.3}
          height={429.09}
          style={styles.vector3232}
          fill="none"
          viewBox="0 0 292.3 429.09"
        >
          <Path
            d="M-166.993 614.773C-125.355 614.773 41.5714 607.338 7.36828 540.047C-26.8348 472.756 -159.186 590.608 -71.4476 651.951C16.2908 713.293 99.9397 668.314 80.6075 641.544C61.2753 614.773 -7.50263 685.041 56.8141 731.141C121.131 777.241 134.886 715.898 119.644 705.489C104.401 695.079 50.8657 690.618 46.4044 762.37C41.9431 834.122 -71.8193 771.664 -25.3477 731.141C21.1239 690.618 101.799 802.893 22.611 826.687C-17.2927 846.638 -100.669 871.894 -114.945 813.303C-132.79 740.064 62.3907 705.489 37.8536 869.812C37.4819 893.73 34.8051 927.586 22.611 949"
            stroke="#F2F9FF"
            strokeWidth={8.92255}
          />
        </Svg>
        {/* Ellipse 443 */}
        <Svg
          width={200}
          height={200}
          style={styles.ellipse443}
          fill="none"
          viewBox="0 0 200 200"
        >
          <Circle
            cx={100}
            cy={100}
            r={98}
            stroke="#F2F9FF"
            strokeWidth={4}
            strokeDasharray="8 8"
          />
        </Svg>
        {/* Vizi Logo */}
        <Image
          source={require('./assets/icon-vizi-letter.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        {/* Welcome to Vizi */}
        <Text style={styles.welcome}>Welcome to Vizi</Text>
        {/* Location Text */}
        <Text style={styles.locationText}>Join real-time group chats with others nearby who match your interests.</Text>
        {/* Apple Button */}
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
          <LinearGradient
            colors={["#7965E0", "#3888F6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonGradient}
          >
            <Image
              source={require('./assets/icon-apple.png')}
              style={styles.appleIcon}
              resizeMode="contain"
            />
            <Text style={styles.buttonText}>Sign in with Apple</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Google Button */}
        <TouchableOpacity style={[styles.button, styles.googleButton]} activeOpacity={0.8}>
          <View style={styles.googleButtonContent}>
            <Image
              source={require('./assets/icon-google.png')}
              style={styles.googleIcon}
              resizeMode="contain"
            />
            <Text style={styles.googleButtonText}>Sign in with Google</Text>
          </View>
        </TouchableOpacity>
        
        {/* Terms */}
        <View style={styles.terms}>
          <Text style={styles.termsText}>By continuing, you agree to our </Text>
          <Pressable onPress={() => {}}>
            <Text style={[styles.termsText, styles.termsLink]}>Terms of Service</Text>
          </Pressable>
          <Text style={styles.termsText}> and </Text>
          <Pressable onPress={() => {}}>
            <Text style={[styles.termsText, styles.termsLink]}>Privacy Policy</Text>
          </Pressable>
          <Text style={styles.termsText}>.</Text>
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  vector3233: {
    position: 'absolute',
    width: 242.4,
    height: 327.9,
    right: -174.92,
    top: 170.29,
  },
  vector3232: {
    position: 'absolute',
    width: 292.3,
    height: 429.09,
    left: -166.99,
    top: 519.91,
  },
  ellipse443: {
    position: 'absolute',
    width: 200,
    height: 200,
    left: 97,
    top: 400,
  },
  logo: {
    position: 'absolute',
    width: 128,
    height: 150,
    left: '50%',
    marginLeft: -64,
    top: 139,
  },
  welcome: {
    position: 'absolute',
    width: 353,
    height: 42,
    left: 21,
    top: 400,
    fontFamily: 'DMSans_500Medium',
    fontWeight: Platform.OS === 'ios' ? '500' : undefined,
    fontSize: 32,
    lineHeight: 42,
    textAlign: 'center',
    letterSpacing: -0.05,
    color: '#000',
  },
  locationText: {
    position: 'absolute',
    width: 353,
    height: 48,
    left: 17,
    top: 454,
    fontFamily: 'DMSans_500Medium',
    fontWeight: Platform.OS === 'ios' ? '500' : undefined,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    letterSpacing: -0.01,
    color: 'rgba(0,0,0,0.6)',
  },
  button: {
    position: 'absolute',
    width: 373,
    height: 52,
    left: '50%',
    marginLeft: -186.5,
    top: 545,
    borderRadius: 50,
    overflow: 'hidden',
  },
  buttonGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 12,
    borderRadius: 50,
  },
  appleIcon: {
    width: 28,
    height: 28,
    marginRight: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'DMSans_500Medium',
    fontWeight: Platform.OS === 'ios' ? '500' : undefined,
  },
  googleButton: {
    top: 612,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  googleButtonContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  googleIcon: {
    width: 28,
    height: 28,
    marginRight: 12,
  },
  googleButtonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'DMSans_500Medium',
    fontWeight: Platform.OS === 'ios' ? '500' : undefined,
  },
  terms: {
    position: 'absolute',
    width: 373,
    flexDirection: 'row',
    flexWrap: 'wrap',
    left: 7,
    top: 782,
    justifyContent: 'center',
  },
  termsText: {
    fontFamily: 'DMSans_400Regular',
    fontWeight: Platform.OS === 'ios' ? '400' : undefined,
    fontSize: 12,
    lineHeight: 22,
    textAlign: 'center',
    letterSpacing: -0.015,
    color: '#000',
  },
  termsLink: {
    color: '#3888F6',
    textDecorationLine: 'underline',
  },
});
