// import React from 'react';
// import { useRouter } from "expo-router";
// import { View, Text } from 'react-native-web';
// import { MaterialCommunityIcons } from '@expo/vector-icons'; // Icon library for React Native Web

// const HeartRate = () => {
//   const router = useRouter();

//   const handleClick = () => {
//     router.push('/heartRateEntry'); // Navigate to the heartbeat entry page
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.iconContainer}>
//         <MaterialCommunityIcons name="heart" size={24} color="#ef4444" />
//       </View>
//       <View>
//         <Text style={styles.heartRateText}>
//           --<Text style={styles.bpmText}> bpm</Text>
//         </Text>
//         <Text style={styles.subText}>You have normal BPM</Text>
//       </View>
//     </View>
//   );
// };

// const styles = {
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f3f4f6',
//     padding: 10,
//     marginBottom: 10,
//     width: '50%',
//     borderRadius: 20,
//     margin: 10,
//     cursor: 'pointer', // Change to indicate it's clickable
//   },
//   iconContainer: {
//     marginRight: 10,
//   },
//   heartRateText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   bpmText: {
//     fontSize: 14,
//     color: '#6b7280',
//     marginLeft: 4,
//   },
//   subText: {
//     fontSize: 12,
//     color: '#6b7280',
//   },
// };

// export default HeartRate;
