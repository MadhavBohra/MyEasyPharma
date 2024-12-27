import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DailyCalories = ({ consumed, goal, foodSuggestions }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)} style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="flame-outline" size={24} color="white" />
          <View style={styles.headerText}>
            <Text style={styles.title}>Daily Calories</Text>
            <Text style={styles.subtitle}>Calories consumption in a day</Text>
          </View>
        </View>
        <Ionicons name={isCollapsed ? "chevron-down" : "chevron-up"} size={24} color="white" />
      </TouchableOpacity>
      
      {!isCollapsed && (
        <View style={styles.content}>
          <View style={styles.caloriesInfo}>
            <Text style={styles.consumedCalories}>{consumed}</Text>
            <Text style={styles.goalCalories}>of {goal}</Text>
            <Text style={styles.caloriesLabel}>Calories</Text>
          </View>
          
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${(consumed / goal) * 100}%` }]} />
          </View>
          
          <Text style={styles.suggestionsTitle}>Food suggestions</Text>
          {foodSuggestions.map((food, index) => (
            <View key={index} style={styles.foodItem}>
              <Text style={styles.foodName}>{food.name}</Text>
              <Text style={styles.foodCalories}>{food.calories} Kcal</Text>
            </View>
          ))}
          
          <TouchableOpacity style={styles.recordButton}>
            <Text style={styles.recordButtonText}>+ Record Your Consumptions</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF7F50',
    borderRadius: 15,
    padding: 15,
    width: '100%',
    maxWidth: 350,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 10,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  content: {
    marginTop: 15,
  },
  caloriesInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  consumedCalories: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  goalCalories: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 18,
    marginLeft: 5,
  },
  caloriesLabel: {
    color: 'white',
    fontSize: 16,
    marginLeft: 'auto',
  },
  progressBar: {
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2.5,
    marginVertical: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 2.5,
  },
  suggestionsTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  foodName: {
    color: 'white',
    fontSize: 14,
  },
  foodCalories: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  recordButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  recordButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default DailyCalories;