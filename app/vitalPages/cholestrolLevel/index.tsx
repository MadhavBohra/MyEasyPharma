import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, Keyboard, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { INITIAL_VITALS_DATA } from '@/constants/vitalData';

interface CholesterolReading {
  value: number;
  category: string;
  color: string;
  advice: string;
}

const CholesterolLevelPage: React.FC = () => {
  const [cholesterol, setCholesterol] = useState<string>(""); 
  const [reading, setReading] = useState<CholesterolReading | null>(null); 

  const categorizeCholesterol = (value: number): CholesterolReading => {
    // More comprehensive validation
    if (isNaN(value) || value <= 0) {
      return {
        value,
        category: "Invalid Input",
        color: "#FF0000",
        advice: "Please enter a valid cholesterol value.",
      };
    }

    if (value < 200) {
      return {
        value,
        category: "Desirable Cholesterol",
        color: "#4caf50",
        advice: "Your cholesterol level is in a healthy range. Maintain your lifestyle!",
      };
    } else if (value >= 200 && value < 240) {
      return {
        value,
        category: "Borderline High Cholesterol",
        color: "#ff9800",
        advice: "Consider dietary changes and regular exercise. Monitor your levels closely.",
      };
    } else if (value >= 240) {
      return {
        value,
        category: "High Cholesterol",
        color: "#f44336",
        advice: "Consult a healthcare provider for proper management and possible medication.",
      };
    }

    return {
      value,
      category: "Unknown",
      color: "#000",
      advice: "Unable to categorize cholesterol level.",
    };
  };

  const handleSubmit = (): void => {
    // Dismiss keyboard on submission
    Keyboard.dismiss();

    const value = parseFloat(cholesterol);
    const result = categorizeCholesterol(value);
    
    // Only set reading if input is valid
    if (result.category !== "Invalid Input") {
      setReading(result);
      setCholesterol(""); // Clear input after successful submission
      INITIAL_VITALS_DATA["Metabolic Health"][2].unit= `${value} mg/dL`;
          if (value < 200) {
            INITIAL_VITALS_DATA["Metabolic Health"][2].value= 30;
          } 
          
          if (value >= 200 && value < 240) {
            INITIAL_VITALS_DATA["Metabolic Health"][2].value= 70;
          } 
          
          if (value >= 240) {
            INITIAL_VITALS_DATA["Metabolic Health"][2].value= 120;
          } 
    } else {
      Alert.alert("Invalid Input", result.advice);
    }
  };

  return (
    <LinearGradient colors={["#e3f2fd", "#f8fafc"]} style={styles.gradientBackground}>
      <ScrollView 
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.motivationContainer}>
          <Text style={styles.title}>Track Your Cholesterol</Text>
          <Text style={styles.subtitle}>
            Monitoring cholesterol levels helps reduce the risk of heart disease and stroke.
          </Text>
        </View>

        {reading && (
          <View style={styles.feedbackContainer}>
            <Image
              source={require('../../../assets/images/icons/fat.png')} // Add your cholesterol icon here
              style={styles.icon}
            />
            <Text style={styles.metric}>
              Cholesterol: <Text style={[styles.highlight, { color: reading.color }]}>{reading.value} mg/dL</Text>
            </Text>
            <Text style={[styles.categoryText, { color: reading.color }]}>{reading.category}</Text>
            <Text style={styles.message}>{reading.advice}</Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Enter Cholesterol Level</Text>
          <TextInput
            style={styles.input}
            placeholder="Cholesterol (mg/dL)"
            keyboardType="numeric"
            value={cholesterol}
            onChangeText={setCholesterol}
            returnKeyType="done"
            blurOnSubmit={true}
          />
          <TouchableOpacity 
            style={[styles.button, !cholesterol && styles.disabledButton]} 
            onPress={handleSubmit}
            disabled={!cholesterol}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Image
            source={require('../../../assets/images/icons/cholesterol.png')} // Add your info icon here
            style={styles.icon}
          />
          <Text style={styles.infoTitle}>What is Cholesterol?</Text>
          <Text style={styles.infoText}>
            Cholesterol is a waxy, fat-like substance in your blood. While your body needs cholesterol to build cells, too
            much can increase the risk of heart disease. Regular monitoring and healthy habits are key to managing levels.
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollViewContent: {
    paddingBottom: 20, // Add padding at the bottom of the scroll view
  },
  motivationContainer: {
    marginTop: 20,
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2196f3",
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
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  metric: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 10,
    color: "#374151",
  },
  inputContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 2,
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#cccccc",
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
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#374151",
  },
  highlight: {
    fontWeight: "bold",
  },
});

export default CholesterolLevelPage;
