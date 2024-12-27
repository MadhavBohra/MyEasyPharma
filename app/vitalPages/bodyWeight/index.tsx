import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Keyboard, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome5"; // Import FontAwesome5 for flat icons
import { INITIAL_VITALS_DATA } from '@/constants/vitalData';

interface WeightEntry {
  date: string;
  weight: number;
}

const BodyWeightPage: React.FC = () => {
  const [currentWeight, setCurrentWeight] = useState<string>(""); // User input for current weight
  const [weightHistory, setWeightHistory] = useState<WeightEntry[]>([]); // Array of weight entries

  const handleAddWeight = (): void => {
    Keyboard.dismiss();

    const weight = parseFloat(currentWeight);
    if (isNaN(weight) || weight <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid weight.");
      return;
    }

    const newEntry: WeightEntry = {
      date: new Date().toLocaleDateString(),
      weight,
    };

      INITIAL_VITALS_DATA["Body Composition"][2].unit= `${weight} Kg`;
          if (weight < 80) {
            INITIAL_VITALS_DATA["Body Composition"][2].value= 30;
          } 
          
          if (weight >= 80 && weight < 100) {
            INITIAL_VITALS_DATA["Body Composition"][2].value= 70;
          } 
          
          if (weight >= 100) {
            INITIAL_VITALS_DATA["Body Composition"][2].value= 120;
          } 

    setWeightHistory([newEntry, ...weightHistory]); // Add new entry to history
    setCurrentWeight(""); // Clear input field
  };

  const renderWeightItem = ({ item }: { item: WeightEntry }) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyDate}>{item.date}</Text>
      <Text style={styles.historyWeight}>{item.weight} kg</Text>
    </View>
  );

  return (
    <LinearGradient colors={["#e3f2fd", "#f8fafc"]} style={styles.gradientBackground}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Motivation Section with Icon */}
        <View style={styles.motivationContainer}>
          <Icon name="heartbeat" size={30} color="#ff4757" style={styles.icon} />
          <Text style={styles.title}>Track Your Body Weight</Text>
          <Text style={styles.subtitle}>
            Monitoring your body weight helps maintain your health and fitness goals.
          </Text>
        </View>

        {/* Input Section */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>Enter Your Current Weight</Text>
          <TextInput
            style={styles.input}
            placeholder="Weight (kg)"
            keyboardType="numeric"
            value={currentWeight}
            onChangeText={setCurrentWeight}
            returnKeyType="done"
            blurOnSubmit={true}
          />
          <TouchableOpacity
            style={[styles.button, !currentWeight && styles.disabledButton]}
            onPress={handleAddWeight}
            disabled={!currentWeight}
          >
            <Text style={styles.buttonText}>Add Weight</Text>
          </TouchableOpacity>
        </View>

        {/* Weight History Section with Icon */}
        <View style={styles.historyContainer}>
          <View style={styles.historyHeader}>
            <Icon name="weight" size={24} color="#4caf50" />
            <Text style={styles.historyTitle}>Weight History</Text>
          </View>
          {weightHistory.length === 0 ? (
            <Text style={styles.noHistoryText}>No weight history available. Add your first entry!</Text>
          ) : (
            <FlatList
              data={weightHistory}
              renderItem={renderWeightItem}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
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
  icon: {
    marginBottom: 10,
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
  historyContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 2,
  },
  historyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
    marginLeft: 10,
  },
  noHistoryText: {
    fontSize: 16,
    color: "#374151",
    textAlign: "center",
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
  },
  historyDate: {
    fontSize: 16,
    color: "#374151",
  },
  historyWeight: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#374151",
  },
});

export default BodyWeightPage;
