
const VITAL_IMAGES = {
    bloodSugar: require("@/assets/images/icons/high-blood-sugar.png"),
    bloodHemogloin: require("@/assets/images/icons/haemoglobin.png"),
    cholestrol: require("@/assets/images/icons/cholesterol.png"),
    calories: require("@/assets/images/icons/calories-calculator.png"),
    bloodPressure: require("@/assets/images/icons/blood-pressure.png"),
    pulse: require("@/assets/images/icons/pulse.png"),
    ecg: require("@/assets/images/icons/ecg.png"),
    bmi: require("@/assets/images/icons/bmi.png"),
    bodyfat: require("@/assets/images/icons/bodyfat.png"),
    bodyWeight: require("@/assets/images/icons/bodyweight.png"),
    stress: require("@/assets/images/icons/anxiety.png"),
    anxiety: require("@/assets/images/icons/anxiety2.png"),
    happy: require("@/assets/images/icons/happy.png"),
    sedentary: require("@/assets/images/icons/sedentary.png"),
    running: require("@/assets/images/icons/running.png"),
    sleep: require("@/assets/images/icons/sleep.png"),
    temperature: require("@/assets/images/icons/temperature.png"),
  };
  
  type VitalData = {
    title: string;
    unit: string;
    value: number;
    page: string;
    iconPath: number; // React Native image require type
  };
  
  type VitalsCategories = {
    [key: string]: VitalData[];
  };
  
export const INITIAL_VITALS_DATA: VitalsCategories = {
    "Metabolic Health": [
      { title: "Blood Glucose", unit: "90 mg/dL", value: 70, page: "/vitalPages/bloodSugar", iconPath: VITAL_IMAGES.bloodSugar },
      { title: "Haemoglobin", unit: "13.5 g/dL", value: 70, page: "/vitalPages/bloodHaemoglobin", iconPath: VITAL_IMAGES.bloodHemogloin },
      { title: "Cholesterol", unit: "180 mg/dL", value: 20, page: "/vitalPages/cholestrolLevel", iconPath: VITAL_IMAGES.cholestrol },
      { title: "Calories Intake", unit: "2000 kcal", value: 120, page: "/vitalPages/caloriesCounter", iconPath: VITAL_IMAGES.calories },
    ],
    "Cardiovascular Health": [
      { title: "Blood Pressure", unit: "120/80 mm Hg", value: 70, page: "/vitalPages/bloodPressure", iconPath: VITAL_IMAGES.bloodPressure },
      { title: "Pulse", unit: "72 bpm", value: 20, page: "/vitalPages/heartRate", iconPath: VITAL_IMAGES.pulse },
      { title: "ECG", unit: "Normal", value: 70, page: "/vitalPages/ecgStripScreen", iconPath: VITAL_IMAGES.ecg },
    ],
    "Body Composition": [
      { title: "Body Mass Index", unit: "24.5", value: 120, page: "/vitalPages/bmiPage", iconPath: VITAL_IMAGES.bmi },
      { title: "Body Fat Percent", unit: "2%", value: 20, page: "/vitalPages/bodyFatScreen", iconPath: VITAL_IMAGES.bodyfat },
      { title: "Weight", unit: "80 Kgs", value: 70, page: "/vitalPages/bodyWeight", iconPath: VITAL_IMAGES.bodyWeight },
    ],
    "Mental Health": [
      { title: "Stress", unit: "Low", value: 70, page: "/vitalPages/stressLevels", iconPath: VITAL_IMAGES.stress },
      { title: "Anxiety", unit: "Low", value: 70, page: "/vitalPages/anxietyLevelScreen", iconPath: VITAL_IMAGES.anxiety },
      { title: "Moods & Swings", unit: "Stable", value: 70, page: "/vitalPages/moodAndSwingScreen", iconPath: VITAL_IMAGES.happy },
    ],
    "Physical Activity": [
      { title: "Lifestyle", unit: "Active", value: 70, page: "/vitalPages/physicalActivityScreen", iconPath: VITAL_IMAGES.sedentary },
      { title: "Exercise", unit: "30 mins", value: 70, page: "/vitalPages/exerciseScreen", iconPath: VITAL_IMAGES.running },
    ],
    "Other Metrics": [
      { title: "Sleep", unit: "7 hours", value: 70, page: "/vitalPages/sleepPatternScreen", iconPath: VITAL_IMAGES.sleep },
      { title: "Temperature", unit: "102.6°F", value: 120, page: "/vitalPages/temperaturePage", iconPath: VITAL_IMAGES.temperature },
    ],
  };
  