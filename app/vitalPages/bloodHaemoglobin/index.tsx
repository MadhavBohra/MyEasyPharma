import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { INITIAL_VITALS_DATA } from '@/constants/vitalData';

interface HemoglobinReading {
  status: string;
  suggestion: string;
}

// Import the hemoglobin icon
const hemoglobinIcon = require("../../../assets/images/icons/haemoglobin.png");

const BloodHemoglobinPage: React.FC = () => {
  const [hemoglobin, setHemoglobin] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [reading, setReading] = useState<HemoglobinReading | null>(null);

  const handleSubmit = (): void => {
    const hemoglobinValue = parseFloat(hemoglobin);

    if (!hemoglobin || isNaN(hemoglobinValue)) {
      Alert.alert("Error", "Please enter a valid hemoglobin level.");
      return;
    }

    if (!gender) {
      Alert.alert("Error", "Please select your gender.");
      return;
    }

    let status = "";
    let suggestion = "";

    if (gender === "Male") {
      if (hemoglobinValue < 13.5) {
        status = "Low";
        suggestion = "Consult a doctor for a proper diagnosis and iron-rich diet recommendations.";
        INITIAL_VITALS_DATA["Metabolic Health"][1].unit= `${hemoglobinValue} g/dL`;
        INITIAL_VITALS_DATA["Metabolic Health"][1].value= 30;

      } else if (hemoglobinValue > 17.5) {
        status = "High";
        suggestion = "Stay hydrated and consult a healthcare provider for further advice.";
        INITIAL_VITALS_DATA["Metabolic Health"][1].unit= `${hemoglobinValue} g/dL`;
        INITIAL_VITALS_DATA["Metabolic Health"][1].value= 80;
      } else {
        status = "Normal";
        suggestion = "Your hemoglobin level is normal. Keep up your healthy lifestyle!";
        INITIAL_VITALS_DATA["Metabolic Health"][1].unit= `${hemoglobinValue} g/dL`;
        INITIAL_VITALS_DATA["Metabolic Health"][1].value= 120;
      }
    } else if (gender === "Female") {
      if (hemoglobinValue < 12.0) {
        status = "Low";
        suggestion = "Consider increasing iron intake and consult a doctor if necessary.";
        INITIAL_VITALS_DATA["Metabolic Health"][1].unit= `${hemoglobinValue} g/dL`;
        INITIAL_VITALS_DATA["Metabolic Health"][1].value= 30;
      } else if (hemoglobinValue > 15.5) {
        status = "High";
        suggestion = "Drink plenty of water and seek medical advice if needed.";
        INITIAL_VITALS_DATA["Metabolic Health"][1].unit= `${hemoglobinValue} g/dL`;
        INITIAL_VITALS_DATA["Metabolic Health"][1].value= 80;
      } else {
        status = "Normal";
        suggestion = "Your hemoglobin level is normal. Great job maintaining your health!";
        INITIAL_VITALS_DATA["Metabolic Health"][1].unit= `${hemoglobinValue} g/dL`;
        INITIAL_VITALS_DATA["Metabolic Health"][1].value= 120;
      }
    }




    setReading({ status, suggestion });
  };

  return (
    <LinearGradient colors={["#e3f2fd", "#f8fafc"]} style={styles.gradientBackground}>
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.motivationContainer}>
          <Image source={hemoglobinIcon} style={styles.icon} />
          <Text style={styles.title}>Track Your Hemoglobin</Text>
          <Text style={styles.subtitle}>
            Monitoring hemoglobin levels helps maintain your overall health and detect potential conditions like anemia.
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your hemoglobin level (e.g., 14.2)"
            value={hemoglobin}
            onChangeText={setHemoglobin}
            keyboardType="numeric"
          />
          
          <View style={styles.genderButtonContainer}>
            <TouchableOpacity 
              style={[
                styles.genderButton, 
                gender === "Male" && styles.selectedGenderButton
              ]}
              onPress={() => setGender("Male")}
            >
              <Text style={styles.genderButtonText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.genderButton, 
                gender === "Female" && styles.selectedGenderButton
              ]}
              onPress={() => setGender("Female")}
            >
              <Text style={styles.genderButtonText}>Female</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          style={[
            styles.submitButton, 
            (!hemoglobin || !gender) && styles.disabledSubmitButton
          ]}
          onPress={handleSubmit}
          disabled={!hemoglobin || !gender}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        {reading && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Status: {reading.status}</Text>
            <Text style={styles.resultText}>Suggestion: {reading.suggestion}</Text>
          </View>
        )}
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
    paddingVertical: 20,
  },
  motivationContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  genderButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  genderButton: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  selectedGenderButton: {
    backgroundColor: "#4CAF50",
  },
  genderButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  disabledSubmitButton: {
    backgroundColor: "#cccccc",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#e8f5e9",
    borderRadius: 8,
  },
  resultText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
});

export default BloodHemoglobinPage;