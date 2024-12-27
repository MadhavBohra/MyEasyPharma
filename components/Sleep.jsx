import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons"
const Sleep = () => {
  const progress = 0.8; // Progress: 6 hrs 21 mins out of 8 hrs

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="moon-outline" color="#8b5cf6" size={24} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.timeText}>6 hrs 21 mins</Text>
        <Text style={styles.targetText}>Target: 8 hrs</Text>
      </View>
      <View 
        style={[styles.progressBar, { width: `${progress * 100}%` }]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 16,
    margin:10,
    overflow: 'hidden',
    position: 'relative',
    width:"50%",
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  targetText: {
    fontSize: 14,
    color: '#6b7280',
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 4,
    backgroundColor: '#8b5cf6',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});

export default Sleep;
