import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { ImageBackground, StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { useRouter } from 'expo-router';


const SettingScreen = () => {
    const router = useRouter();

    const navigateToMainScreen = () => router.replace("/home");
    const navigateToProfile = () => router.replace("/profile");
    const navigateToSettings = () => router.replace("/settings");
    const navigateToStatistics = () => router.replace("/statistics");
  return (
    <ImageBackground
      source={require("@/assets/assets/backgroundimg.png")}
      style={styles.background}
    >

        <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton} onPress={navigateToMainScreen}>
                <Ionicons name="home" size={24} color="white" />
                <Text style={styles.footerText}>Main</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={navigateToStatistics}>
                <Ionicons name="stats-chart" size={24} color="white" />
                <Text style={styles.footerText}>Statistics</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={navigateToProfile}>
                <Ionicons name="person" size={24} color="white" />
                <Text style={styles.footerText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton} onPress={navigateToSettings}>
                <Ionicons name="settings" size={24} color="white" />
                <Text style={styles.footerText}>Settings</Text>
                </TouchableOpacity>
            </View>
    </ImageBackground>

  );


  
};

const styles = StyleSheet.create({
    background: {
      flex: 1,
      width: "100%",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#254336",
        paddingVertical: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      footerButton: {
        alignItems: "center",
      },
      footerText: {
        color: "white",
        fontSize: 12,
        marginTop: 4,
      },
});


export default SettingScreen;