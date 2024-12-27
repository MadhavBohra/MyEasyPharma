import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import { INITIAL_VITALS_DATA } from '@/constants/vitalData';


const PhysicalActivityPage: React.FC = () => {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [calorieRecommendation, setCalorieRecommendation] = useState<number | null>(null);

  const activityLevels = [
    {
      level: 'Sedentary',
      description: 'Little to no physical activity (e.g., desk job)',
      multiplier: 1.2,
      icon: require('../../../assets/images/icons/sedentary(1).png'), // Replace with your actual icon path
    },
    {
      level: 'Moderately Active',
      description: 'Moderate activity (e.g., walking, light exercise 3–5 times a week)',
      multiplier: 1.55,
      icon: require('../../../assets/images/icons/sedentary.png'), // Replace with your actual icon path
    },
    {
      level: 'Active',
      description: 'High physical activity (e.g., intense exercise 6–7 times a week)',
      multiplier: 1.9,
      icon: require('../../../assets/images/icons/active.png'), // Replace with your actual icon path
    },
  ];

  const handleSelectActivity = (activity: string, multiplier: number) => {
    setSelectedActivity(activity);
    const baseCalories = 2000; // Default calorie assumption.
    const estimatedCalories = Math.round(baseCalories * multiplier);
    setCalorieRecommendation(estimatedCalories);
    INITIAL_VITALS_DATA["Physical Activity"][0].unit= `${activity}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Physical Activity Level</Text>

      <FlatList
        data={activityLevels}
        keyExtractor={(item) => item.level}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.activityButton,
              selectedActivity === item.level && styles.selectedButton,
            ]}
            onPress={() => handleSelectActivity(item.level, item.multiplier)}
          >
            <View style={styles.iconContainer}>
              <Image 
                source={item.icon} 
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.activityTitle}>{item.level}</Text>
              <Text style={styles.activityDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {selectedActivity && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            You selected: <Text style={styles.highlight}>{selectedActivity}</Text>
          </Text>
          <Text style={styles.resultText}>
            Recommended Calorie Intake: <Text style={styles.highlight}>{calorieRecommendation} cal/day</Text>
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    margin:20
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 25,
    color: '#1A237E',
    letterSpacing: 0.5,
  },
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  activityButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 18,
    marginBottom: 18,
    alignItems: 'center',
    width: '95%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  selectedButton: {
    borderColor: '#2E7D32',
    borderWidth: 2,
    backgroundColor: '#E8F5E9',
  },
  iconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  icon: {
    width: 50,
    height: 50,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  activityTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#37474F',
    marginBottom: 3,
  },
  activityDescription: {
    fontSize: 15,
    color: '#546E7A',
    lineHeight: 20,
  },
  resultContainer: {
    marginTop: 35,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  resultText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#37474F',
    marginBottom: 12,
    textAlign: 'center',
  },
  highlight: {
    color: '#2E7D32',
    fontWeight: '700',
  },
});

export default PhysicalActivityPage;