import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import { INITIAL_VITALS_DATA } from '@/constants/vitalData';

const activities = [
  { id: '1', name: 'Running', icon: require('../../../assets/images/icons/running.png') },
  { id: '2', name: 'Swimming', icon: require('../../../assets/images/icons/swimming.png') },
  { id: '3', name: 'Badminton', icon: require('../../../assets/images/icons/badminton.png') },
  { id: '4', name: 'Table Tennis', icon: require('../../../assets/images/icons/table-tennis.png') },
];

const ExerciseTrackerScreen: React.FC = () => {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [logs, setLogs] = useState<
    { activity: string; duration: string; distance?: string }[]
  >([]);

  const logActivity = () => {
    if (!selectedActivity || !duration) {
      Alert.alert('Error', 'Please select an activity and enter duration.');
      return;
    }

    const log = { activity: selectedActivity, duration, distance: distance || undefined };
    setLogs((prevLogs) => [...prevLogs, log]);

    // Reset inputs
    setDuration('');
    setDistance('');
    setSelectedActivity(null);
    INITIAL_VITALS_DATA["Physical Activity"][1].unit= `${selectedActivity} ${duration} min`;
    // if(parseInt(duration)<60)
    // {
    //   INITIAL_VITALS_DATA["Physical Activity"][1].value = 30;
    // }else if(parseInt(duration)>60 && parseInt(duration) < 120)
    // {
    //   INITIAL_VITALS_DATA["Physical Activity"][1].value = 70;
    // }
    // else{
    //   INITIAL_VITALS_DATA["Physical Activity"][1].value = 120;
    // }

    Alert.alert('Success', `${selectedActivity} activity logged!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Exercise Tracker</Text>

      {/* Activity Selection */}
      <Text style={styles.sectionTitle}>Select an Activity</Text>
      <View style={styles.activityList}>
        {activities.map((activity) => (
          <TouchableOpacity
            key={activity.id}
            style={[
              styles.activityButton,
              selectedActivity === activity.name && styles.selectedActivity,
            ]}
            onPress={() => setSelectedActivity(activity.name)}
          >
            <Image source={activity.icon} style={styles.activityIcon} />
            <Text style={styles.activityText}>{activity.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Activity Input */}
      <Text style={styles.sectionTitle}>Log Your Activity</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Duration (minutes)"
          placeholderTextColor="#B0BEC5"
          keyboardType="numeric"
          value={duration}
          onChangeText={(text) => setDuration(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Distance (km) - optional"
          placeholderTextColor="#B0BEC5"
          keyboardType="numeric"
          value={distance}
          onChangeText={(text) => setDistance(text)}
        />
        <TouchableOpacity style={styles.logButton} onPress={logActivity}>
          <Text style={styles.logButtonText}>Log Activity</Text>
        </TouchableOpacity>
      </View>

      {/* Logs Section */}
      <Text style={styles.sectionTitle}>Activity Log</Text>
      {logs.length > 0 ? (
        <FlatList
          data={logs}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.logItem}>
              <Text style={styles.logText}>
                {item.activity} - {item.duration} mins
                {item.distance && `, ${item.distance} km`}
              </Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noLogsText}>No activities logged yet.</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    paddingHorizontal: 20,
    margin: 20
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A237E',
    textAlign: 'center',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#37474F',
    marginTop: 20,
    marginBottom: 10,
  },
  activityList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  activityButton: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CFD8DC',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedActivity: {
    borderColor: '#2E7D32',
    backgroundColor: '#E8F5E9',
  },
  activityIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  activityText: {
    fontSize: 16,
    color: '#546E7A',
  },
  inputContainer: {
    marginTop: 15,
  },
  input: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#37474F',
    borderWidth: 1,
    borderColor: '#CFD8DC',
    marginBottom: 15,
  },
  logButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  logButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
  logItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logText: {
    fontSize: 16,
    color: '#37474F',
  },
  noLogsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#90A4AE',
    marginTop: 15,
  },
});

export default ExerciseTrackerScreen;
