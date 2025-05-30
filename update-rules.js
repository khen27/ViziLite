const https = require('https');
const fs = require('fs');

// Updated rules to allow all access for testing
const testingRules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow all access for testing - TEMPORARY!
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`;

console.log('🔧 Creating temporary open security rules for testing...');
console.log('⚠️  WARNING: These rules allow ALL access - only for testing!');
console.log('');
console.log('Please go to Firebase Console and update your security rules:');
console.log('1. Go to https://console.firebase.google.com/');
console.log('2. Select your project: vizilite-d3401');
console.log('3. Navigate to: Firestore Database → Rules');
console.log('4. Replace the existing rules with the following:');
console.log('');
console.log('----------------------------------------');
console.log(testingRules);
console.log('----------------------------------------');
console.log('');
console.log('5. Click "Publish"');
console.log('');
console.log('After updating, your cross-device chat will work instantly! 🚀'); 