import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

interface UserProfile {
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  bloodType: string;
  activityLevel: string;
  goals: string[];
}

const EditProfileScreen: React.FC = () => {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile>({
    firstName: 'John',
    lastName: 'Doe',
    age: '28',
    gender: 'Male',
    height: '175',
    weight: '70',
    bloodType: 'O+',
    activityLevel: 'Moderate',
    goals: [
      'Maintain weight at 70kg',
      'Exercise 45 minutes daily',
      'Sleep 8 hours per night',
      'Drink 3L water daily'
    ]
  });

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdateGoal = (index: number, value: string) => {
    const newGoals = [...profile.goals];
    newGoals[index] = value;
    setProfile(prev => ({
      ...prev,
      goals: newGoals
    }));
  };

  const handleSave = () => {
    // Here you would typically save the profile to your backend
    Alert.alert(
      "Success",
      "Profile updated successfully!",
      [{ text: "OK", onPress: () => router.back() }]
    );
  };

  return (
    <ImageBackground
      source={require('@/assets/assets/backgroundimg.png')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.overlay}>
            {/*Header*/}
            <View style={styles.header}>
                <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color="#254336" />
                </TouchableOpacity>
                <Text style={styles.title}>{`Edit Profile`}</Text>
                <View style={{ width: 24 }} /> 
            </View> 

            {/* Profile Picture Section */}
            <View style={styles.profileImageSection}>
                <Image
                    source={profileImage ? { uri: profileImage } : require('@/assets/images/HomePage/profilepic.jpg')}
                        style={styles.profilePicture}
                        />
                    <TouchableOpacity
                        style={styles.changePhotoButton}
                        onPress={handlePickImage}
                    >
                    <Ionicons name="camera" size={20} color="white" />
                    <Text style={styles.changePhotoText}>Change Photo</Text>
                    </TouchableOpacity>
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
            {/* Personal Information */}
            <View style={styles.formGroup}>
              <Text style={styles.sectionTitle}>Personal Information</Text>
             
              <View style={styles.inputContainer}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  style={styles.input}
                  value={profile.firstName}
                  onChangeText={(value) => handleInputChange('firstName', value)}
                  placeholder="Enter first name"
                />
              </View>


              <View style={styles.inputContainer}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  style={styles.input}
                  value={profile.lastName}
                  onChangeText={(value) => handleInputChange('lastName', value)}
                  placeholder="Enter last name"
                />
              </View>


              <View style={styles.row}>
                <View style={[styles.inputContainer, styles.halfInput]}>
                  <Text style={styles.label}>Age</Text>
                  <TextInput
                    style={styles.input}
                    value={profile.age}
                    onChangeText={(value) => handleInputChange('age', value)}
                    keyboardType="numeric"
                    placeholder="Age"
                  />
                </View>


                <View style={[styles.inputContainer, styles.halfInput]}>
                  <Text style={styles.label}>Gender</Text>
                  <TextInput
                    style={styles.input}
                    value={profile.gender}
                    onChangeText={(value) => handleInputChange('gender', value)}
                    placeholder="Gender"
                  />
                </View>
              </View>
            </View>


            {/* Physical Information */}
            <View style={styles.formGroup}>
              <Text style={styles.sectionTitle}>Physical Information</Text>
             
              <View style={styles.row}>
                <View style={[styles.inputContainer, styles.halfInput]}>
                  <Text style={styles.label}>{`Height (cm)`}</Text>
                  <TextInput
                    style={styles.input}
                    value={profile.height}
                    onChangeText={(value) => handleInputChange('height', value)}
                    keyboardType="numeric"
                    placeholder="Height"
                  />
                </View>


                <View style={[styles.inputContainer, styles.halfInput]}>
                  <Text style={styles.label}>{`Weight (kg)`}</Text>
                  <TextInput
                    style={styles.input}
                    value={profile.weight}
                    onChangeText={(value) => handleInputChange('weight', value)}
                    keyboardType="numeric"
                    placeholder="Weight"
                  />
                </View>
              </View>


              <View style={styles.row}>
                <View style={[styles.inputContainer, styles.halfInput]}>
                  <Text style={styles.label}>Blood Type</Text>
                  <TextInput
                    style={styles.input}
                    value={profile.bloodType}
                    onChangeText={(value) => handleInputChange('bloodType', value)}
                    placeholder="Blood type"
                  />
                </View>


                <View style={[styles.inputContainer, styles.halfInput]}>
                  <Text style={styles.label}>Activity Level</Text>
                  <TextInput
                    style={styles.input}
                    value={profile.activityLevel}
                    onChangeText={(value) => handleInputChange('activityLevel', value)}
                    placeholder="Activity level"
                  />
                </View>
              </View>
            </View>


            {/* Health Goals */}
            <View style={styles.formGroup}>
              <Text style={styles.sectionTitle}>Health Goals</Text>
              {profile.goals.map((goal, index) => (
                <View key={index} style={styles.inputContainer}>
                  <Text style={styles.label}>{`Goal ${index + 1}`}</Text>
                  <TextInput
                    style={styles.input}
                    value={goal}
                    onChangeText={(value) => handleUpdateGoal(index, value)}
                    placeholder={`Enter goal ${index + 1}`}
                  />
                </View>
              ))}
            </View>
          </View>

           {/* Save Button */}
           <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: '100%',
    alignItems: 'center',
    paddingBottom: 40,
  },
  scrollContent: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 50,
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: 'LufgaMedium',
    color: '#254336',
  },
  profileImageSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#254336',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  changePhotoText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'LufgaMedium',
  },
  formSection: {
    width: '90%',
    gap: 20,
  },
  formGroup: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#254336',
    fontFamily: 'LufgaMedium',
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'LufgaMedium',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    fontFamily: 'LufgaMedium',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  saveButton: {
    backgroundColor: '#254336',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'LufgaMedium',
  },
});

export default EditProfileScreen;