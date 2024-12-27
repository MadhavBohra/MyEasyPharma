import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { INITIAL_VITALS_DATA } from '@/constants/vitalData';

const AnxietyLevelsPage = () => {
  const [anxietyLevel, setAnxietyLevel] = useState(0);

  const getAnxietyDescription = (level: number) => {
    if (level === 0) return 'No Anxiety';
    if (level <= 3) return 'Low Anxiety';
    if (level <= 7) return 'Moderate Anxiety';
    return 'High Anxiety';
  };

  const getAnxietyColor = (level: number) => {
    if (level === 0) return '#4CAF50'; // Green for No Anxiety
    if (level <= 3) return '#8BC34A'; // Light Green for Low Anxiety
    if (level <= 7) return '#FFC107'; // Amber for Moderate Anxiety
    return '#F44336'; // Red for High Anxiety
  };

  const handleSubmit = () => {
    alert(`Your anxiety level is recorded as: ${anxietyLevel} (${getAnxietyDescription(anxietyLevel)})`);
          INITIAL_VITALS_DATA["Mental Health"][1].unit= `${anxietyLevel}`;
              if (anxietyLevel < 3) {
                INITIAL_VITALS_DATA["Mental Health"][1].value= 30;
              } 
              
              if (anxietyLevel >= 3 && anxietyLevel < 7) {
                INITIAL_VITALS_DATA["Mental Health"][1].value= 70;
              } 
              
              if (anxietyLevel >= 7) {
                INITIAL_VITALS_DATA["Mental Health"][1].value= 120;
              } 
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../../assets/images/icons/anxiety.png')} 
        style={styles.iconTop} 
      />
      <Text style={styles.title}>Anxiety Level Tracker</Text>
      <Text style={styles.label}>How anxious are you feeling today?</Text>

      <Text 
        style={[
          styles.anxietyDescription, 
          { color: getAnxietyColor(anxietyLevel) }
        ]}
      >
        {getAnxietyDescription(anxietyLevel)}
      </Text>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={10}
        step={1}
        value={anxietyLevel}
        onValueChange={setAnxietyLevel}
        minimumTrackTintColor={getAnxietyColor(anxietyLevel)}
        maximumTrackTintColor="#D3D3D3"
        thumbTintColor={getAnxietyColor(anxietyLevel)}
      />

      <Text style={styles.anxietyLevel}>Anxiety Level: {anxietyLevel}</Text>

      <TouchableOpacity 
        style={[
          styles.button, 
          { backgroundColor: getAnxietyColor(anxietyLevel) }
        ]} 
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <Image 
        source={require('../../../assets/images/icons/anxiety2.png')} 
        style={styles.iconBottom} 
      />
      <Text style={styles.description}>
        Anxiety is a natural response to uncertainty or potential danger. While it can help us prepare for challenges, excessive anxiety can interfere with daily life. Understanding your anxiety level is a step toward managing it effectively. Take a moment to breathe and focus on what you can control.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
    marginVertical: 20,
  },
  anxietyDescription: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  anxietyLevel: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconTop: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  iconBottom: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 15,
    color: '#555',
    lineHeight: 22,
  },
});

export default AnxietyLevelsPage;
