import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#EAF2F9" />
      
      <View style={styles.container}>
        <LinearGradient
          colors={['#7389EC', '#4694FD']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.4731, y: 0 }}
          end={{ x: 0.8807, y: 1 }}
          locations={[0.4731, 0.8807]}
        />
        
        {/* Main Content Container */}
        <View style={styles.contentContainer}>
        {/* Header with Title and Mark All Read */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.pageTitle}>Notifications</Text>
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>2</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.markAllButton}>
            <Text style={styles.markAllButtonText}>Mark all read</Text>
          </TouchableOpacity>
        </View>

        {/* Notifications List */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Today Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Today</Text>
            </View>
            
            {/* Swimming Group Chat Notification */}
            <View style={styles.notificationCard}>
              <View style={styles.orangeBackground} />
              <View style={styles.cardContent}>
                <View style={styles.profileContainer}>
                  <Image 
                    source={require('../../assets/vizi-mvp-assets.png/test-profile-image.png')}
                    style={styles.profileImage}
                  />
                  <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>New</Text>
                  </View>
                </View>
                
                <View style={styles.textContent}>
                  <View style={styles.titleRow}>
                    <Text style={styles.notificationTitle}>Swimming group chat</Text>
                    <Text style={styles.timestamp}>7m ago</Text>
                    <View style={styles.unreadDot} />
                  </View>
                  <Text style={styles.notificationMessage}>
                    Ben G. just create a swimming group chat.
                  </Text>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.declineButton}>
                      <Text style={styles.declineButtonText}>Decline</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.joinButton}>
                      <Text style={styles.joinButtonText}>Join Group</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {/* New Feature Alert */}
            <View style={styles.notificationCard}>
              <View style={styles.cardContent}>
                <View style={styles.logoContainer}>
                  <Text style={styles.logoText}>v</Text>
                </View>
                
                <View style={styles.textContent}>
                  <View style={styles.titleRow}>
                    <Text style={styles.notificationTitle}>New Feature Alert!</Text>
                    <Text style={styles.timestamp}>7h ago</Text>
                    <View style={styles.unreadDot} />
                  </View>
                  <Text style={styles.notificationMessage}>
                    You can now send voice notes in chat!
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Tomorrow Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Tomorrow</Text>
            </View>
            
            {/* Account Security Notification */}
            <View style={styles.notificationCard}>
              <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  <View style={styles.securityIcon} />
                </View>
                
                <View style={styles.textContent}>
                  <View style={styles.titleRow}>
                    <Text style={styles.notificationTitle}>Your account security</Text>
                    <Text style={styles.timestamp}>1d ago</Text>
                  </View>
                  <Text style={styles.notificationMessage}>
                    Update your password for better protection.
                  </Text>
                </View>
              </View>
            </View>

            {/* Suggested Friend Notification */}
            <View style={styles.notificationCard}>
              <View style={styles.cardContent}>
                <View style={styles.profileContainer}>
                  <Image 
                    source={require('../../assets/vizi-mvp-assets.png/jodi-frank.png')}
                    style={styles.profileImage}
                  />
                </View>
                
                <View style={styles.textContent}>
                  <View style={styles.titleRow}>
                    <Text style={styles.notificationTitle}>Suggested Friend</Text>
                    <Text style={styles.timestamp}>1d ago</Text>
                  </View>
                  <Text style={styles.notificationMessage}>
                    You and Frankie have a lot in common!
                  </Text>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.declineButton}>
                      <Text style={styles.declineButtonText}>Dismiss</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.joinButton}>
                      <Text style={styles.joinButtonText}>Add Friend</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {/* Yoga Group Chat Notification */}
            <View style={styles.notificationCard}>
              <View style={styles.cardContent}>
                <View style={styles.profileContainer}>
                  <Image 
                    source={require('../../assets/vizi-mvp-assets.png/laura-wagner.png')}
                    style={styles.profileImage}
                  />
                </View>
                
                <View style={styles.textContent}>
                  <View style={styles.titleRow}>
                    <Text style={styles.notificationTitle}>Yoga with Pets group chat</Text>
                    <Text style={styles.timestamp}>1d ago</Text>
                  </View>
                  <Text style={styles.notificationMessage}>
                    Laura Wagner just create a Yoga with Pets group chat.
                  </Text>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.declineButton}>
                      <Text style={styles.declineButtonText}>Decline</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.joinButton}>
                      <Text style={styles.joinButtonText}>Join Group</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Home Indicator */}
      <View style={styles.homeIndicator} />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EAF2F9',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#EAF2F9',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: 'rgba(11, 19, 66, 0.5)',
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 100,
    shadowOpacity: 0.5,
    elevation: 10,
    paddingTop: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pageTitle: {
    fontWeight: '500',
    fontSize: 32,
    lineHeight: 36,
    letterSpacing: -0.05 * 32,
    color: '#000000',
  },
  unreadBadge: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
  },
  unreadBadgeText: {
    fontWeight: '600',
    fontSize: 12,
    color: '#FFFFFF',
  },
  markAllButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4694FD',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  markAllButtonText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#4694FD',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.015 * 16,
    color: 'rgba(0, 0, 0, 0.5)',
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  orangeBackground: {
    position: 'absolute',
    width: '100%',
    height: 121,
    right: -100,
    bottom: -121,
    backgroundColor: 'rgba(255, 163, 0, 0.05)',
    transform: [{ rotate: '180deg' }],
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    zIndex: 1,
  },
  profileContainer: {
    width: 57,
    height: 66,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 5,
  },
  profileImage: {
    width: 57,
    height: 57,
    borderRadius: 50,
  },
  newBadge: {
    position: 'absolute',
    width: 37,
    height: 18,
    left: -7,
    top: 0.29,
    backgroundColor: '#FFA300',
    borderRadius: 20,
    transform: [{ rotate: '-19.4deg' }],
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(255, 255, 255, 0.25)',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  newBadgeText: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: -0.005 * 12,
    color: '#FFFFFF',
  },
  logoContainer: {
    width: 57,
    height: 57,
    borderRadius: 50,
    backgroundColor: '#4694FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontWeight: '400',
    fontSize: 21.875,
    lineHeight: 22,
    textAlign: 'center',
    letterSpacing: 0.1 * 21.875,
    color: '#FFFFFF',
  },
  iconContainer: {
    width: 57,
    height: 57,
    borderRadius: 50,
    backgroundColor: '#EAF2F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  securityIcon: {
    width: 22,
    height: 22,
    backgroundColor: '#4694FD',
    borderRadius: 11,
  },
  textContent: {
    flex: 1,
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    position: 'relative',
  },
  notificationTitle: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.015 * 16,
    color: '#000000',
    flex: 1,
  },
  timestamp: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 22,
    textAlign: 'center',
    letterSpacing: -0.015 * 12,
    color: 'rgba(0, 0, 0, 0.5)',
    marginRight: 8,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4694FD',
  },
  notificationMessage: {
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: -0.015 * 13,
    color: 'rgba(0, 0, 0, 0.5)',
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  declineButton: {
    backgroundColor: '#EAF2F9',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  declineButtonText: {
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    letterSpacing: -0.015 * 13,
    color: '#000000',
  },
  joinButton: {
    backgroundColor: '#0B228C',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinButtonText: {
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    letterSpacing: -0.015 * 13,
    color: '#FFFFFF',
  },
  homeIndicator: {
    position: 'absolute',
    width: 134,
    height: 5,
    alignSelf: 'center',
    bottom: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
  },
}); 