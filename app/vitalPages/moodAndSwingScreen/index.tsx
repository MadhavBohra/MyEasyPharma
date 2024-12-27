import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
  Image,
  ScrollView
} from 'react-native';
import { INITIAL_VITALS_DATA } from '@/constants/vitalData';

const moods = [
  { id: '1', name: 'Happy 😊', icon: require('../../../assets/images/icons/happy.png') },
  { id: '2', name: 'Sad 😢', icon: require('../../../assets/images/icons/sad.png') },
  { id: '3', name: 'Angry 😡', icon: require('../../../assets/images/icons/angry.png') },
  { id: '4', name: 'Calm 😌', icon: require('../../../assets/images/icons/calm.png') },
  { id: '5', name: 'Anxious 😰', icon: require('../../../assets/images/icons/anxious.png') },
  { id: '6', name: 'Excited 🤩', icon: require('../../../assets/images/icons/excited.png') },
];

const MoodsAndSwingsScreen: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [moodLog, setMoodLog] = useState<{ mood: string; note?: string; timestamp: string }[]>(
    []
  );

  const logMood = () => {
    if (!selectedMood) {
      Alert.alert('Error', 'Please select a mood.');
      return;
    }

    const timestamp = new Date().toLocaleString();
    setMoodLog((prevLogs) => [
      ...prevLogs,
      { mood: selectedMood, note: note || undefined, timestamp },
    ]);

    // Reset inputs
    setSelectedMood(null);
    setNote('');
    INITIAL_VITALS_DATA["Mental Health"][2].unit= `${selectedMood}`;


    Alert.alert('Logged', 'Your mood has been logged.');
  };

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <Text style={styles.title}>Moods and Swings Tracker</Text>

      {/* Mood Selection */}
      <Text style={styles.sectionTitle}>How are you feeling?</Text>
      <View style={styles.moodList}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.id}
            style={[
              styles.moodButton,
              selectedMood === mood.name && styles.selectedMood,
            ]}
            onPress={() => setSelectedMood(mood.name)}
          >
            <Image source={mood.icon} style={styles.moodIcon} />
            <Text style={styles.moodText}>{mood.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Note Input */}
      <Text style={styles.sectionTitle}>Add a note (optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        placeholderTextColor="#B0BEC5"
        value={note}
        onChangeText={(text) => setNote(text)}
      />

      {/* Log Button */}
      <TouchableOpacity style={styles.logButton} onPress={logMood}>
        <Text style={styles.logButtonText}>Log Mood</Text>
      </TouchableOpacity>

      {/* Mood History */}
      <Text style={styles.sectionTitle}>Mood History</Text>
      {moodLog.length > 0 ? (
        <FlatList
          data={moodLog}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.logItem}>
              <Text style={styles.logText}>
                <Text style={styles.bold}>{item.mood}</Text> - {item.timestamp}
              </Text>
              {item.note && <Text style={styles.noteText}>Note: {item.note}</Text>}
            </View>
          )}
        />
      ) : (
        <Text style={styles.noLogsText}>No moods logged yet.</Text>
      )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    paddingHorizontal: 20,
    margin:20
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
  moodList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moodButton: {
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
  selectedMood: {
    borderColor: '#2E7D32',
    backgroundColor: '#E8F5E9',
  },
  moodIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  moodText: {
    fontSize: 16,
    color: '#546E7A',
  },
  input: {
    height: 80,
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
  bold: {
    fontWeight: '700',
  },
  noteText: {
    fontSize: 14,
    color: '#546E7A',
    marginTop: 5,
  },
  noLogsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#90A4AE',
    marginTop: 15,
  },
});

export default MoodsAndSwingsScreen;
