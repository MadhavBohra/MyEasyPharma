import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Vector icons
import { INITIAL_VITALS_DATA } from '@/constants/vitalData';

// Define the blood pressure reading type
type BloodPressureReading = {
  systolic: number;
  diastolic: number;
  category: string;
  color: string;
  advice: string;
};

const BloodPressurePage: React.FC = () => {
  const [systolic, setSystolic] = useState<string>("");
  const [diastolic, setDiastolic] = useState<string>("");
  const [reading, setReading] = useState<BloodPressureReading | null>(null);

  // Function to categorize blood pressure based on the input
  const categorizeBloodPressure = useCallback((systolic: number, diastolic: number): BloodPressureReading => {
    if (systolic < 90 || diastolic < 60) {
      return {
        systolic,
        diastolic,
        category: "Low Blood Pressure",
        color: "#03a9f4",
        advice: "Consider consulting a healthcare provider for advice on increasing blood pressure levels.",
      };
    } else if (systolic < 120 && diastolic < 80) {
      return {
        systolic,
        diastolic,
        category: "Normal",
        color: "#4caf50",
        advice: "Keep up the healthy lifestyle!",
      };
    } else if (systolic < 140 && diastolic < 90) {
      return {
        systolic,
        diastolic,
        category: "Elevated",
        color: "#ff9800",
        advice: "Monitor your blood pressure and consider lifestyle changes.",
      };
    } else {
      return {
        systolic,
        diastolic,
        category: "High Blood Pressure",
        color: "#f44336",
        advice: "Consult a healthcare provider to manage your blood pressure.",
      };
    }
  }, []);

  // Handle submit button click
  const handleSubmit = useCallback(() => {
    const systolicValue = parseInt(systolic, 10);
    const diastolicValue = parseInt(diastolic, 10);

    if (isNaN(systolicValue) || isNaN(diastolicValue)) {
      Alert.alert("Invalid Input", "Please enter valid numeric values for systolic and diastolic pressures.");
      return;
    }

    const result = categorizeBloodPressure(systolicValue, diastolicValue);
    INITIAL_VITALS_DATA["Cardiovascular Health"][0].unit= `${systolicValue}/${diastolicValue} mm Hg`;
              if (systolicValue < 90 || diastolicValue < 60) {
                INITIAL_VITALS_DATA["Cardiovascular Health"][0].value= 30;
              } 
              
              else if (systolicValue < 120 && diastolicValue < 80) {
                INITIAL_VITALS_DATA["Cardiovascular Health"][0].value= 70;
              } 
              
              else{
                INITIAL_VITALS_DATA["Cardiovascular Health"][0].value= 120;
              } 
    setReading(result);
  }, [systolic, diastolic, categorizeBloodPressure]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LinearGradient
        colors={["#e3f2fd", "#f8fafc"]}
        style={styles.gradientBackground}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Motivation Section */}
          <View style={styles.motivationContainer}>
            <Icon name="heart-pulse" size={50} color="#f44336" style={styles.icon} />
            <Text style={styles.title}>Track Your Blood Pressure</Text>
            <Text style={styles.subtitle}>
              Monitoring your blood pressure regularly helps you stay proactive
              about your heart health.
            </Text>
          </View>

          {/* Feedback Section */}
          {reading && (
            <View style={styles.feedbackContainer}>
              <Image
                source={require("../../../assets/images/icons/blood-pressure.png")} // Replace with your actual file path
                style={styles.iconImage}
              />
              <Text style={styles.metric}>
                Systolic:{" "}
                <Text style={[styles.highlight, { color: reading.color }]}>
                  {reading.systolic} mmHg
                </Text>
              </Text>
              <Text style={styles.metric}>
                Diastolic:{" "}
                <Text style={[styles.highlight, { color: reading.color }]}>
                  {reading.diastolic} mmHg
                </Text>
              </Text>
              <Text style={[styles.categoryText, { color: reading.color }]}>
                {reading.category}
              </Text>
              <Text style={styles.message}>{reading.advice}</Text>
            </View>
          )}

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Systolic (mmHg):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={systolic}
              onChangeText={setSystolic}
              placeholder="Enter systolic pressure"
            />
            <Text style={styles.inputLabel}>Diastolic (mmHg):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={diastolic}
              onChangeText={setDiastolic}
              placeholder="Enter diastolic pressure"
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Check</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradientBackground: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingHorizontal: 20, paddingBottom: 20 },
  motivationContainer: {
    marginTop: 20,
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    alignItems: "center",
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#2196f3", marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: "center", color: "#374151" },
  feedbackContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 2,
    alignItems: "center",
  },
  icon: { marginBottom: 10 }, // Vector icon
  iconImage: { width: 50, height: 50, marginBottom: 10 }, // Image icon
  metric: { fontSize: 16, marginBottom: 5, fontWeight: "bold" },
  highlight: { fontWeight: "bold" },
  categoryText: { fontSize: 20, fontWeight: "bold", marginTop: 10 },
  message: { fontSize: 14, marginTop: 10, textAlign: "center" },
  inputContainer: { marginTop: 20 },
  inputLabel: { fontSize: 16, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#4caf50",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default BloodPressurePage;
