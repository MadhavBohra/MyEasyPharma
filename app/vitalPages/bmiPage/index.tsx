import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import { Bar } from "react-native-progress";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { INITIAL_VITALS_DATA } from '@/constants/vitalData';

const BmiPage = () => {
  const [bmi, setBmi] = useState(25.4); // Initial BMI
  const [inputBmi, setInputBmi] = useState(""); // Input for user to add today's BMI
  const healthyRange = { min: 18.5, max: 24.9 };

  const getBmiCategory = (bmiValue: number) => {
    if (bmiValue < 18.5) return { category: "Underweight", color: "#ffa726", message: "You may be at risk of malnutrition." };
    if (bmiValue >= 18.5 && bmiValue <= 24.9)
      return { category: "Normal", color: "#4caf50", message: "Great! Your BMI is within the optimal range." };
    if (bmiValue >= 25 && bmiValue <= 29.9)
      return { category: "Overweight", color: "#fb8c00", message: "Try to adopt a healthier lifestyle to reduce risks." };
    if (bmiValue >= 30)
      return { category: "Obese", color: "#f44336", message: "Consider consulting a doctor for guidance on managing your BMI." };
    return { category: "Unknown", color: "#000", message: "" };
  };

  const { category, color, message } = getBmiCategory(bmi);

  const handleBmiSubmit = () => {
    const parsedBmi = parseFloat(inputBmi);
    if (isNaN(parsedBmi) || parsedBmi <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid BMI value.");
      return;
    }
    setBmi(parsedBmi);
    setInputBmi("");
    INITIAL_VITALS_DATA["Body Composition"][0].unit= `${parsedBmi}`;
    if (parsedBmi < 18.5) {
      INITIAL_VITALS_DATA["Body Composition"][0].value= 30;
    } 
    
    if (parsedBmi >= 18.5 && parsedBmi < 25) {
      INITIAL_VITALS_DATA["Body Composition"][0].value= 70;
    } 
    
    if (parsedBmi >= 25) {
      INITIAL_VITALS_DATA["Body Composition"][0].value= 120;
    }     
    Alert.alert("BMI Updated", `Your BMI has been updated to ${parsedBmi}.`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Motivation Section */}
      <View style={styles.motivationContainer}>
        <Icon name="fitness-center" size={40} color="#2196f3" />
        <Text style={styles.title}>Track Your BMI</Text>
        <Text style={styles.subtitle}>
          Your BMI reflects your overall body weight relative to your height. Maintaining a healthy BMI ({healthyRange.min}–{healthyRange.max}) can help reduce health risks.
        </Text>
      </View>

      {/* Current BMI and Feedback */}
      <View style={styles.feedbackContainer}>
        <FontAwesome name="heartbeat" size={30} color={color} />
        <Text style={styles.metric}>
          Current BMI: <Text style={[styles.highlight, { color }]}>{bmi.toFixed(1)}</Text>
        </Text>
        <Text style={[styles.categoryText, { color }]}>{category}</Text>
        <Text style={styles.message}>{message}</Text>
        <Bar
          progress={Math.min(bmi / healthyRange.max, 1)}
          width={null}
          height={10}
          color={color}
          unfilledColor="#e0e0e0"
          borderWidth={0}
          borderRadius={5}
        />
      </View>

      {/* BMI Input Section */}
      <View style={styles.inputContainer}>
        <FontAwesome name="plus-square" size={30} color="#4caf50" />
        <Text style={styles.inputTitle}>Add Today's BMI</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your BMI"
          keyboardType="numeric"
          value={inputBmi}
          onChangeText={setInputBmi}
        />
        <TouchableOpacity style={styles.button} onPress={handleBmiSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <FontAwesome name="info-circle" size={30} color="#2196f3" />
        <Text style={styles.infoTitle}>What is BMI?</Text>
        <Text style={styles.infoText}>
          BMI (Body Mass Index) is a measure of body fat based on height and weight. It helps assess whether you are underweight, normal weight, overweight, or obese.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingHorizontal: 20,
  },
  motivationContainer: {
    marginTop: 20,
    backgroundColor: "#e3f2fd",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2196f3",
    marginTop: 10,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#374151",
  },
  feedbackContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 2,
    alignItems: "center",
  },
  metric: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
    marginVertical: 10,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  message: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: "center",
    color: "#374151",
  },
  inputContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 2,
    alignItems: "center",
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
    marginVertical: 10,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 2,
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
    marginVertical: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#374151",
    textAlign: "center",
  },
  highlight: {
    fontWeight: "bold",
  },
});

export default BmiPage;
