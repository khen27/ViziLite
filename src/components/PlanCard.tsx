import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export interface Plan {
  id: string;
  uid: string;
  date: string;
  time: string;
  activity: string;
  createdAt?: Date;
}

interface PlanCardProps {
  plan: Plan;
  onPress?: (plan: Plan) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, onPress }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress?.(plan)}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{formatDate(plan.date)}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(plan.time)}</Text>
          </View>
        </View>
        
        <View style={styles.activityContainer}>
          <Text style={styles.activityText} numberOfLines={2}>
            {plan.activity}
          </Text>
        </View>
        
        <View style={styles.chevron}>
          <Text style={styles.chevronText}>›</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  dateTimeContainer: {
    alignItems: 'center',
    minWidth: 80,
  },
  dateContainer: {
    backgroundColor: '#4694FD',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 4,
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  timeContainer: {
    backgroundColor: '#EAF2F9',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  timeText: {
    color: '#4694FD',
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
  },
  activityContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  activityText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    lineHeight: 22,
  },
  chevron: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevronText: {
    fontSize: 20,
    color: '#999',
    fontWeight: '300',
  },
});

export default PlanCard; 