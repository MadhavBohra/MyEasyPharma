import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface VitalInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  icon?: React.ReactNode;
  unit: string;
  target: string;
}

const VitalInput: React.FC<VitalInputProps> = ({ label, value, onChangeText, icon, unit, target }) => {
  return (
    <View style={styles.inputContainer}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <View style={styles.inputFieldContainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.inputField}
          value={value}
          onChangeText={onChangeText}
          keyboardType="numeric"
          placeholder={target}
        />
        <Text style={styles.unit}>{unit}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  inputFieldContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  unit: {
    marginTop: 5,
    fontSize: 14,
    color: '#555',
  },
});

export default VitalInput;
