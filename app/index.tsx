import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router"; // Correct router import

const Index = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/login"); // Correct navigation to use push instead of navigate
  };

  return (
    <ImageBackground
      source={require("../assets/images/LandingPage/backgroundimg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Card Container */}
        <View style={styles.card}>
          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.title}>MyEasyPharma</Text>
          <Text style={styles.sub_title}>
            AI Curated Corporate Wellness Program
          </Text>
        </View>

        {/* Hero Image */}
        <Image
          source={require("../assets/images/LandingPage/homepage.png")}
          style={styles.hero_img}
        />

        {/* Custom Round Button */}
        <TouchableOpacity
          style={styles.btn_container}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <Text style={styles.btn_text}>Get Started for Free</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  container: {
    width: "90%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  card: {
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.5)",
    width: "100%",
    padding: 20,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 24,
    fontFamily: "LufgaBold", // Custom font; ensure it's loaded or use a fallback
    color: "#254336",
    textAlign: "left",
  },
  sub_title: {
    fontSize: 16,
    color: "#254336",
    fontFamily: "LufgaMedium", // Custom font; ensure it's loaded or use a fallback
    marginTop: 5,
  },
  hero_img: {
    marginTop: 40,
    height: "50%",
    resizeMode: "contain",
    marginBottom: 40,
  },
  btn_container: {
    width: "80%",
    alignItems: "center",
    marginTop: 30,
    borderRadius: 100,
    backgroundColor: "#7F9878",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  btn_text: {
    fontSize: 16,
    color: "#FFF",
    textAlign: "center",
    fontFamily: "LufgaBold", // Custom font; ensure it's loaded or use a fallback
  },
});

export default Index;
