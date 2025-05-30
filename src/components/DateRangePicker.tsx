import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DMSans_400Regular, DMSans_500Medium } from '@expo-google-fonts/dm-sans';

interface DateRangePickerProps {
  onDatesChange: (dates: { startDate: Date; endDate: Date }) => void;
  startDate: Date;
  endDate: Date;
}

export default function DateRangePicker({ onDatesChange, startDate, endDate }: DateRangePickerProps) {
  const [showPicker, setShowPicker] = useState<'start'|'end'|null>(null);

  const handleChange = (event: any, selectedDate?: Date) => {
    if (!selectedDate) {
      setShowPicker(null);
      return;
    }

    if (showPicker === 'start') {
      // If selecting start date after end date, update both
      if (selectedDate > endDate) {
        onDatesChange({ startDate: selectedDate, endDate: selectedDate });
      } else {
        onDatesChange({ startDate: selectedDate, endDate });
      }
    } else if (showPicker === 'end') {
      // If selecting end date before start date, update both
      if (selectedDate < startDate) {
        onDatesChange({ startDate: selectedDate, endDate: selectedDate });
      } else {
        onDatesChange({ startDate, endDate: selectedDate });
      }
    }
    setShowPicker(null);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Start Date</Text>
      <TouchableOpacity onPress={() => setShowPicker('start')}>
        <Text style={styles.dateText}>{startDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showPicker === 'start' && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'calendar'}
          onChange={handleChange}
          minimumDate={new Date()}
          accentColor="#0A7AFF"
        />
      )}

      <Text style={[styles.label, { marginTop: 20 }]}>End Date</Text>
      <TouchableOpacity onPress={() => setShowPicker('end')}>
        <Text style={styles.dateText}>{endDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showPicker === 'end' && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'calendar'}
          onChange={handleChange}
          minimumDate={startDate}
          accentColor="#0A7AFF"
        />
      )}
    </View>
  );
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 36; // 18px horizontal padding per side

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginTop: 30,
  },
  label: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    color: 'rgba(0,0,0,0.6)',
  },
  dateText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 20,
    color: '#000000',
    marginTop: 8,
  },
}); 