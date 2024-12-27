import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types for onboarding data
interface OnboardingData {
  firstName: string;
  lastName: string;
  dob: string;
  address: string;
  bloodType: string;
  height: string;
  weight: string;
  profilePhoto: string;
  gender: string;
  activityLevel: string;
}

// Base Screen Component
const ScreenWrapper: React.FC<{
  children: React.ReactNode;
  progress: number;
  onNext: () => void;
  onBack?: () => void;
  isNextDisabled?: boolean;
  isLastScreen?: boolean;
}> = ({ children, progress, onNext, onBack, isNextDisabled, isLastScreen }) => (
  <ImageBackground
    source={require('@/assets/assets/backgroundimg.png')}
    style={styles.background}
  >
    <SafeAreaView style={styles.container}>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
      <View style={styles.content}>{children}</View>
      <View style={styles.buttonContainer}>
        {onBack && (
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.nextButton, isNextDisabled && styles.disabledButton]}
          onPress={onNext}
          disabled={isNextDisabled}
        >
          <Text style={styles.nextButtonText}>
            {isLastScreen ? 'Complete' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  </ImageBackground>
);

// Name Screen
const NameScreen: React.FC<{
  data: OnboardingData;
  setData: (data: OnboardingData) => void;
  onNext: () => void;
  onBack: () => void;
}> = ({ data, setData, onNext, onBack }) => {
  const isNextDisabled = !(data.firstName && data.lastName);

  return (
    <ScreenWrapper
      progress={25}
      onNext={onNext}
      onBack={onBack}
      isNextDisabled={isNextDisabled}
    >
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>Let's get to know you better</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={data.firstName}
          onChangeText={(value) => setData({ ...data, firstName: value })}
          placeholder="Enter your first name"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={data.lastName}
          onChangeText={(value) => setData({ ...data, lastName: value })}
          placeholder="Enter your last name"
        />
      </View>
    </ScreenWrapper>
  );
};

// Basic Info Screen
const BasicInfoScreen: React.FC<{
  data: OnboardingData;
  setData: (data: OnboardingData) => void;
  onNext: () => void;
  onBack: () => void;
}> = ({ data, setData, onNext, onBack }) => {
  const isNextDisabled = !(data.dob && data.address && data.gender);

  return (
    <ScreenWrapper
      progress={50}
      onNext={onNext}
      onBack={onBack}
      isNextDisabled={isNextDisabled}
    >
      <Text style={styles.title}>Basic Information</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          value={data.dob}
          onChangeText={(value) => setData({ ...data, dob: value })}
          placeholder="YYYY-MM-DD"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={data.address}
          onChangeText={(value) => setData({ ...data, address: value })}
          placeholder="Enter your address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender</Text>
        <TextInput
          style={styles.input}
          value={data.gender}
          onChangeText={(value) => setData({ ...data, gender: value })}
          placeholder="Gender"
        />
      </View>
    </ScreenWrapper>
  );
};

// Physical Info Screen
const PhysicalInfoScreen: React.FC<{
  data: OnboardingData;
  setData: (data: OnboardingData) => void;
  onNext: () => void;
  onBack: () => void;
}> = ({ data, setData, onNext, onBack }) => {
  const isNextDisabled = !(
    data.height &&
    data.weight &&
    data.bloodType &&
    data.activityLevel
  );

  return (
    <ScreenWrapper
      progress={75}
      onNext={onNext}
      onBack={onBack}
      isNextDisabled={isNextDisabled}
      isLastScreen
    >
      <Text style={styles.title}>Physical Information</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Height (cm)</Text>
        <TextInput
          style={styles.input}
          value={data.height}
          onChangeText={(value) => setData({ ...data, height: value })}
          keyboardType="numeric"
          placeholder="Height"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput
          style={styles.input}
          value={data.weight}
          onChangeText={(value) => setData({ ...data, weight: value })}
          keyboardType="numeric"
          placeholder="Weight"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Blood Type</Text>
        <TextInput
          style={styles.input}
          value={data.bloodType}
          onChangeText={(value) => setData({ ...data, bloodType: value })}
          placeholder="Blood type"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Activity Level</Text>
        <TextInput
          style={styles.input}
          value={data.activityLevel}
          onChangeText={(value) => setData({ ...data, activityLevel: value })}
          placeholder="Activity level"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Profile Photo URL (Optional)</Text>
        <TextInput
          style={styles.input}
          value={data.profilePhoto}
          onChangeText={(value) => setData({ ...data, profilePhoto: value })}
          placeholder="URL of your profile photo"
        />
      </View>
    </ScreenWrapper>
  );
};

// Main Onboarding Component
const OnboardingFlow: React.FC = () => {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    firstName: '',
    lastName: '',
    dob: '',
    address: '',
    bloodType: '',
    height: '',
    weight: '',
    profilePhoto: '',
    gender: '',
    activityLevel: '',
  });

  const handleComplete = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const token = await AsyncStorage.getItem('accessToken');
      
      if (!token) {
        Alert.alert('Error', 'Authentication token not found. Please log in again.');
        router.push('/login');
        return;
      }

      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        dob: data.dob,
        address: data.address,
        bloodGroup: data.bloodType,
        height: parseFloat(data.height),
        weight: parseFloat(data.weight),
        profilePhoto: data.profilePhoto || null,
        // gender: data.gender,
        // activity_level: data.activityLevel,
      };

      const response = await fetch(`http://34.131.172.157/user-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("User profile created successfully");
        await AsyncStorage.setItem('userProfile', JSON.stringify(payload));
        router.push("/home");
      } else {
        throw new Error(responseData.message || 'Failed to create user profile');
      }
    } catch (error) {
      console.error("An error occurred:", error);
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Failed to create profile. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const screens = [
    <NameScreen 
      key="name" 
      data={data} 
      setData={setData} 
      onNext={() => setCurrentScreen(1)} 
      onBack={() => router.back()} 
    />,
    <BasicInfoScreen 
      key="basic" 
      data={data} 
      setData={setData} 
      onNext={() => setCurrentScreen(2)} 
      onBack={() => setCurrentScreen(0)} 
    />,
    <PhysicalInfoScreen 
      key="physical" 
      data={data} 
      setData={setData} 
      onNext={handleComplete} 
      onBack={() => setCurrentScreen(1)} 
    />,
  ];

  return screens[currentScreen];
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#254336',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F7F7F',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  nextButton: {
    backgroundColor: '#254336',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 50,
  },
  backButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
  },
  backButtonText: {
    color: '#254336',
    fontWeight: 'bold',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
});

export default OnboardingFlow;