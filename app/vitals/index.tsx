import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useVitalContext } from '@/components/context/VitalContext';
import VitalInput from '@/components/VitalInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VitalUpdatesScreen: React.FC = () => {
  const { waterIntake, heartRate, calories, sleepHours, sleepMinutes, exerciseMinutes, steps, updateVital } = useVitalContext();
  const router = useRouter();

  const handleUpdateVitals = async () => {
    const body = {
      steps: parseInt(steps) || 0,
      calories: parseInt(calories) || 0,
      water: parseFloat(waterIntake) || 0,
      bpm: parseInt(heartRate) || 0,
      sleepHours: parseInt(sleepHours) || 0,
      exerciseTime: parseInt(exerciseMinutes) || 0,
    };

    try {
      const token = await AsyncStorage.getItem('accessToken');
      const response = await fetch(`http://34.173.68.103:8000/health`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Add your authorization token here
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body), // Convert body to JSON string
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Vitals updated successfully:', data);
      router.back(); // Navigate back after successful update
    } catch (error) {
      console.error('Error updating vitals:', error);
      // Optionally handle error (e.g., show a message to the user)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Enter Vital Updates</Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </Text>
        </View>

        <VitalInput
          label="Water Intake"
          value={waterIntake}
          onChangeText={(text) => updateVital('waterIntake', text)}
          icon={<Ionicons name="water-outline" size={24} color="#007AFF" />}
          unit="L"
          target="2 Liters"
        />

        <VitalInput
          label="Heart Rate"
          value={heartRate}
          onChangeText={(text) => updateVital('heartRate', text)}
          icon={<Ionicons name="heart-outline" size={24} color="#FF2D55" />}
          unit="BPM"
          target="60-100 BPM"
        />

        <VitalInput
          label="Calories"
          value={calories}
          onChangeText={(text) => updateVital('calories', text)}
          icon={<MaterialCommunityIcons name="fire" size={24} color="#FF9500" />}
          unit="kcal"
          target="500 kcal"
        />

        <VitalInput
          label="Sleep Duration"
          value={`${sleepHours}:${sleepMinutes}`}
          onChangeText={(text) => {
            const [hours, minutes] = text.split(':');
            updateVital('sleepHours', hours);
            updateVital('sleepMinutes', minutes);
          }}
          icon={<Feather name="moon" size={24} color="#5856D6" />}
          unit="hrs"
          target="8 hrs"
        />

        <VitalInput
          label="Exercise Duration"
          value={exerciseMinutes}
          onChangeText={(text) => updateVital('exerciseMinutes', text)}
          icon={<MaterialCommunityIcons name="run" size={24} color="#4CD964" />}
          unit="mins"
          target="1.5 hrs"
        />

        <VitalInput
          label="Steps"
          value={steps}
          onChangeText={(text) => updateVital('steps', text)}
          icon={<MaterialCommunityIcons name="shoe-print" size={24} color="#FF9500" />}
          unit="steps"
          target="8,000 steps"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleUpdateVitals}>
          <Text style={styles.saveButtonText}>Save Updates</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  date: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default VitalUpdatesScreen;
