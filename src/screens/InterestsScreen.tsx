import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFonts, DMSans_400Regular, DMSans_500Medium } from '@expo-google-fonts/dm-sans';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../../App';

type InterestsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Interests'>;

interface Interest {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  interests: Interest[];
}

const InterestsScreen = () => {
  const navigation = useNavigation<InterestsNavigationProp>();
  const [selectedInterests, setSelectedInterests] = useState<Set<string>>(new Set());
  
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
  });

  const categories: Category[] = [
    {
      id: 'adventure',
      name: 'Adventure',
      interests: [
        { id: 'hiking', name: '🥾 Hiking' },
        { id: 'camping', name: '🏕️ Camping' },
        { id: 'kayaking', name: '🛶 Kayaking' },
        { id: 'surfing', name: '🏄 Surfing' },
        { id: 'snow-sports', name: '⛷️ Snow Sports' },
        { id: 'climbing', name: '🧗 Climbing' },
        { id: 'cycling', name: '🚴 Cycling' },
        { id: 'beach-days', name: '🏖️ Beach Days' },
        { id: 'day-trips', name: '🗺️ Day Trips' },
      ]
    },
    {
      id: 'sports',
      name: 'Sports',
      interests: [
        { id: 'soccer', name: '⚽ Soccer' },
        { id: 'basketball', name: '🏀 Basketball' },
        { id: 'tennis', name: '🎾 Tennis' },
        { id: 'running', name: '🏃 Running' },
        { id: 'swimming', name: '🏊 Swimming' },
        { id: 'volleyball', name: '🏐 Volleyball' },
        { id: 'martial-arts', name: '🥋 Martial Arts' },
        { id: 'table-tennis', name: '🏓 Table Tennis' },
        { id: 'gym', name: '💪 Gym' },
      ]
    },
    {
      id: 'culture',
      name: 'Culture',
      interests: [
        { id: 'museums', name: '🏛️ Museums' },
        { id: 'live-music', name: '🎵 Live Music' },
        { id: 'theatre', name: '🎭 Theatre' },
        { id: 'painting', name: '🎨 Painting' },
        { id: 'photography', name: '📸 Photography' },
        { id: 'movies', name: '🎬 Movies' },
        { id: 'festivals', name: '🎪 Festivals' },
        { id: 'live-shows', name: '❤️ Live Shows' },
      ]
    },
    {
      id: 'food-drink',
      name: 'Food & Drink',
      interests: [
        { id: 'foodie', name: '🍽️ Foodie' },
        { id: 'coffee', name: '☕ Coffee' },
        { id: 'craft-beer', name: '🍺 Craft Beer' },
        { id: 'cooking-classes', name: '🍳 Cooking Classes' },
        { id: 'wine-tasting', name: '🍷 Wine Tasting' },
        { id: 'dessert', name: '🍰 Dessert' },
        { id: 'street-food', name: '🥙 Street Food' },
        { id: 'brunch', name: '🥞 Brunch' },
      ]
    },
    {
      id: 'social-fun',
      name: 'Social Fun',
      interests: [
        { id: 'karaoke', name: '🎤 Karaoke' },
        { id: 'bowling', name: '🎳 Bowling' },
        { id: 'nightlife', name: '🌃 Nightlife' },
        { id: 'board-games', name: '🎯 Board Games' },
        { id: 'dj-nights', name: '🎧 DJ Nights' },
        { id: 'dance-nights', name: '💃 Dance Nights' },
        { id: 'social-games', name: '🎲 Social Games' },
        { id: 'arcade-runs', name: '🕹️ Arcade Runs' },
      ]
    },
    {
      id: 'wellness-chill',
      name: 'Wellness & Chill',
      interests: [
        { id: 'yoga', name: '🧘 Yoga' },
        { id: 'sauna-spa', name: '🧖 Sauna & Spa' },
        { id: 'sunrise-catch', name: '🌅 Sunrise Catch' },
        { id: 'sunset-watch', name: '🌇 Sunset Watch' },
        { id: 'stargazing', name: '⭐ Stargazing' },
        { id: 'botanical-gardens', name: '🌿 Botanical Gardens' },
        { id: 'park-picnics', name: '🌳 Park Picnics' },
        { id: 'scenic-views', name: '🏞️ Scenic Views' },
      ]
    },
    {
      id: 'learn-create',
      name: 'Learn & Create',
      interests: [
        { id: 'coding', name: '💻 Coding' },
        { id: 'language-exchange', name: '🗣️ Language Exchange' },
        { id: 'tech-gadgets', name: '📱 Tech & Gadgets' },
        { id: 'ai-meetups', name: '🤖 AI Meetups' },
        { id: 'science-talks', name: '🔬 Science Talks' },
        { id: 'guided-tours', name: '🎯 Guided Tours' },
        { id: 'coworking', name: '💼 Coworking' },
      ]
    },
    {
      id: 'faith-spirituality',
      name: 'Faith & Spirituality',
      interests: [
        { id: 'christianity', name: '✝️ Christianity' },
        { id: 'islam', name: '☪️ Islam' },
        { id: 'judaism', name: '✡️ Judaism' },
        { id: 'hinduism', name: '🕉️ Hinduism' },
        { id: 'buddhism', name: '☸️ Buddhism' },
        { id: 'prayer-worship', name: '🙏 Prayer & Worship' },
        { id: 'interfaith-dialogue', name: '💫 Interfaith Dialogue' },
        { id: 'mindful-living', name: '🧠 Mindful Living' },
      ]
    }
  ];

  const handleInterestToggle = (interestId: string) => {
    const newSelected = new Set(selectedInterests);
    if (newSelected.has(interestId)) {
      newSelected.delete(interestId);
    } else {
      newSelected.add(interestId);
    }
    setSelectedInterests(newSelected);
  };

  const handleSelectAll = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    const newSelected = new Set(selectedInterests);
    const categoryInterests = category.interests.map(i => i.id);
    const allSelected = categoryInterests.every(id => newSelected.has(id));

    if (allSelected) {
      // Deselect all
      categoryInterests.forEach(id => newSelected.delete(id));
    } else {
      // Select all
      categoryInterests.forEach(id => newSelected.add(id));
    }
    setSelectedInterests(newSelected);
  };

  const isCategoryFullySelected = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return false;
    return category.interests.every(interest => selectedInterests.has(interest.id));
  };

  const handleNext = () => {
    if (selectedInterests.size >= 10) {
      navigation.navigate('Instagram');
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
        <Text style={styles.title}>Your favorite things?</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Choose at least 10 interests - we'll use this to{'\n'}spark personalized matches for you.
        </Text>

        {/* Scrollable Content */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {categories.map((category, categoryIndex) => (
            <View key={category.id} style={styles.categoryContainer}>
              {/* Category Header */}
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryTitle}>{category.name}</Text>
                <TouchableOpacity 
                  style={styles.selectAllContainer}
                  onPress={() => handleSelectAll(category.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.selectAllText}>Select all</Text>
                  <View style={[
                    styles.selectAllCircle,
                    isCategoryFullySelected(category.id) && styles.selectAllCircleSelected
                  ]}>
                    {isCategoryFullySelected(category.id) && (
                      <View style={styles.selectAllDot} />
                    )}
                  </View>
                </TouchableOpacity>
              </View>

              {/* Interest Buttons */}
              <View style={styles.interestsGrid}>
                {category.interests.map((interest) => (
                  <TouchableOpacity
                    key={interest.id}
                    style={[
                      styles.interestButton,
                      selectedInterests.has(interest.id) && styles.interestButtonSelected
                    ]}
                    onPress={() => handleInterestToggle(interest.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={[
                      styles.interestText,
                      selectedInterests.has(interest.id) && styles.interestTextSelected
                    ]}>
                      {interest.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          {/* Bottom spacing */}
          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Confirm Button */}
        <TouchableOpacity
          style={[styles.confirmButton, selectedInterests.size < 10 && styles.confirmButtonDisabled]}
          onPress={handleNext}
          activeOpacity={selectedInterests.size >= 10 ? 0.8 : 1}
          disabled={selectedInterests.size < 10}
        >
          <LinearGradient
            colors={selectedInterests.size >= 10 ? ["#7965E0", "#3888F6"] : ["#CCCCCC", "#AAAAAA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.confirmButtonGradient}
          >
            <Text style={styles.confirmButtonText}>
              Confirm ({selectedInterests.size}/10)
            </Text>
          </LinearGradient>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
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
    marginTop: 46,
    marginBottom: 20,
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
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'DMSans_500Medium',
    color: 'rgba(0, 0, 0, 0.6)',
    textAlign: 'center',
    lineHeight: 24,
    letterSpacing: -0.01,
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  categoryContainer: {
    marginBottom: 32,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 16,
    fontFamily: 'DMSans_400Regular',
    color: '#000000',
    letterSpacing: -0.015,
  },
  selectAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  selectAllText: {
    fontSize: 16,
    fontFamily: 'DMSans_500Medium',
    color: '#000000',
    letterSpacing: -0.015,
  },
  selectAllCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ACACAC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectAllCircleSelected: {
    backgroundColor: '#7965E0',
    borderColor: '#7965E0',
  },
  selectAllDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestButton: {
    backgroundColor: '#FAFAFA',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 11,
    marginBottom: 2,
  },
  interestButtonSelected: {
    backgroundColor: '#7965E0',
  },
  interestText: {
    fontSize: 13,
    fontFamily: 'DMSans_400Regular',
    color: '#000000',
    letterSpacing: -0.015,
    textAlign: 'center',
    lineHeight: 18,
  },
  interestTextSelected: {
    color: '#FFFFFF',
  },
  bottomSpacing: {
    height: 20,
  },
  confirmButton: {
    width: '90%',
    height: 50,
    alignSelf: 'center',
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: Platform.OS === 'ios' ? 20 : 40,
  },
  confirmButtonDisabled: {
    opacity: 0.6,
  },
  confirmButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
  },
  confirmButtonText: {
    fontSize: 16,
    fontFamily: 'DMSans_500Medium',
    color: '#FFFFFF',
    letterSpacing: -0.015,
  },
});

export default InterestsScreen; 