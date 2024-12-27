import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { Bar } from "react-native-progress";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { INITIAL_VITALS_DATA } from '@/constants/vitalData';

const HeartRatePage = () => {
  const [heartRate, setHeartRate] = useState("");
  const [inputError, setInputError] = useState(false);

  const analyzeHeartRate = () => {
    const bpm = parseInt(heartRate);
    if (isNaN(bpm) || bpm <= 0) {
      setInputError(true);
      Alert.alert("Invalid Input", "Please enter a valid heart rate.");
      return;
    }
    setInputError(false);

    INITIAL_VITALS_DATA["Cardiovascular Health"][1].unit= `${bpm} bpm`;

    if (bpm < 60) {
      Alert.alert("Heart Rate Analysis", "Your heart rate is LOW. Consult a healthcare provider.");
      INITIAL_VITALS_DATA["Cardiovascular Health"][1].value = 30; 
    } else if (bpm >= 60 && bpm <= 100) {
      Alert.alert("Heart Rate Analysis", "Your heart rate is NORMAL. Keep up the healthy lifestyle!");
      INITIAL_VITALS_DATA["Cardiovascular Health"][1].value = 80; 
    } else {
      Alert.alert("Heart Rate Analysis", "Your heart rate is HIGH. Consult a healthcare provider.");
      INITIAL_VITALS_DATA["Cardiovascular Health"][1].value = 120; 
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.header}>
        <View style={styles.headerContent}>
          <FontAwesome name="heartbeat" size={50} color="#ffffff" />
          <Text style={styles.title}>Heart Rate Monitor</Text>
          <Text style={styles.description}>
            Monitor your heart rate to stay informed about your cardiovascular health.
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.inputSection}>
        <Text style={styles.label}>
          <Icon name="favorite" size={20} color="#ef4444" /> Enter Your Heart Rate (BPM):
        </Text>
        <TextInput
          style={[styles.input, inputError && styles.inputError]}
          placeholder="e.g., 75"
          keyboardType="numeric"
          value={heartRate}
          onChangeText={setHeartRate}
        />
        {inputError && <Text style={styles.errorText}>Please enter a valid heart rate.</Text>}
        <TouchableOpacity style={styles.button} onPress={analyzeHeartRate}>
          <Text style={styles.buttonText}>
            <FontAwesome name="search" size={16} color="#ffffff" /> Analyze
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progressSection}>
        <Text style={styles.progressTitle}>Heart Rate Levels</Text>
        <Text style={styles.metric}>
          <Icon name="show-chart" size={18} color="#2563eb" /> Your Heart Rate:{" "}
          <Text style={styles.metricValue}>{heartRate || "N/A"} BPM</Text>
        </Text>
        <Bar
          progress={Math.min(parseInt(heartRate) / 100, 1) || 0}
          width={null}
          height={12}
          color={parseInt(heartRate) <= 100 && parseInt(heartRate) >= 60 ? "#10b981" : "#ef4444"}
          unfilledColor="#e5e7eb"
          borderWidth={0}
          borderRadius={8}
        />
      </View>

      <View style={styles.referenceSection}>
        <Text style={styles.referenceTitle}>Heart Rate Reference:</Text>
        <Text style={styles.referenceText}>
          <Icon name="arrow-downward" size={16} color="#d97706" /> Below 60 BPM: Low
        </Text>
        <Text style={styles.referenceText}>
          <Icon name="arrow-forward" size={16} color="#10b981" /> 60 to 100 BPM: Normal
        </Text>
        <Text style={styles.referenceText}>
          <Icon name="arrow-upward" size={16} color="#ef4444" /> Above 100 BPM: High
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    borderRadius: 12,
    marginBottom: 20,
    padding: 20,
  },
  headerContent: {
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: "#e0e0e0",
    textAlign: "center",
  },
  inputSection: {
    marginBottom: 20,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    elevation: 4,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#ffffff",
  },
  inputError: {
    borderColor: "#ef4444",
  },
  errorText: {
    fontSize: 14,
    color: "#ef4444",
    marginTop: 4,
  },
  button: {
    backgroundColor: "#3b82f6",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  progressSection: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    elevation: 4,
    marginBottom: 20,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 10,
  },
  metric: {
    fontSize: 16,
    color: "#1f2937",
    marginBottom: 10,
  },
  metricValue: {
    fontWeight: "bold",
    color: "#047857",
  },
  referenceSection: {
    backgroundColor: "#fef3c7",
    padding: 20,
    borderRadius: 12,
  },
  referenceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d97706",
    marginBottom: 10,
  },
  referenceText: {
    fontSize: 16,
    color: "#4b5563",
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default HeartRatePage;
