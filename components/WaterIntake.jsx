import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Example icon library

const WaterIntake = ({data}) => {
  const progress = 0.75; // 1.5 / 2 liters

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {/* Using a water-drop icon from MaterialCommunityIcons */}
        <MaterialCommunityIcons name="water" size={24} color="#3b82f6" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.waterText}>
          {data}<Text style={styles.litersText}>/2 Liters</Text>
        </Text>
        <Text style={styles.subText}>You need 0.5 liters more</Text>
      </View>
      <View 
        style={[
          styles.progressBar, 
          { width: `${progress * 100}%` }
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    padding: 10,
    position: 'relative',
    overflow: 'hidden',
    width:"50%",
    margin:10,
  },
  iconContainer: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  waterText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  litersText: {
    fontSize: 14,
    color: '#6b7280',
  },
  subText: {
    fontSize: 12,
    color: '#6b7280',
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 4,
    backgroundColor: '#3b82f6',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default WaterIntake;
