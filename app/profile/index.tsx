import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProfileData {
  firstName: string;
  lastName: string;
  dob: number;
  gender: string;
  height: string;
  weight: string;
  bloodGroup: string;
  heartRate: string;
  activityLevel: string;
  memberSince: string;
  goals: string[];
}

interface ProfileCardProps {
  icon: string;
  title: string;
  value: string;
  color: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ icon, title, value, color }) => (
  <View style={[styles.profileCard, { borderLeftColor: color }]}>
    <Ionicons name={icon as any} size={24} color={color} />
    <View style={styles.profileCardContent}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  </View>
)

const ProfileScreen: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        const response = await fetch(`http://34.131.172.157/user-profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  // Replace with your actual token
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        
        const data: ProfileData = await response.json();
        setProfileData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);


  const navigateToMainScreen = () => router.push('/home');
  const navigateToProfile = () => router.push('/profile');
  const navigateToSettings = () => router.push('/settings');
  const navigateToStatistics = () => router.push('/statistics');
  const handleEditProfile = () => router.push('/editProfile');

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#254336" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('@/assets/assets/backgroundimg.png')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.overlay}>
          <Text style={styles.title}>Profile</Text>

          <View style={styles.profileHeader}>
            <Image
              source={require('@/assets/images/HomePage/profilepic.jpg')}
              style={styles.profilePicture}
            />
            <View style={styles.headerTextContainer}>
              <Text style={styles.userName}>{profileData?.firstName} {[profileData?.lastName]}</Text>
              <Text style={styles.userDetails}>
                Age: 21 • {profileData?.gender || 'Male'}
              </Text>
              <TouchableOpacity 
                style={styles.editButton} 
                onPress={handleEditProfile}
              >
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.cardsContainer}>
            <ProfileCard
              icon="body-outline"
              title="Height"
              value={`${profileData?.height || ''} cm`}
              color="#22C55E"
            />
            <ProfileCard
              icon="scale-outline"
              title="Weight"
              value={`${profileData?.weight || ''} kg`}
              color="#F97316"
            />
            <ProfileCard
              icon="water-outline"
              title="Blood Type"
              value={profileData?.bloodGroup || ''}
              color="#B22222"
            />
            <ProfileCard
              icon="heart-outline"
              title="Heart Rate"
              value={`${profileData?.heartRate || '90'} BPM`}
              color="#EF4444"
            />
            <ProfileCard
              icon="fitness-outline"
              title="Activity Level"
              value={profileData?.activityLevel || 'moderate'}
              color="#8B5CF6"
            />
            <ProfileCard
              icon="calendar-outline"
              title="Member Since"
              value={profileData?.memberSince || ''}
              color="#10b981"
            />
          </View>

          <View style={styles.goalsSection}>
            <Text style={styles.sectionTitle}>Health Goals</Text>
            <View style={styles.goalsList}>
              {/* {profileData?.goals.map((goal, index) => (
                <Text key={index} style={styles.goalItem}>
                  • {goal}
                </Text>
              ))} */}
                  <Text style={styles.goalItem}>
                  • goal 1
                </Text>
                <Text style={styles.goalItem}>
                  • goal 2
                </Text>
                <Text style={styles.goalItem}>
                  • goal 3
                </Text>
                <Text style={styles.goalItem}>
                  • goal 4
                </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={navigateToMainScreen}>
          <Ionicons name="home" size={24} color="white" />
          <Text style={styles.footerText}>Main</Text>
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
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: '100%',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 80,
  },
  scrollContent: {
    width: '100%',
  },
  title: {
    marginTop: 50,
    marginBottom: 20,
    fontSize: 30,
    fontFamily: 'LufgaMedium',
    alignSelf: 'center',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: '90%',
    borderRadius: 20,
    padding: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  headerTextContainer: {
    marginLeft: 20,
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Lufga',
    color: '#254336',
    marginBottom: 4,
  },
  userDetails: {
    fontSize: 16,
    color: '#254336',
    fontFamily: 'LufgaMedium',
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#254336',
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'LufgaMedium',
  },
  cardsContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 4,
  },
  profileCardContent: {
    marginLeft: 15,
  },
  cardTitle: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'LufgaMedium',
  },
  cardValue: {
    fontSize: 18,
    color: '#254336',
    fontFamily: 'LufgaMedium',
  },
  goalsSection: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    color: '#254336',
    fontFamily: 'LufgaMedium',
    marginBottom: 15,
  },
  goalsList: {
    gap: 10,
  },
  goalItem: {
    fontSize: 16,
    color: '#254336',
    fontFamily: 'Lufga',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
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
  },loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});

export default ProfileScreen;