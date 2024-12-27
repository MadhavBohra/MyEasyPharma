import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform, // Import Platform to check the OS
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Make sure to install this package

const SignupScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      Alert.alert(
        "Passwords do not match",
        "Please enter the same password in both fields."
      );
      return false;
    }
    return true;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async () => {
    if (!validatePasswords()) {
      return; // Early return if passwords do not match
    }
    try {
      const response = await fetch(`http://34.131.172.157/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const { accessToken, refreshToken } = data;

        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);

        Alert.alert('Signup successful!');
        router.replace('/onboarding');
      } else {
        Alert.alert('Signup failed', data.message || 'Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      Alert.alert('Signup Error', 'Something went wrong, please try again.');
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/Universal/backgroundimg.png")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          {/* Wrap the content with KeyboardAvoidingView */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView} // Optional styling for the KeyboardAvoidingView
          >
            <View style={styles.topRow}>
              <Image source={require("@/assets/images/Universal/logo.png")} style={styles.logo} />
              <Text style={styles.titleText}>MyEasyPharma</Text>
            </View>
            <Text style={styles.signUpText}>Sign Up</Text>
            <TouchableOpacity 
              onPress={() => router.replace("/login")}
            >
              <Text style={styles.loginText}>
                Already have an account?{" "}
                <Text style={styles.underline}>Login</Text>
              </Text>
            </TouchableOpacity>

            <Text style={styles.labelText}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.labelText}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
            />

            <Text style={styles.labelText}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="black"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.labelText}>Confirm Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Confirm Password"
                secureTextEntry={!showPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="black"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.agreementText}>
              By creating an account you agree to our{" "}
              <Text style={styles.underline}>Terms of Service</Text> and{" "}
              <Text style={styles.underline}>Privacy Policy</Text>.
            </Text>

            <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
              <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  container: {
    flex: 1,
    paddingTop: 50,
  },
  keyboardAvoidingView: {
    flex: 1, // Ensure this takes the full height
    justifyContent: "center", // Optional: center vertically
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 55,
    height: 55,
    resizeMode: "contain",
  },
  titleText: {
    color: "#254336",
    fontSize: 25,
    textAlign: "center",
    marginRight: 30,
    flex: 1,
    fontFamily: "LufgaMedium",
  },
  signUpText: {
    color: "#254336",
    fontSize: 26,
    marginTop: 20,
    marginLeft: 20,
    fontFamily: "Lufga",
    fontWeight: "bold",
  },
  loginText: {
    color: "#254336",
    fontSize: 16,
    marginTop: 20,
    textAlign: "left",
    marginLeft: 20,
    fontFamily: "LufgaMedium",
  },
  labelText: {
    color: "#254336",
    fontSize: 20,
    marginTop: 20,
    marginLeft: 20,
    // marginWeight: "500",
    fontFamily: "LufgaMedium",
  },
  input: {
    height: 45,
    borderColor: "#254336",
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingHorizontal: 10,
    fontFamily: "LufgaMedium",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginRight: 0,
    width: "100%",
  },
  agreementText: {
    color: "#254336",
    fontSize: 14,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    textAlign: "center",
  },
  underline: {
    textDecorationLine: "underline",
    fontFamily: "LufgaSemiBold",
  },
  signupButton: {
    backgroundColor: "#254336",
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 25,
    marginTop: 20,
  },
  signupButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    marginRight: 10,
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    marginTop: 10,
    paddingRight: 10,
  },
});

export default SignupScreen;
