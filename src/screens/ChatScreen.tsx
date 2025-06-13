import React, { useState, useEffect, useCallback } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Dimensions
} from 'react-native';
import { DMSans_400Regular, DMSans_500Medium } from '@expo-google-fonts/dm-sans';
import { db } from '../../firebaseConfig';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type ChatScreenProps = Partial<NativeStackScreenProps<RootStackParamList, 'Chat'>>;

interface ChatMessage {
  _id: string;
  text: string;
  createdAt: Date;
  user: {
    _id: string;
    name: string;
  };
}

const { height: screenHeight } = Dimensions.get('window');

export default function ChatScreen({ route }: ChatScreenProps) {
  const { chatId = 'global', userId = 'userA' } = route?.params || {};
  const messagesRef = collection(db, 'chats', chatId, 'messages');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    console.log('Setting up Firebase listener for chatId:', chatId, 'userId:', userId);
    
    const q = query(messagesRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, 
      (qs) => {
        console.log('Firebase snapshot received, docs count:', qs.docs.length);
        const msgs = qs.docs.map(doc => {
          const data = doc.data();
          console.log('Message data:', data);
          return {
            _id: doc.id,
            text: data.text,
            createdAt: data.createdAt?.toDate() || new Date(),
            user: data.user
          };
        });
        console.log('Setting messages:', msgs);
        console.log('All message IDs:', msgs.map(m => `${m.user._id}: "${m.text}" (${m._id})`));
        setMessages(msgs);
      },
      (error) => {
        console.error('Firebase listener error:', error);
      }
    );

    return unsubscribe;
  }, []);

  const sendMessage = useCallback(async () => {
    if (inputText.trim() === '') return;

    console.log('Attempting to send message:', inputText.trim(), 'from user:', userId);

    try {
      const messageData = {
        text: inputText.trim(),
        user: {
          _id: userId,
          name: userId
        },
        createdAt: serverTimestamp()
      };
      
      console.log('Message data to send:', messageData);
      
      const docRef = await addDoc(messagesRef, messageData);
      console.log('Message sent successfully with ID:', docRef.id);
      
      setInputText('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, [inputText, userId, messagesRef]);

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isCurrentUser = item.user._id === userId;
    
    return (
      <View style={[
        styles.messageContainer,
        isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage
      ]}>
        <Text style={styles.userName}>{item.user.name}</Text>
        <Text style={[
          styles.messageText,
          isCurrentUser ? styles.currentUserText : styles.otherUserText
        ]}>
          {item.text}
        </Text>
        <Text style={styles.timestamp}>
          {item.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.androidContainer}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#FFFFFF" 
        translucent={false}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chat - {userId}</Text>
          <Text style={styles.debugText}>Messages: {messages.length}</Text>
        </View>
        
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item._id}
          style={styles.messagesList}
          inverted
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesContent}
        />
        
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type a message..."
              multiline
              maxLength={500}
              textAlignVertical="top"
            />
            <TouchableOpacity 
              style={[
                styles.sendButton,
                inputText.trim() === '' && styles.sendButtonDisabled
              ]} 
              onPress={sendMessage}
              disabled={inputText.trim() === ''}
            >
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  androidContainer: {
    flex: 1,
    backgroundColor: '#EAF2F9',
  },
  container: {
    flex: 1,
    backgroundColor: '#EAF2F9',
  },
  header: {
    paddingVertical: Platform.OS === 'android' ? 20 : 15,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      },
    }),
  },
  headerTitle: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },
  debugText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  messagesContent: {
    paddingBottom: 20,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    marginVertical: 4,
    borderRadius: 16,
    ...Platform.select({
      android: {
        elevation: 2,
      },
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 1 },
      },
    }),
  },
  currentUserMessage: {
    backgroundColor: '#3888F6',
    alignSelf: 'flex-end',
    marginLeft: '20%',
  },
  otherUserMessage: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    marginRight: '20%',
  },
  userName: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 12,
    marginBottom: 4,
    opacity: 0.7,
  },
  messageText: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 16,
    lineHeight: 22,
  },
  currentUserText: {
    color: '#FFFFFF',
  },
  otherUserText: {
    color: '#000000',
  },
  timestamp: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 10,
    marginTop: 4,
    opacity: 0.6,
  },
  keyboardAvoidingView: {
    // Remove flex: 1 to prevent layout issues on Android
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    alignItems: 'flex-end',
    ...Platform.select({
      android: {
        elevation: 8,
        paddingBottom: Platform.OS === 'android' ? 20 : 20,
      },
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: -2 },
      },
    }),
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'android' ? 12 : 12,
    fontFamily: 'DMSans_400Regular',
    fontSize: 16,
    maxHeight: 100,
    marginRight: 12,
    backgroundColor: '#F8F9FA',
    ...Platform.select({
      android: {
        textAlignVertical: 'top',
      },
    }),
  },
  sendButton: {
    backgroundColor: '#3888F6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    ...Platform.select({
      android: {
        elevation: 2,
      },
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
      },
    }),
  },
  sendButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  sendButtonText: {
    fontFamily: 'DMSans_500Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
}); 