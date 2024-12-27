import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import { Bar } from "react-native-progress";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const WaterIntakePage = () => {
  const [weight, setWeight] = useState(""); // User's weight in kg
  const [intake, setIntake] = useState(0); // Current water intake in liters
  const [goal, setGoal] = useState(2); // Daily water goal in liters (default: 2L)

  const calculateGoal = (weight: string) => {
    const userWeight = parseFloat(weight); // Parse weight to a number
    if (!isNaN(userWeight) && userWeight > 0) {
      const calculatedGoal = (userWeight * 0.033).toFixed(1); // Calculate goal
      setGoal(parseFloat(calculatedGoal)); // Update goal as a number
      Alert.alert("Goal Updated", `Your daily water goal is set to ${calculatedGoal} liters.`);
    } else {
      Alert.alert("Invalid Input", "Please enter a valid weight.");
    }
  };

  const addWater = (amount: number) => {
    const newIntake = intake + amount;
    setIntake(newIntake);
    Alert.alert("Water Added", `You have added ${amount}L of water.`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Motivation Section */}
      <View style={styles.motivationContainer}>
        <Text style={styles.title}>💧 Track Your Water Intake</Text>
        <Text style={styles.subtitle}>
          Stay hydrated by tracking your daily water intake. Proper hydration helps maintain energy, focus, and overall health.
        </Text>
      </View>

      {/* Current Progress Section */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          <MaterialIcons name="update" size={18} color="#374151" /> Today's Progress
        </Text>
        <Text style={styles.metric}>
          {intake.toFixed(1)}L / {goal}L
        </Text>
        <Bar
          progress={Math.min(intake / goal, 1)}
          width={null}
          height={12}
          color="#4caf50"
          unfilledColor="#e0e0e0"
          borderWidth={0}
          borderRadius={10}
        />
        <Text style={styles.hint}>
          {intake >= goal ? "🎉 Well done! You're hydrated." : "🚰 Keep drinking water to reach your goal!"}
        </Text>
      </View>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Set Your Water Goal</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your weight (kg)"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
        <TouchableOpacity style={styles.button} onPress={() => calculateGoal(weight)}>
          <Text style={styles.buttonText}>
            <FontAwesome5 name="calculator" size={16} color="#ffffff" /> Calculate Goal
          </Text>
        </TouchableOpacity>
      </View>

      {/* Add Water Section */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Add Water Intake</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.waterButton} onPress={() => addWater(0.25)}>
            <Text style={styles.buttonText}>+250ml</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.waterButton} onPress={() => addWater(0.5)}>
            <Text style={styles.buttonText}>+500ml</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.waterButton} onPress={() => addWater(1)}>
            <Text style={styles.buttonText}>+1L</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Why Stay Hydrated?</Text>
        <Text style={styles.infoText}>
          Drinking enough water daily supports digestion, regulates body temperature, and improves skin health. Aim to drink water evenly throughout the day.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f8fe",
    paddingHorizontal: 20,
  },
  motivationContainer: {
    marginTop: 20,
    backgroundColor: "#cce5ff",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0d6efd",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#495057",
  },
  progressContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    elevation: 3,
  },
  progressText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#212529",
  },
  metric: {
    fontSize: 16,
    marginBottom: 10,
    color: "#198754",
  },
  hint: {
    fontSize: 14,
    marginTop: 10,
    color: "#6c757d",
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    elevation: 3,
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#dee2e6",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#0d6efd",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  waterButton: {
    backgroundColor: "#0d6efd",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: 80,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#495057",
  },
});

export default WaterIntakePage;
