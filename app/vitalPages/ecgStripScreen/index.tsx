import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

const ECGStripPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [ecgAnalysis, setEcgAnalysis] = useState<{
    heart_rate: number;
    abnormalities: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          "Permission Required", 
          "Sorry, we need camera roll permissions to make this work!"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0].uri) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick an image");
      console.error(error);
    }
  };

  const processImage = async (imageUri: string) => {
    if (!imageUri) return;

    setLoading(true);
    try {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: 300 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );

      const fakeAnalysis = {
        heart_rate: Math.floor(Math.random() * (100 - 60 + 1)) + 60,
        abnormalities: "No significant abnormalities detected",
      };

      setProcessedImage(manipulatedImage.uri);
      setEcgAnalysis(fakeAnalysis);
    } catch (error) {
      Alert.alert("Processing Error", "There was an error processing the image.");
      console.error("Error processing image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.pickButton} 
        onPress={pickImage}
      >
        <Text style={styles.buttonText}>Pick an ECG Image</Text>
      </TouchableOpacity>

      {selectedImage && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: selectedImage }}
            style={styles.selectedImage}
          />
          <TouchableOpacity
            style={styles.processButton}
            onPress={() => processImage(selectedImage)}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Processing..." : "Process Image"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {ecgAnalysis && (
        <View style={styles.analysisContainer}>
          <Text style={styles.sectionTitle}>ECG Analysis</Text>
          <Text>Heart Rate: {ecgAnalysis.heart_rate} bpm</Text>
          <Text>Abnormalities: {ecgAnalysis.abnormalities}</Text>
        </View>
      )}

      {processedImage && (
        <View style={styles.processedImageContainer}>
          <Text style={styles.sectionTitle}>Processed Image</Text>
          <Image
            source={{ uri: processedImage }}
            style={styles.processedImage}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  pickButton: {
    marginBottom: 20,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  processButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  selectedImage: {
    width: 300,
    height: 200,
    marginBottom: 10,
    resizeMode: "contain",
  },
  analysisContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  processedImageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  processedImage: {
    width: 300,
    height: 200,
    marginTop: 10,
    resizeMode: "contain",
  },
});

export default ECGStripPage;