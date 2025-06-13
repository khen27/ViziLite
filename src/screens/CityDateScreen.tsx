import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
  Modal,
  SafeAreaView,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext } from '../context/AuthContext';
import ProfileCard from '../components/ProfileCard';
import { db } from '../../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface CityDateEntry {
  city: string;
  startDate: Date;
  endDate: Date;
}

export default function CityDateScreen({ navigation }: any) {
  const authContext = useContext(AuthContext);
  
  if (!authContext) {
    throw new Error('CityDateScreen must be used within AuthProvider');
  }

  const { user } = authContext;
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [entries, setEntries] = useState<CityDateEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const addEntry = () => {
    if (!city.trim()) {
      Alert.alert('Error', 'Please enter a city name');
      return;
    }

    if (endDate < startDate) {
      Alert.alert('Error', 'End date must be after start date');
      return;
    }

    const newEntry: CityDateEntry = {
      city: city.trim(),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    };

    setEntries([...entries, newEntry]);
    setCity('');
    // Reset dates to today
    const today = new Date();
    setStartDate(today);
    setEndDate(today);
  };

  const removeEntry = (index: number) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
  };

  const onContinue = async () => {
    if (!user?.uid) return;
    
    if (entries.length === 0) {
      Alert.alert('Error', 'Please add at least one city and date range');
      return;
    }

    setLoading(true);
    try {
      await Promise.all(
        entries.map(entry =>
          addDoc(collection(db, 'users', user.uid, 'citiesDates'), {
            city: entry.city,
            startDate: entry.startDate,
            endDate: entry.endDate,
            createdAt: serverTimestamp(),
          })
        )
      );
      navigation.navigate('Interests');
    } catch (error) {
      console.error('Error saving cities and dates:', error);
      Alert.alert('Error', 'Failed to save your information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderDatePicker = (
    show: boolean,
    setShow: (show: boolean) => void,
    date: Date,
    setDate: (date: Date) => void,
    title: string
  ) => {
    if (Platform.OS === 'ios') {
      return (
        <Modal visible={show} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setShow(false)}>
                  <Text style={styles.modalButton}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>{title}</Text>
                <TouchableOpacity onPress={() => setShow(false)}>
                  <Text style={[styles.modalButton, styles.doneButton]}>Done</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={date}
                mode="date"
                display="spinner"
                onChange={(_, selectedDate) => {
                  if (selectedDate) {
                    setDate(selectedDate);
                  }
                }}
                style={styles.datePicker}
              />
            </View>
          </View>
        </Modal>
      );
    } else {
      return show ? (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(_, selectedDate) => {
            setShow(false);
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      ) : null;
    }
  };

  const renderEntry = ({ item, index }: { item: CityDateEntry; index: number }) => (
    <View style={styles.entryCard}>
      <View style={styles.entryContent}>
        <Text style={styles.entryCity}>{item.city}</Text>
        <Text style={styles.entryDates}>
          {formatDate(item.startDate)} – {formatDate(item.endDate)}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => removeEntry(index)}
        style={styles.removeButton}
      >
        <Text style={styles.removeButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Let's find people like you</Text>
        <Text style={styles.subtitle}>
          Add cities and date ranges when you'll be there or have been there
        </Text>

        <ProfileCard>
          <TextInput
            style={styles.input}
            placeholder="Enter city"
            value={city}
            onChangeText={setCity}
            placeholderTextColor="#999"
          />

          <View style={styles.dateRow}>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowStartPicker(true)}
            >
              <Text style={styles.dateLabel}>Start Date</Text>
              <Text style={styles.dateValue}>{formatDate(startDate)}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowEndPicker(true)}
            >
              <Text style={styles.dateLabel}>End Date</Text>
              <Text style={styles.dateValue}>{formatDate(endDate)}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.addButton, !city.trim() && styles.addButtonDisabled]}
            onPress={addEntry}
            disabled={!city.trim()}
          >
            <Text style={[styles.addButtonText, !city.trim() && styles.addButtonTextDisabled]}>
              Add Entry
            </Text>
          </TouchableOpacity>
        </ProfileCard>

        {entries.length > 0 && (
          <View style={styles.entriesSection}>
            <Text style={styles.entriesTitle}>Your Entries</Text>
            <FlatList
              data={entries}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderEntry}
              showsVerticalScrollIndicator={false}
              style={styles.entriesList}
            />
          </View>
        )}
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[styles.continueButton, (entries.length === 0 || loading) && styles.continueButtonDisabled]}
          onPress={onContinue}
          disabled={entries.length === 0 || loading}
        >
          <Text style={[styles.continueButtonText, (entries.length === 0 || loading) && styles.continueButtonTextDisabled]}>
            {loading ? 'Saving...' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>

      {renderDatePicker(showStartPicker, setShowStartPicker, startDate, setStartDate, 'Start Date')}
      {renderDatePicker(showEndPicker, setShowEndPicker, endDate, setEndDate, 'End Date')}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 12,
  },
  dateButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dateLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#e0e0e0',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  addButtonTextDisabled: {
    color: '#999',
  },
  entriesSection: {
    flex: 1,
    marginTop: 20,
  },
  entriesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  entriesList: {
    flex: 1,
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#f5f5f5',
  },
  entryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  entryContent: {
    flex: 1,
  },
  entryCity: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  entryDates: {
    fontSize: 14,
    color: '#666',
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ff4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#e0e0e0',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  continueButtonTextDisabled: {
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 34,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  modalButton: {
    fontSize: 16,
    color: '#007AFF',
  },
  doneButton: {
    fontWeight: '600',
  },
  datePicker: {
    backgroundColor: '#fff',
  },
}); 