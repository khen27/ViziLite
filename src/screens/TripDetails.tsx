import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { DMSans_500Medium } from '@expo-google-fonts/dm-sans';

const TripDetails = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Trip Details</Text>
        <Text style={styles.subtitle}>This is a placeholder for the Trip Details page.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF2F9',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 32,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    color: 'rgba(0,0,0,0.6)',
    textAlign: 'center',
    marginBottom: 40,
  },
});

export default TripDetails; 