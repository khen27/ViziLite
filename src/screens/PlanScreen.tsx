import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext } from '../context/AuthContext';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import PlanCard, { Plan } from '../components/PlanCard';

const PlanScreen = () => {
  const authContext = useContext(AuthContext);
  
  if (!authContext) {
    throw new Error('PlanScreen must be used within AuthProvider');
  }

  const { user } = authContext;

  // Form state
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [activity, setActivity] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  
  // Plans state
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.uid) {
      fetchPlans();
    }
  }, [user?.uid]);

  const fetchPlans = async () => {
    if (!user?.uid) return;

    try {
      setLoading(true);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Simplified query to avoid index requirement initially
      const plansQuery = query(
        collection(db, 'plans'),
        where('uid', '==', user.uid)
      );

      const querySnapshot = await getDocs(plansQuery);
      const fetchedPlans: Plan[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const planDate = new Date(data.date);
        
        // Filter client-side for now (until index is created)
        if (planDate >= today) {
          fetchedPlans.push({
            id: doc.id,
            uid: data.uid,
            date: data.date,
            time: data.time,
            activity: data.activity,
            createdAt: data.createdAt?.toDate(),
          });
        }
      });

      // Sort client-side
      fetchedPlans.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setPlans(fetchedPlans);
    } catch (error) {
      console.error('Error fetching plans:', error);
      Alert.alert('Error', 'Failed to load plans');
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const handleSubmit = async () => {
    if (!user?.uid) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    if (!activity.trim()) {
      Alert.alert('Error', 'Please enter an activity');
      return;
    }

    try {
      setSaving(true);

      const planData = {
        uid: user.uid,
        date: date.toISOString().split('T')[0], // YYYY-MM-DD format
        time: time.toTimeString().split(' ')[0].substring(0, 5), // HH:MM format
        activity: activity.trim(),
        createdAt: Timestamp.now(),
      };

      await addDoc(collection(db, 'plans'), planData);

      // Reset form
      setActivity('');
      setDate(new Date());
      setTime(new Date());

      // Refresh plans list
      await fetchPlans();

      Alert.alert('Success', 'Plan created successfully!');
    } catch (error) {
      console.error('Error creating plan:', error);
      Alert.alert('Error', 'Failed to create plan. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handlePlanPress = (plan: Plan) => {
    Alert.alert(
      'Plan Details',
      `Activity: ${plan.activity}\nDate: ${new Date(plan.date).toLocaleDateString()}\nTime: ${plan.time}`,
      [{ text: 'OK' }]
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Create Plan</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {/* Date Picker */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.pickerButtonText}>{formatDate(date)}</Text>
            </TouchableOpacity>
          </View>

          {/* Time Picker */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Time</Text>
            <TouchableOpacity
              style={styles.pickerButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.pickerButtonText}>{formatTime(time)}</Text>
            </TouchableOpacity>
          </View>

          {/* Activity Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Activity</Text>
            <TextInput
              style={styles.textInput}
              value={activity}
              onChangeText={setActivity}
              placeholder="What do you want to do?"
              placeholderTextColor="#999"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, saving && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={saving}
          >
            <Text style={styles.submitButtonText}>
              {saving ? 'Creating...' : 'Create Plan'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Plans List */}
        <View style={styles.plansContainer}>
          <Text style={styles.sectionTitle}>Upcoming Plans</Text>
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading plans...</Text>
            </View>
          ) : plans.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No upcoming plans</Text>
              <Text style={styles.emptySubtext}>Create your first plan above!</Text>
            </View>
          ) : (
            plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onPress={handlePlanPress}
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      {/* Time Picker Modal */}
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  pickerButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
    minHeight: 80,
  },
  submitButton: {
    backgroundColor: '#4694FD',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#4694FD',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  plansContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
});

export default PlanScreen; 