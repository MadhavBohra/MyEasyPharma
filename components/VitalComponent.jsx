import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

const CARD_WIDTH = Dimensions.get('window').width * 0.8;

// Helper function to determine the color based on the value and thresholds
const getColor = (value, healthyRange) => {
  const { min, max } = healthyRange;


  if (value < min) {
    return '#FFC107'; // Yellow - Risky
  } else if (value > max) {
    return '#FF0000'; // Red - Critical
  }
  return '#4CAF50'; // Green - Healthy

};

const VitalComponent = ({
  title, // The name of the vital (e.g., "Heart Rate")
  iconSource, // Pass a pre-imported image source here
  value = 0, // Current value of the vital
  unit = '', // Unit for the vital (e.g., "bpm")
  subtitle = '', // Custom subtitle to display below the heading
  healthyRange = { min: 60, max: 100 }, // Range for determining health status
}) => {
  const color = getColor(value, healthyRange);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
          {iconSource ? (
            <Image source={iconSource} style={styles.icon} />
          ) : (
            <Text style={{ color: 'red', fontSize: 14 }}>Icon not found</Text>
          )}
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
      <Text style={[styles.valueText, { color }]}>{unit || '--'}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <View style={styles.statusContainer}>
        <Text style={[styles.statusText, { color }]}>
          {color === '#FF0000'
            ? 'High'
            : color === '#FFC107'
            ? 'Low'
            : 'Good'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    margin: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  valueText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  unitText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  statusContainer: {
    marginTop: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default VitalComponent;
