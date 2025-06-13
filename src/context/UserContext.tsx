import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserProfile = {
  name: string;
  avatar?: string; // URI or require path
  location: string;
  countryCode: string; // For flag
  friends: string;
  bio: string;
  interests: { emoji: string; label: string }[];
};

const defaultProfile: UserProfile = {
  name: 'Karl Henderson',
  avatar: undefined, // fallback to default
  location: 'Prague, Czech Republic',
  countryCode: 'cz',
  friends: '113k Friends',
  bio:
    "I'm a multi-faceted startup founder and USA expat 🇨🇿 always chasing new PRs 🏋️‍♂️ and passport stamps 🌍✈️. I speak English, Spanish, and some Czech. Fueled by bubble tea 🧋 and weekend brunch mimosas 🥂, I thrive on spontaneous night-train escapes 🚆 or impromptu road-trip adventures 🚗💨. My year splits between snowboarding 🏂 in winter and mastering wake-boarding & swimming laps 🏊‍♂️ in summer—balanced out by sauna & jacuzzi recovery sessions 🧖‍♂️💦. Whether I'm dialing in Olympic lifts, firing up the barbecue 🍖🔥, or diving into the latest anime binge 🎌, I live for an active, entrepreneurial life. Let's turn every moment into our next epic story! 🔥✨",
  interests: [
    { emoji: '✈️', label: 'Travel' },
    { emoji: '🍔', label: 'Food' },
    { emoji: '🌊', label: 'Sea' },
    { emoji: '🏸', label: 'Badminton' },
    { emoji: '☕', label: 'Coffee' },
  ],
};

interface UserContextType {
  user: UserProfile;
  setUser: (user: UserProfile) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile>(defaultProfile);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
}; 