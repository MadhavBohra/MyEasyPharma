import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Accelerometer } from 'expo-sensors';

const DailyWalking = () => {
  const [steps, setSteps] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [lastTimestamp, setLastTimestamp] = useState(0);
  const [distance, setDistance] = useState(0);
  const [calories, setCalories] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState(true);

  useEffect(() => {
    // Estimate stride length and calories per step
    const strideLength = 0.78; // in meters (avg for adults)
    const caloriesPerStep = 0.05; // Rough estimate in calories

    let subscription;
    Accelerometer.isAvailableAsync().then((result) => {
      if (result) {
        subscription = Accelerometer.addListener((accelerometerData) => {
          const { y } = accelerometerData;
          const threshold = 0.12;
          const timestamp = new Date().getTime();

          if (Math.abs(y - lastY) > threshold && !isCounting && (timestamp - lastTimestamp > 800)) {
            setIsCounting(true);
            setLastY(y);
            setLastTimestamp(timestamp);
            setSteps((prevSteps) => prevSteps + 1);

            // Update distance and calories
            setDistance((prevDistance) => prevDistance + strideLength / 1000); // converting to km
            setCalories((prevCalories) => prevCalories + caloriesPerStep);

            setTimeout(() => {
              setIsCounting(false);
            }, 1200);
          }
        });
      } else {
        console.log('Accelerometer not available');
      }
    });

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [isCounting, lastY, lastTimestamp]);

  // Reset steps, distance, and calories
  const resetSteps = () => {
    setSteps(0);
    setDistance(0);
    setCalories(0);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleCollapse} style={styles.header}>
        <Ionicons name="walk-outline" size={24} color="white" />
        <View>
          <Text style={styles.title}>Daily Walking</Text>
          <Text style={styles.subtitle}>Calories consumption in a day</Text>
        </View>
        <Ionicons name={isCollapsed ? "chevron-down" : "chevron-up"} size={24} color="white" />
      </TouchableOpacity>

      {!isCollapsed && (
        <>
          <View style={styles.line} />
          {isPedometerAvailable ? (
            <View style={styles.circleContainer}>
              <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.circleGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.innerCircle}>
                  <Text style={styles.stepsText}>{steps.toLocaleString()}</Text>
                  <Text style={styles.stepsLabel}>Steps</Text>
                </View>
              </LinearGradient>

              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Distance</Text>
                  <Text style={styles.statValue}>{distance.toFixed(2)} Km</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Calories</Text>
                  <Text style={styles.statValue}>{calories.toFixed(2)} Kcal</Text>
                </View>
              </View>
            </View>
          ) : (
            <Text style={styles.errorText}>Pedometer is not available on this device.</Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c3e50',
    borderRadius: 15,
    padding: 15,
    width: '100%',
    maxWidth: 350,
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  subtitle: {
    color: '#bdc3c7',
    fontSize: 12,
    marginTop: 5,
    alignSelf: 'center',
  },
  line: {
    height: 1,
    backgroundColor: '#bdc3c7',
    marginTop: 10,
    width: '100%',
  },
  circleContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  circleGradient: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    backgroundColor: '#2c3e50',
    width: 180,
    height: 180,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepsText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  stepsLabel: {
    color: '#bdc3c7',
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width:"100%",
    margin:10,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: '#bdc3c7',
    fontSize: 14,
  },
  statValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DailyWalking;
