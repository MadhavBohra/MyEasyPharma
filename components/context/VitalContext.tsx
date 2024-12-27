import React, { createContext, useState, useContext } from 'react';

interface VitalContextProps {
  waterIntake: string;
  heartRate: string;
  calories: string;
  sleepHours: string;
  sleepMinutes: string;
  exerciseMinutes: string;
  steps: string;
  updateVital: (name: string, value: string) => void;
}

const VitalContext = createContext<VitalContextProps | undefined>(undefined);

export const VitalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [waterIntake, setWaterIntake] = useState('0');
  const [heartRate, setHeartRate] = useState('0');
  const [calories, setCalories] = useState('0');
  const [sleepHours, setSleepHours] = useState('0');
  const [sleepMinutes, setSleepMinutes] = useState('0');
  const [exerciseMinutes, setExerciseMinutes] = useState('0');
  const [steps, setSteps] = useState('0');

  const updateVital = (name: string, value: string) => {
    switch (name) {
      case 'waterIntake':
        setWaterIntake(value);
        break;
      case 'heartRate':
        setHeartRate(value);
        break;
      case 'calories':
        setCalories(value);
        break;
      case 'sleepHours':
        setSleepHours(value);
        break;
      case 'sleepMinutes':
        setSleepMinutes(value);
        break;
      case 'exerciseMinutes':
        setExerciseMinutes(value);
        break;
      case 'steps':
        setSteps(value);
        break;
      default:
        break;
    }
  };

  return (
    <VitalContext.Provider
      value={{
        waterIntake,
        heartRate,
        calories,
        sleepHours,
        sleepMinutes,
        exerciseMinutes,
        steps,
        updateVital,
      }}
    >
      {children}
    </VitalContext.Provider>
  );
};

export const useVitalContext = () => {
  const context = useContext(VitalContext);
  if (!context) {
    throw new Error('useVitalContext must be used within a VitalProvider');
  }
  return context;
};
