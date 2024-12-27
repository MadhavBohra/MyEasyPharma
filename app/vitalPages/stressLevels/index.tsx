import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { INITIAL_VITALS_DATA } from '@/constants/vitalData';

const StressLevelsPage = () => {
  const [stressLevel, setStressLevel] = useState(0);

  const getStressDescription = (level: number) => {
    if (level === 0) return 'No Stress';
    if (level <= 3) return 'Low Stress';
    if (level <= 7) return 'Moderate Stress';
    return 'High Stress';
  };

  const getStressColor = (level: number) => {
    if (level === 0) return '#4CAF50'; // Green for No Stress
    if (level <= 3) return '#8BC34A'; // Light Green for Low Stress
    if (level <= 7) return '#FFC107'; // Amber for Moderate Stress
    return '#F44336'; // Red for High Stress
  };

  const handleSubmit = () => {
    alert(`Your stress level is recorded as: ${stressLevel} (${getStressDescription(stressLevel)})`);
      INITIAL_VITALS_DATA["Mental Health"][0].unit= `${stressLevel}`;
          if (stressLevel < 3) {
            INITIAL_VITALS_DATA["Mental Health"][0].value= 30;
          } 
          
          if (stressLevel >= 3 && stressLevel < 7) {
            INITIAL_VITALS_DATA["Mental Health"][0].value= 70;
          } 
          
          if (stressLevel >= 7) {
            INITIAL_VITALS_DATA["Mental Health"][0].value= 120;
          } 
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../../assets/images/icons/fear.png')} 
        style={styles.iconTop} 
      />
      <Text style={styles.title}>Stress Level Tracker</Text>
      <Text style={styles.label}>How stressed are you feeling today?</Text>

      <Text 
        style={[
          styles.stressDescription, 
          { color: getStressColor(stressLevel) }
        ]}
      >
        {getStressDescription(stressLevel)}
      </Text>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={10}
        step={1}
        value={stressLevel}
        onValueChange={setStressLevel}
        minimumTrackTintColor={getStressColor(stressLevel)}
        maximumTrackTintColor="#D3D3D3"
        thumbTintColor={getStressColor(stressLevel)}
      />

      <Text style={styles.stressLevel}>Stress Level: {stressLevel}</Text>

      <TouchableOpacity 
        style={[
          styles.button, 
          { backgroundColor: getStressColor(stressLevel) }
        ]} 
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <Image 
        source={require('../../../assets/images/icons/mental-stress.png')} 
        style={styles.iconBottom} 
      />
      <Text style={styles.description}>
  Stress is a natural response to challenges or demands in life. It can motivate us to achieve goals but, if prolonged, may affect mental and physical health. Monitoring stress levels helps identify when to take steps toward relaxation, mindfulness, or seeking support. Keep track of your stress and take care of your well-being!
</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 15,
        color: '#555',
        lineHeight: 22,
      },
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
  stressDescription: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  stressLevel: {
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
});

export default StressLevelsPage;
