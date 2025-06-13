import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

interface ProfileCardProps {
  children: ReactNode;
}

export default function ProfileCard({ children }: ProfileCardProps) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    margin: 20,
    // Soft drop shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
}); 