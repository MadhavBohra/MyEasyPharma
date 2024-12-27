import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useVitalContext } from "@/components/context/VitalContext";
import VitalComponent from "@/components/VitalComponent";
import CircularProgressBar from "@/components/CircularProgress";
import { INITIAL_VITALS_DATA } from '@/constants/vitalData';
import Ionicons from '@expo/vector-icons/Ionicons';

// Import images through a centralized constant
const HomeScreen: React.FC = () => {
  const router = useRouter();
  const { steps } = useVitalContext();
  const riskScore = 30;

  const navigateToPage = (page: string) => {
    router.push(page as any);
  };

  const renderVitals = (category: string) => (
    <ScrollView
      horizontal
      contentContainerStyle={styles.horizontalScroll}
      showsHorizontalScrollIndicator={false}
    >
      {INITIAL_VITALS_DATA[category].map((vital: { page: string; title: unknown; unit: string | undefined; value: number | undefined; iconPath: unknown; }, index: any) => (
        <TouchableOpacity
          key={`${category}-${index}`}
          style={styles.longCard}
          onPress={() => navigateToPage(vital.page)}
          activeOpacity={0.7}
        >
          <VitalComponent
            title={vital.title}
            unit={vital.unit}
            value={vital.value}
            iconSource={vital.iconPath}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const navigateToMainScreen = (): void => router.push('/home');
  const navigateToProfile = (): void => router.push('/profile');
  const navigateToChat = (): void => router.push('/chat');

  return (
    <ImageBackground
      source={require("@/assets/assets/backgroundimg.png")}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.overlay}>
          <View style={styles.riskScoreContainer}>
            <View style={styles.riskScoreBackground}>
              <CircularProgressBar
                progress={riskScore}
                size={300}
                color1="#e0e0e0"
                imageSource={require("@/assets/images/HomePage/profilepic.jpg")}
              />
              <Text style={styles.riskScoreText}>{riskScore}</Text>
              <Text style={styles.riskScoreLabel}>Risk Score</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Your Vitals</Text>

          {Object.entries(INITIAL_VITALS_DATA).map(([category, _]) => (
            <React.Fragment key={category}>
              <Text style={styles.categoryTitle}>
                {category.split(/(?=[A-Z])/).join(" ")}
              </Text>
              {renderVitals(category)}
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton} onPress={navigateToMainScreen}>
            <Ionicons name="home" size={24} color="white" />
            <Text style={styles.footerText}>Main</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={navigateToChat}>
            <Ionicons name="chatbubbles" size={24} color="white" />
            <Text style={styles.footerText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={navigateToProfile}>
            <Ionicons name="person" size={24} color="white" />
            <Text style={styles.footerText}>Profile</Text>
          </TouchableOpacity>
        </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { 
    flex: 1, 
    width: "100%", 
    height: "100%" 
  },
  scrollContent: { 
    flexGrow: 1 
  },
  overlay: { 
    padding: 20, 
    backgroundColor: "rgba(255, 255, 255, 0.55)"
  },
  riskScoreContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  riskScoreBackground: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  riskScoreText: { 
    fontSize: 40, 
    fontWeight: "bold", 
    marginTop: 10 
  },
  riskScoreLabel: { 
    fontSize: 20, 
    color: "#555", 
    marginTop: 5 
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  horizontalScroll: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  longCard: {
    backgroundColor: 'rgba(255,255,255,0)',
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0)",
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "left",
    color: "#333",
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#254336',
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
});

export default HomeScreen;