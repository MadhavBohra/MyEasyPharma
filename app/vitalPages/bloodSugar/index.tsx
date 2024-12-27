import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { INITIAL_VITALS_DATA } from '@/constants/vitalData';


interface BloodSugarReading {
  value: number;
  category: string;
  color: string;
  advice: string;
}

const BloodSugarPage: React.FC = () => {
  const [bloodSugar, setBloodSugar] = useState<string>(""); 
  const [reading, setReading] = useState<BloodSugarReading | null>(null);

  const categorizeBloodSugar = useCallback((value: number): BloodSugarReading => {
    if (value < 70) {
      return {
        value,
        category: "Low Blood Sugar (Hypoglycemia)",
        color: "#2196f3",
        advice: "Eat something with sugar immediately and consult a doctor if needed.",
      };
    } 
    
    if (value >= 70 && value <= 99) {
      return {
        value,
        category: "Normal",
        color: "#4caf50",
        advice: "Great! Maintain a healthy diet and lifestyle.",
      };
    } 
    
    if (value >= 100 && value <= 125) {
      return {
        value,
        category: "Prediabetes",
        color: "#fb8c00",
        advice: "Monitor your blood sugar and consider dietary changes.",
      };
    } 
    
    if (value >= 126) {
      return {
        value,
        category: "High Blood Sugar (Diabetes)",
        color: "#f44336",
        advice: "Consult your doctor and manage your diet and exercise regularly.",
      };
    } 

    return {
      value,
      category: "Unknown",
      color: "#000",
      advice: "",
    };
  }, []);

  const handleSubmit = useCallback((): void => {
    const value = parseFloat(bloodSugar);

    if (isNaN(value) || value <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid blood sugar value.");
      return;
    }
    INITIAL_VITALS_DATA["Metabolic Health"][0].unit= `${value} mg/dL`;
    if (value < 70) {
      INITIAL_VITALS_DATA["Metabolic Health"][0].value= 30;
    } 
    
    if (value >= 70 && value <= 99) {
      INITIAL_VITALS_DATA["Metabolic Health"][0].value= 70;
    } 
    
    if (value >= 100 && value <= 125) {
      INITIAL_VITALS_DATA["Metabolic Health"][0].value= 120;
    } 
    const result = categorizeBloodSugar(value);
    setReading(result);
    setBloodSugar("");
  }, [bloodSugar, categorizeBloodSugar]);

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LinearGradient colors={["#e3f2fd", "#f8fafc"]} style={styles.gradientBackground}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.motivationContainer}>
            <Text style={styles.title}>Track Your Blood Sugar</Text>
            <Text style={styles.subtitle}>
              Regularly monitoring your blood sugar levels helps prevent or manage diabetes effectively.
            </Text>
            <View style={styles.iconsContainer}>

              <Image 
                source={require('../../../assets/images/icons/sugar-blood-level.png')} 
                style={styles.icon} 
              />
            </View>
          </View>

          {reading && (
            <View style={styles.feedbackContainer}>

              <Text style={styles.metric}>
                Blood Sugar: <Text style={[styles.highlight, { color: reading.color }]}>{reading.value} mg/dL</Text>
              </Text>
              <View style={styles.iconsContainer}>
                <Image 
                  source={require('../../../assets/images/icons/high-blood-sugar.png')} 
                  style={styles.icon} 
                />
              </View>
              <Text style={[styles.categoryText, { color: reading.color }]}>{reading.category}</Text>
              <Text style={styles.message}>{reading.advice}</Text>
            </View>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Enter Blood Sugar</Text>
            <TextInput
              style={styles.input}
              placeholder="Blood Sugar (mg/dL)"
              keyboardType="numeric"
              value={bloodSugar}
              onChangeText={setBloodSugar}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>What is Blood Sugar?</Text>
            <Text style={styles.infoText}>
              Blood sugar, or glucose, is the main sugar found in your blood. It comes from the food you eat and is your body's
              main source of energy. Keeping it in a healthy range is important to prevent conditions like diabetes.
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
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
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  icon: {
    width: 40,
    height: 40,
    margin: 5,
  },
  feedbackContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 2,
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

export default BloodSugarPage;
