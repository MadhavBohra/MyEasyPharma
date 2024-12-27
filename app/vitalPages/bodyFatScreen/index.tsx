import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AgeIcon from 'react-native-vector-icons/Ionicons';
import HeightIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MeasurementIcon from 'react-native-vector-icons/FontAwesome5';
import { INITIAL_VITALS_DATA } from '@/constants/vitalData';

const BodyFatCalculator = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male'); // Default gender
  const [height, setHeight] = useState('');
  const [waist, setWaist] = useState('');
  const [neck, setNeck] = useState('');
  const [hip, setHip] = useState(''); // Only needed for women
  const [bodyFat, setBodyFat] = useState<number | null>(null);

  const calculateBodyFat = () => {
    const h = parseFloat(height);
    const w = parseFloat(waist);
    const n = parseFloat(neck);
    const hp = parseFloat(hip);

    if (!age || !height || !waist || !neck || (gender === 'female' && !hip)) {
      Alert.alert('Error', 'Please fill all the required fields.');
      return;
    }

    let bodyFatPercentage: number;

    if (gender === 'male') {
      bodyFatPercentage =
        86.010 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
    } else {
      bodyFatPercentage =
        163.205 * Math.log10(w + hp - n) -
        97.684 * Math.log10(h) -
        78.387;
    }
    INITIAL_VITALS_DATA["Body Composition"][1].unit= `${parseFloat(bodyFatPercentage.toFixed(2))} %`;
    if (bodyFatPercentage < 11) {
      INITIAL_VITALS_DATA["Body Composition"][1].value= 30;
    } 
    
    if (bodyFatPercentage >= 11 && bodyFatPercentage < 22) {
      INITIAL_VITALS_DATA["Body Composition"][1].value= 70;
    } 
    
    if (bodyFatPercentage >= 22) {
      INITIAL_VITALS_DATA["Body Composition"][1].value= 120;
    } 

    setBodyFat(parseFloat(bodyFatPercentage.toFixed(2)));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        <Icon name="calculate" size={30} color="#1A237E" />
        {' '}Body Fat Percentage Calculator
      </Text>

      {/* Age */}
      <View style={styles.inputContainer}>
        <AgeIcon name="person" size={24} color="#546E7A" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Age"
          placeholderTextColor="#B0BEC5"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
      </View>

      {/* Gender */}
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === 'male' && styles.selectedGender,
          ]}
          onPress={() => setGender('male')}
        >
          <Icon 
            name="male" 
            size={24} 
            color={gender === 'male' ? 'white' : '#546E7A'} 
          />
          <Text
            style={[
              styles.genderText,
              gender === 'male' && styles.selectedGenderText,
            ]}
          >
            Male
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === 'female' && styles.selectedGender,
          ]}
          onPress={() => setGender('female')}
        >
          <Icon 
            name="female" 
            size={24} 
            color={gender === 'female' ? 'white' : '#546E7A'} 
          />
          <Text
            style={[
              styles.genderText,
              gender === 'female' && styles.selectedGenderText,
            ]}
          >
            Female
          </Text>
        </TouchableOpacity>
      </View>

      {/* Measurements */}
      <View style={styles.inputContainer}>
        <HeightIcon name="human-male-height" size={24} color="#546E7A" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Height (cm)"
          placeholderTextColor="#B0BEC5"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />
      </View>
      <View style={styles.inputContainer}>
        <MeasurementIcon name="ruler" size={24} color="#546E7A" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Waist (cm)"
          placeholderTextColor="#B0BEC5"
          keyboardType="numeric"
          value={waist}
          onChangeText={setWaist}
        />
      </View>
      <View style={styles.inputContainer}>
        <MeasurementIcon name="ruler" size={24} color="#546E7A" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Neck (cm)"
          placeholderTextColor="#B0BEC5"
          keyboardType="numeric"
          value={neck}
          onChangeText={setNeck}
        />
      </View>
      {gender === 'female' && (
        <View style={styles.inputContainer}>
          <MeasurementIcon name="ruler" size={24} color="#546E7A" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Hip (cm)"
            placeholderTextColor="#B0BEC5"
            keyboardType="numeric"
            value={hip}
            onChangeText={setHip}
          />
        </View>
      )}

      {/* Calculate Button */}
      <TouchableOpacity style={styles.calculateButton} onPress={calculateBodyFat}>
        <Icon name="calculate" size={24} color="white" style={styles.buttonIcon} />
        <Text style={styles.calculateButtonText}>Calculate</Text>
      </TouchableOpacity>

      {/* Result */}
      {bodyFat !== null && (
        <View style={styles.resultContainer}>
          <Icon name="fitness-center" size={24} color="#37474F" style={styles.resultIcon} />
          <Text style={styles.resultText}>Body Fat: {bodyFat}%</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F0F4F8',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1A237E',
    textAlign: 'center',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#37474F',
    borderWidth: 1,
    borderColor: '#CFD8DC',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  genderButton: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 5,
    paddingVertical: 15,
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CFD8DC',
  },
  selectedGender: {
    backgroundColor: '#1E88E5',
    borderColor: '#1565C0',
  },
  genderText: {
    fontSize: 16,
    color: '#546E7A',
    marginLeft: 10,
  },
  selectedGenderText: {
    color: 'white',
  },
  calculateButton: {
    flexDirection: 'row',
    backgroundColor: '#2E7D32',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonIcon: {
    marginRight: 10,
  },
  calculateButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resultIcon: {
    marginRight: 10,
  },
  resultText: {
    fontSize: 18,
    color: '#37474F',
    fontWeight: '700',
  },
});

export default BodyFatCalculator;