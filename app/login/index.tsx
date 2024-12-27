import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Button,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome, AntDesign, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';


WebBrowser.maybeCompleteAuthSession();

const LogIn: React.FC = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "818195435839-raue7rr39c16lrgk1ai8sb2onaqvr6l3.apps.googleusercontent.com",
    webClientId: "818195435839-13ia3v0aolnogncdnlniqbpqfrq77evf.apps.googleusercontent.com"
  });
  
  useEffect(() => {
    // Handle Google Sign-In when response changes
    handleSignInWithGoogle();
  }, [response]);
  
  async function handleSignInWithGoogle() {
    try {
      const user = await AsyncStorage.getItem("@user");
      
      if (!user) {
        // If no user is saved, handle Google sign-in
        if (response?.type === "success") {
          const userInfo = await getUserInfo(response.authentication?.accessToken);
          console.log(userInfo);
        } 
      } else {
        // If user exists, set it in state and redirect
        setUserInfo(JSON.parse(user));
        router.replace("/home");
      }
    } catch (error) {
      console.error("Error handling Google Sign-In:", error);
    }
  }
  
  const getUserInfo = async (token: string | undefined) => {
    if (!token) return;
  
    try {
      const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await response.json();
  
      // Save user info locally
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
  
      // Redirect to homepage
      router.replace("/home");
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://34.131.172.157/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        const { accessToken, refreshToken } = data;

        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);

        try{
          const profile_response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/user-profile`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`, // Replace with actual token variable
            },
          });
          console.log(profile_response);

        if (profile_response.ok)
          {
            router.replace('/home');
          }
        else{
          router.replace('/onboarding');
        }

        }catch (error) {
          console.error('Error during login:', error);
        }
      

      } else {
        Alert.alert('Login failed', data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Login Error', `Something went wrong, ${error}.`);

    }
  };



  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ImageBackground
      source={require("@/assets/images/Universal/backgroundimg.png")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        {/* Add KeyboardAvoidingView and ScrollView */}
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Adjust offset for iOS
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <SafeAreaView style={styles.container}>
              {/* Your content goes here */}
              <View style={styles.topRow}>
                <Image source={require("@/assets/images/Universal/logo.png")} style={styles.logo} />
                <Text style={styles.titleText}>MyEasyPharma</Text>
              </View>
              <Text style={styles.signUpText}>Log In</Text>
              <Text style={styles.loginText}>
                Don't have an account?{" "}
                <Text style={styles.underline} onPress={() => router.replace("/signup")}>
                  Sign Up
                </Text>
              </Text>

              {/* Social Login Buttons */}
              <TouchableOpacity
                style={[styles.loginButton, styles.googleButton]}
                activeOpacity={0.8}
                onPress={() => promptAsync()}
              >
                <AntDesign name="google" size={20} color="white" />
                <Text style={styles.loginButtonText}> Log in with Google</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.loginButton, styles.facebookButton]}
                activeOpacity={0.8}
                // onPress={() => promptAsync()}
              >
              <Button title="delete local storage" onPress={() => AsyncStorage.removeItem("@user")} />
                <FontAwesome name="facebook" size={20} color="white" />
                <Text style={styles.loginButtonText}> Log in with Facebook</Text>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.orText}>OR</Text>
                <View style={styles.divider} />
              </View>

              {/* Username and Password Inputs */}
              <Text style={styles.labelText}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
              />
              <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <View style={styles.iconContainer}>
                  <TouchableOpacity>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                  </TouchableOpacity>
                  <View style={{ flexDirection: 'row',marginTop:3 }}>
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={24}
                    color="black"
                  />
                  <Text style={styles.showText} onPress={toggleShowPassword} >{showPassword ? "hide" : "show"}</Text>
                  </View>
                </View>
              </View>


              {/* Log In Button */}
              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Log In</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </ScrollView>
        </KeyboardAvoidingView>
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
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 30,
    flex: 1,
    fontFamily:"Lufga",
  },
  signUpText: {
    color: "#254336",
    fontSize: 26,
    marginTop: 20,
    marginLeft: 20,
    fontFamily: "LufgaBold",
  },
  labelText: {
    color: "#254336",
    fontSize: 20,
    marginTop: 10,
    marginLeft: 20,
    fontWeight: "500",
    fontFamily:"LufgaMedium"
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
  },
  forgotPassword: {
    color: "#254336",
    fontSize: 16,
    marginTop: 10,
    marginLeft: 20,
    textDecorationLine: "underline",
    fontFamily:"LufgaMedium",
    textAlign:"center",
    textAlignVertical:"center"
  },
  loginButton: {
    backgroundColor: "#254336",
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 25,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily:"LufgaMedium",
    marginLeft: 10,
  },
  loginText: {
    color: "#254336",
    fontSize: 16,
    marginTop: 20,
    marginLeft:20,
    textAlign: "left",
    fontFamily:"LufgaMedium",
  },
  underline: {
    textDecorationLine: "underline",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#254336",
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#254336",
    fontFamily:"LufgaMedium",
  },
  facebookButton: {
    backgroundColor: "#1877f2",
    marginTop: 10,
  },
  googleButton: {
    backgroundColor: "#DB4437",
    marginTop: 20,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",  // Ensures space between the left and right items
    alignItems: "center",             // Align items vertically in the center
    width: "95%",                    // Ensure the container takes up full width
  },
  inputContainer:{

  },
  showText:{
    marginLeft:5,
    textAlignVertical:"center"
  }
});

export default LogIn;
