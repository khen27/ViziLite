import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Share,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import Svg, { Path, Mask, G } from 'react-native-svg';
import { useUser } from '../context/UserContext';

const interests = [
  { emoji: '🏸', label: 'Badminton' },
  { emoji: '🍽️', label: 'Food' },
  { emoji: '🥤', label: 'Drinks' },
  { emoji: '🚴', label: 'Cycling' },
  { emoji: '🍷', label: 'Wine' },
];

const ProfileScreen = () => {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });
  const { user } = useUser();

  const handleShare = async () => {
    try {
      await Share.share({
        message: "Hey, this is my profile on Vizi! You should join me ✨",
        url: "https://vizi.app/profile/" + encodeURIComponent(user.name),
      });
    } catch (error) {
      console.error("Error sharing profile:", error);
    }
  };

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <LinearGradient
        colors={['#7389EC', '#4694FD']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.contentContainer}>
          <StatusBar barStyle="light-content" />
          
          {/* Header/Background Image */}
          <ImageBackground 
            source={require('../../assets/vizi-mvp-assets.png/gym-background.png')} 
            style={styles.headerImage}
            imageStyle={{ opacity: 1 }}
          >
            <View style={styles.gradientOverlay} />
            <LinearGradient
              colors={['transparent', '#EAF2F9']}
              style={styles.headerGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
            
            {/* Header Row */}
            <View style={styles.headerRow}>
              <View style={styles.transparentView} />
            </View>
          </ImageBackground>
          
          {/* Profile Image */}
          <View style={styles.profileImageContainer}>
            <Image 
              source={user.avatar ? { uri: user.avatar } : require('../../assets/vizi-mvp-assets.png/profile-pic.png')}
              style={styles.profileImage}
            />
          </View>
          
          <View style={styles.contentWrapper}>
            <SafeAreaView style={styles.safeArea}>
              <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.content}>
                  {/* Profile information */}
                  <View style={styles.profileInfoContainer}>
                    {/* Full name */}
                    <Text style={styles.fullNameText}>{user.name}</Text>
                    
                    {/* Location information */}
                    <View style={styles.locationContainer}>
                      <View style={styles.flagContainer}>
                        <Svg width="24" height="18" viewBox="0 0 78 59" fill="none">
                          <Mask id="mask0_1_27" style={{maskType: 'luminance'}} maskUnits="userSpaceOnUse" x="0" y="0" width="78" height="59">
                            <Path d="M0 0H77.4V58.05H0V0Z" fill="white"/>
                          </Mask>
                          <G mask="url(#mask0_1_27)">
                            <Path fillRule="evenodd" clipRule="evenodd" d="M0 0V58.05H77.4V0H0Z" fill="#E31D1C"/>
                            <Mask id="mask1_1_27" style={{maskType: 'luminance'}} maskUnits="userSpaceOnUse" x="0" y="0" width="78" height="59">
                              <Path fillRule="evenodd" clipRule="evenodd" d="M0 0V58.05H77.4V0H0Z" fill="white"/>
                            </Mask>
                            <G mask="url(#mask1_1_27)">
                              <Path fillRule="evenodd" clipRule="evenodd" d="M0 -4.83749V29.025H77.4V-4.83749H0Z" fill="#F7FCFF"/>
                            </G>
                            <Path fillRule="evenodd" clipRule="evenodd" d="M0 0V58.05L43.5375 29.025L0 0Z" fill="#3D58DB"/>
                          </G>
                        </Svg>
                      </View>
                      <Text style={styles.locationText}>{user.location}</Text>
                      <Text style={styles.dot}>•</Text>
                      <Text style={styles.friendsText}>{user.friends}</Text>
                    </View>
                    
                    {/* Interest icons */}
                    <View style={styles.interestsWrapper}>
                      <ScrollView 
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.interestsContainer}
                      >
                        {(user.interests.length > 0 ? user.interests : [
                          { emoji: '✈️', label: 'Travel' },
                          { emoji: '🍔', label: 'Food' },
                          { emoji: '🌊', label: 'Sea' },
                          { emoji: '🏸', label: 'Badminton' },
                          { emoji: '☕', label: 'Coffee' },
                        ]).slice(0, 5).map((interest, index) => (
                          <View key={index} style={styles.interestItem}>
                            <View style={styles.interestIconButton}>
                              <Text style={styles.interestEmoji}>{interest.emoji}</Text>
                            </View>
                            <Text style={styles.interestLabel} numberOfLines={1} ellipsizeMode="tail">{interest.label}</Text>
                          </View>
                        ))}
                      </ScrollView>
                    </View>
                    
                    {/* Profile action buttons */}
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.editButtonText}>Edit Profile</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                        <Text style={styles.shareButtonText}>Share Profile</Text>
                      </TouchableOpacity>
                    </View>
                    
                    {/* Bio text */}
                    <Text style={styles.bioText}>{user.bio}</Text>
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
          </View>
        </View>
        
        <View style={styles.homeIndicator} />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAF2F9',
  },
  contentContainer: {
    position: 'absolute',
    width: '100%',
    height: '86%',
    backgroundColor: '#EAF2F9',
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    shadowColor: 'rgba(11, 19, 66, 0.5)',
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 100,
    shadowOpacity: 0.5,
    elevation: 10,
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: 250,
    position: 'relative',
  },
  gradientOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    zIndex: 1,
  },
  headerGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 20,
    top: 60,
    zIndex: 3,
  },
  transparentView: {
    width: 40,
    height: 40,
  },
  contentWrapper: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: '#EAF2F9',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#EAF2F9',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#EAF2F9',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
    paddingTop: 15,
    backgroundColor: '#EAF2F9',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
    backgroundColor: '#EAF2F9',
  },
  profileInfoContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
    backgroundColor: 'transparent',
  },
  fullNameText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 36,
    lineHeight: 40,
    textAlign: 'center',
    letterSpacing: -1.8,
    color: '#000000',
    width: '100%',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    height: 24,
    backgroundColor: 'transparent',
  },
  flagContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  locationText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
  },
  dot: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
  },
  friendsText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    lineHeight: 24,
    color: '#FF3B30',
  },
  interestsWrapper: {
    width: '100%',
    height: 80,
    marginTop: 16,
    backgroundColor: 'transparent',
  },
  interestsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 16,
  },
  interestItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    minWidth: 48,
    height: 80,
    backgroundColor: 'transparent',
  },
  interestIconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: '#EAF2F9',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 0,
  },
  interestEmoji: {
    fontSize: 22,
    lineHeight: 26,
    backgroundColor: 'transparent',
    marginTop: 1,
  },
  interestLabel: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
    lineHeight: 16,
    color: '#000000',
    backgroundColor: 'transparent',
    width: 'auto',
    textAlign: 'center',
    flexShrink: 1,
    flexGrow: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    gap: 10,
    marginTop: 16,
    backgroundColor: 'transparent',
  },
  editButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#1F41BB',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
  },
  editButtonText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    lineHeight: 20,
    color: '#FFFFFF',
    letterSpacing: -0.24,
  },
  shareButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  shareButtonText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    lineHeight: 20,
    color: '#000000',
    letterSpacing: -0.24,
  },
  bioText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    letterSpacing: -0.24,
    color: '#000000',
    marginTop: 16,
  },
  homeIndicator: {
    width: 134,
    height: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
  },
  profileImageContainer: {
    position: 'absolute',
    width: 140,
    height: 140,
    left: '50%',
    marginLeft: -70,
    top: 170,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: 'transparent',
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
  },
});

export default ProfileScreen; 