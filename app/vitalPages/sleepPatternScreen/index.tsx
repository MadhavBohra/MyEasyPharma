import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { INITIAL_VITALS_DATA } from '@/constants/vitalData';

const SleepPatternScreen: React.FC = () => {
  const [mode, setMode] = useState<'watch' | 'manual'>('manual');
  const [totalSleepHours, setTotalSleepHours] = useState('');
  const [sleepData, setSleepData] = useState({
    deepSleep: '',
    remSleep: '',
    lightSleep: '',
    awakeTime: '',
  });

  const handleSleepInput = (type: keyof typeof sleepData, value: string) => {
    setSleepData({ ...sleepData, [type]: value });
        INITIAL_VITALS_DATA["Other Metrics"][0].unit= `${totalSleepHours} hours`;
  };

  const calculateManualInput = () => {
    const { deepSleep, remSleep, lightSleep, awakeTime } = sleepData;

    const totalInput =
      parseFloat(deepSleep) +
      parseFloat(remSleep) +
      parseFloat(lightSleep) +
      parseFloat(awakeTime);

    if (!totalSleepHours || totalInput > parseFloat(totalSleepHours)) {
      Alert.alert(
        'Invalid Input',
        'Ensure all breakdowns are entered correctly and total does not exceed total sleep duration.'
      );
      return;
    }

    Alert.alert(
      'Sleep Pattern Submitted',
      `Deep Sleep: ${deepSleep} hrs\nREM Sleep: ${remSleep} hrs\nLight Sleep: ${lightSleep} hrs\nAwake Time: ${awakeTime} hrs`
    );
  };

  const fetchFromWatch = () => {
    setTotalSleepHours('8');
    setSleepData({
      deepSleep: '2',
      remSleep: '2',
      lightSleep: '3',
      awakeTime: '1',
    });
    Alert.alert('Data Fetched', 'Sleep pattern has been fetched from your watch!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sleep Pattern Tracker</Text>

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, mode === 'watch' && styles.selectedButton]}
          onPress={() => setMode('watch')}
        >
          <Image
            source={require('../../../assets/images/icons/smartwatch.png')}
            style={styles.toggleIcon}
          />
          <Text style={[styles.toggleText, mode === 'watch' && styles.selectedText]}>
            Fetch from Watch
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleButton, mode === 'manual' && styles.selectedButton]}
          onPress={() => setMode('manual')}
        >
          <Image
            source={require('../../../assets/images/icons/edit.png')}
            style={styles.toggleIcon}
          />
          <Text style={[styles.toggleText, mode === 'manual' && styles.selectedText]}>
            Enter Manually
          </Text>
        </TouchableOpacity>
      </View>

      {mode === 'watch' ? (
        <View style={styles.modeContainer}>
          <Image
            source={require('../../../assets/images/icons/synchronize.png')}
            style={styles.largeIcon}
          />
          <Text style={styles.infoText}>
            Connect your smartwatch to fetch detailed sleep data.
          </Text>
          <TouchableOpacity style={styles.actionButton} onPress={fetchFromWatch}>
            <Text style={styles.actionButtonText}>Sync Watch</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.modeContainer}>
          <View style={styles.inputContainer}>
            <Image
              source={require('../../../assets/images/icons/sleep.png')}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Total Sleep Hours (e.g., 8)"
              placeholderTextColor="#B0BEC5"
              keyboardType="numeric"
              value={totalSleepHours}
              onChangeText={(text) => setTotalSleepHours(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              source={require('../../../assets/images/icons/moon.png')}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Deep Sleep (hours)"
              placeholderTextColor="#B0BEC5"
              keyboardType="numeric"
              value={sleepData.deepSleep}
              onChangeText={(text) => handleSleepInput('deepSleep', text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              source={require('../../../assets/images/icons/dream.png')}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="REM Sleep (hours)"
              placeholderTextColor="#B0BEC5"
              keyboardType="numeric"
              value={sleepData.remSleep}
              onChangeText={(text) => handleSleepInput('remSleep', text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              source={require('../../../assets/images/icons/light.png')}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Light Sleep (hours)"
              placeholderTextColor="#B0BEC5"
              keyboardType="numeric"
              value={sleepData.lightSleep}
              onChangeText={(text) => handleSleepInput('lightSleep', text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              source={require('../../../assets/images/icons/awake.png')}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Awake Time (hours)"
              placeholderTextColor="#B0BEC5"
              keyboardType="numeric"
              value={sleepData.awakeTime}
              onChangeText={(text) => handleSleepInput('awakeTime', text)}
            />
          </View>
          <TouchableOpacity style={styles.actionButton} onPress={calculateManualInput}>
            <Text style={styles.actionButtonText}>Submit Sleep Data</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin:20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1A237E',
    marginBottom: 30,
    letterSpacing: 0.5,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 35,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: 'white',
    marginHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CFD8DC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  selectedButton: {
    borderColor: '#2E7D32',
    backgroundColor: '#E8F5E9',
  },
  toggleText: {
    fontSize: 16,
    color: '#546E7A',
  },
  selectedText: {
    color: '#2E7D32',
    fontWeight: '600',
  },
  modeContainer: {
    width: '100%',
    alignItems: 'center',
  },
  largeIcon: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#607D8B',
    textAlign: 'center',
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 55,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#37474F',
    borderWidth: 1,
    borderColor: '#CFD8DC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButton: {
    width: '100%',
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Ensures vertical alignment
    justifyContent: 'center', // Centers items horizontally
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10, // Optional: Adds padding inside the container
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#CFD8DC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },  
  inputIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
});

export default SleepPatternScreen;