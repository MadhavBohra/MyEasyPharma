import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Bar } from "react-native-progress";
import { LinearGradient } from "expo-linear-gradient";
import { INITIAL_VITALS_DATA } from '@/constants/vitalData';

const TemperaturePage = () => {
  const [temperature, setTemperature] = useState(98.6); // Initial temperature in Fahrenheit
  const [inputTemperature, setInputTemperature] = useState(""); // Input for today's temperature

  const getTemperatureCategory = (temp) => {
    if (temp < 95)
      return {
        category: "Hypothermia",
        color: "#2196f3",
        message: "You are below normal temperature. Seek medical help.",
      };
    if (temp >= 95 && temp <= 99.5)
      return {
        category: "Normal",
        color: "#4caf50",
        message: "Your temperature is within the normal range.",
      };
    if (temp > 99.5 && temp <= 100.4)
      return {
        category: "Low-grade Fever",
        color: "#fb8c00",
        message: "You might be experiencing a mild fever. Stay hydrated.",
      };
    if (temp > 100.4)
      return {
        category: "Fever",
        color: "#f44336",
        message: "You have a high temperature. Consider consulting a doctor.",
      };
    return { category: "Unknown", color: "#000", message: "" };
  };

  const { category, color, message } = getTemperatureCategory(temperature);

  const handleTemperatureSubmit = () => {
    const parsedTemp = parseFloat(inputTemperature);
    if (isNaN(parsedTemp) || parsedTemp <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid temperature value.");
      return;
    }
    setTemperature(parsedTemp);
    setInputTemperature("");
    INITIAL_VITALS_DATA["Other Metrics"][1].unit= `${parsedTemp} °F`;
    if (parsedTemp<= 99.5){
      INITIAL_VITALS_DATA["Other Metrics"][1].value= 30;
      }
    else if (parsedTemp > 99.5 && parsedTemp <= 100.4)
    {
      INITIAL_VITALS_DATA["Other Metrics"][1].value= 80;
    }else{
      INITIAL_VITALS_DATA["Other Metrics"][1].value= 120;
    }
    Alert.alert(
      "Temperature Updated",
      `Your temperature has been updated to ${parsedTemp}°F.`
    );
  };

  return (
    <LinearGradient
      colors={["#e3f2fd", "#f8fafc"]}
      style={styles.gradientBackground}
    >
      <ScrollView style={styles.container}>
        {/* Motivation Section */}
        <View style={styles.motivationContainer}>
          <Image
            source={require("../../../assets/images/icons/temperature.png")} // Update with your icon's path
            style={styles.icon}
          />
          <Text style={styles.title}>Track Your Temperature</Text>
          <Text style={styles.subtitle}>
            Monitoring your body temperature helps you stay aware of your
            health. Normal temperature ranges between 97°F and 99°F.
          </Text>
        </View>

        {/* Current Temperature and Feedback */}
        <View style={styles.feedbackContainer}>
          <Text style={styles.metric}>
            Current Temperature:{" "}
            <Text style={[styles.highlight, { color }]}>
              {temperature.toFixed(1)}°F
            </Text>
          </Text>
          <Text style={[styles.categoryText, { color }]}>{category}</Text>
          <Text style={styles.message}>{message}</Text>
          <Image
            source={require("../../../assets/images/icons/thermometer-gun.png")} // Update with your icon's path
            style={[styles.icon, styles.smallIcon]}
          />
          <Bar
            progress={Math.min(temperature / 104, 1)} // Assuming 104°F as max for fever visualization
            width={null}
            height={10}
            color={color}
            unfilledColor="#e0e0e0"
            borderWidth={0}
            borderRadius={5}
          />
        </View>

        {/* Temperature Input Section */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Add Today's Temperature</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter temperature in °F"
            keyboardType="numeric"
            value={inputTemperature}
            onChangeText={setInputTemperature}
          />
          <TouchableOpacity style={styles.button} onPress={handleTemperatureSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>

        {/* Info Section */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>What is Body Temperature?</Text>
          <Text style={styles.infoText}>
            Body temperature is an indicator of your health. It typically ranges
            between 97°F and 99°F. Deviations may indicate hypothermia or fever,
            requiring attention.
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
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  smallIcon: {
    width: 30,
    height: 30,
    alignSelf: "center",
    marginVertical: 10,
  },
});

export default TemperaturePage;
