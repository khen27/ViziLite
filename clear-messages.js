const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, deleteDoc, doc } = require('firebase/firestore');

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDueRrljNJLb7ksYcvySYDGum5mH5C04AU",
  authDomain: "vizilite-d3401.firebaseapp.com",
  projectId: "vizilite-d3401",
  storageBucket: "vizilite-d3401.firebasestorage.app",
  messagingSenderId: "797259164580",
  appId: "1:797259164580:web:d30b3425e78ec0b539af31",
  measurementId: "G-Y2R4NWW094"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function clearMessages() {
  try {
    console.log('🗑️  Clearing all messages...');
    
    // Get all messages from the global chat
    const messagesRef = collection(db, 'chats', 'global', 'messages');
    const messagesSnapshot = await getDocs(messagesRef);
    
    // Delete each message
    const deletePromises = messagesSnapshot.docs.map(doc => 
      deleteDoc(doc.ref)
    );
    
    await Promise.all(deletePromises);
    
    console.log('✅ Successfully cleared all messages!');
    console.log(`Deleted ${messagesSnapshot.size} messages`);
  } catch (error) {
    console.error('❌ Error clearing messages:', error);
  }
}

// Run the clear function
clearMessages(); 