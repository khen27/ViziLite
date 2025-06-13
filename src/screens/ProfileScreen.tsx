import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import ProfileCard from '../components/ProfileCard';

interface ProfileData {
  name?: string;
  interests?: string[];
  photoUrl?: string;
}

const ProfileScreen = () => {
  const authContext = useContext(AuthContext);
  
  if (!authContext) {
    throw new Error('ProfileScreen must be used within AuthProvider');
  }

  const { user, setProfile } = authContext;
  
  console.log('ProfileScreen – AuthContext user:', user);
  
  const [bio, setBio] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [profileData, setProfileData] = useState<ProfileData>({});
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchProfile = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          setProfileData({
            name: data.name,
            interests: data.interests || [],
            photoUrl: data.photoUrl,
          });
          setBio(data.bio || '');
        }
      } catch (err) {
        console.warn('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleSaveBio = async () => {
    try {
      setSaving(true);
      await setProfile({ bio });
      Alert.alert('Success', 'Bio updated successfully!');
    } catch (error) {
      console.error('Error saving bio:', error);
      Alert.alert('Error', 'Failed to save bio. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !user) {
    return (
      <View style={styles.center}>
        <Text>Loading…</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <ProfileCard>
        {/* Profile Photo */}
        <View style={styles.photoContainer}>
          {profileData.photoUrl ? (
            <Image source={{ uri: profileData.photoUrl }} style={styles.profilePhoto} />
          ) : (
            <View style={styles.placeholderPhoto}>
              <Text style={styles.placeholderText}>No Photo</Text>
            </View>
          )}
        </View>

        {/* Name */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.infoText}>
            {profileData.name || 'No name set'}
          </Text>
        </View>

        {/* Interests */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>Interests:</Text>
          <Text style={styles.infoText}>
            {profileData.interests && profileData.interests.length > 0
              ? profileData.interests.join(', ')
              : 'No interests set'}
          </Text>
        </View>

        {/* Bio Section */}
        <View style={styles.bioSection}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={styles.bioInput}
            value={bio}
            onChangeText={setBio}
            placeholder="Tell us about yourself..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={handleSaveBio}
          disabled={saving}
        >
          <Text style={styles.saveButtonText}>
            {saving ? 'Saving...' : 'Save Bio'}
          </Text>
        </TouchableOpacity>
      </ProfileCard>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },

  photoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#4694FD',
  },
  placeholderPhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#4694FD',
  },
  placeholderText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
  },
  infoSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  bioSection: {
    marginBottom: 24,
  },
  bioInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
    minHeight: 100,
    maxHeight: 150,
  },
  saveButton: {
    backgroundColor: '#4694FD',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#4694FD',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProfileScreen; 