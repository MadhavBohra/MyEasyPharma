import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
// import { useVitalContext } from '@/components/context/VitalContext';

interface VitalConfig {
  color: string;
  title: string;
  unit: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
  }[];
}

const StatisticsScreen: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');
  const [selectedVital, setSelectedVital] = useState<
    'steps' | 'calories' | 'water' | 'heart' | 'sleep' | 'exercise'
  >('steps');
  const router = useRouter();

  // Mock data - replace with actual data from your backend
  const mockData = {
    weekly: {
      steps: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [5213, 6500, 7800, 5900, 4500, 8900, 7600],
      },
      calories: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [345, 450, 550, 400, 380, 600, 500],
      },
      water: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [1.5, 2.0, 2.5, 1.8, 2.2, 2.8, 2.4],
      },
      heart: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [110, 95, 105, 100, 115, 90, 100],
      },
      sleep: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [6, 7, 6.5, 8, 7.5, 8.5, 7],
      },
      exercise: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [45, 30, 60, 45, 30, 0, 45],
      },
    },
    monthly: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: {
        steps: [38000, 42000, 45000, 41000],
        calories: [2450, 2800, 2600, 2750],
        water: [14, 16, 15, 17],
        heart: [95, 100, 98, 97],
        sleep: [49, 52, 50, 51],
        exercise: [180, 240, 210, 195],
      },
    },
    yearly: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      data: {
        steps: [150000, 160000, 175000, 168000, 180000, 190000, 185000, 195000, 188000, 192000, 178000, 182000],
        calories: [9800, 10200, 11500, 10800, 11200, 12000, 11500, 12500, 11800, 12200, 11000, 11500],
        water: [62, 58, 65, 60, 63, 68, 70, 72, 67, 65, 61, 64],
        heart: [98, 97, 99, 98, 100, 101, 99, 98, 97, 98, 99, 98],
        sleep: [210, 200, 215, 208, 220, 225, 218, 228, 215, 220, 210, 215],
        exercise: [720, 840, 900, 860, 920, 980, 940, 1000, 920, 960, 880, 900],
      },
    },
  };

  const vitalConfigs: Record<string, VitalConfig> = {
    steps: { color: '#22C55E', title: 'Steps', unit: 'steps' },
    calories: { color: '#F97316', title: 'Calories', unit: 'kcal' },
    water: { color: '#3B82F6', title: 'Water Intake', unit: 'L' },
    heart: { color: '#EF4444', title: 'Heart Rate', unit: 'BPM' },
    sleep: { color: '#8B5CF6', title: 'Sleep', unit: 'hrs' },
    exercise: { color: '#10b981', title: 'Exercise', unit: 'min' },
  };

  const getChartData = (): ChartData => {
    if (selectedPeriod === 'weekly') {
      return {
        labels: mockData.weekly[selectedVital].labels,
        datasets: [{ data: mockData.weekly[selectedVital].data }],
      };
    } else {
      return {
        labels: mockData[selectedPeriod].labels,
        datasets: [{ data: mockData[selectedPeriod].data[selectedVital] }],
      };
    }
  };

  // Navigation Handlers for Footer Buttons
  const navigateToMainScreen = () => router.push('/home');
  const navigateToProfile = () => router.push('/profile');
  const navigateToSettings = () => router.push('/settings');
  const navigateToStatistics = () => router.push('/statistics');

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Statistics</Text>

        {/* Time Period Selector */}
        <View style={styles.periodSelector}>
          {['weekly', 'monthly', 'yearly'].map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.selectedPeriod,
              ]}
              onPress={() => setSelectedPeriod(period as 'weekly' | 'monthly' | 'yearly')}
            >
              <Text
                style={[
                  styles.periodButtonText,
                  selectedPeriod === period && styles.selectedPeriodText,
                ]}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Vital Type Selector */}
        <View style={styles.vitalSelector}>
          {Object.entries(vitalConfigs).map(([vital, config]) => (
            <TouchableOpacity
              key={vital}
              style={[
                styles.vitalButton,
                selectedVital === vital && { backgroundColor: config.color },
              ]}
              onPress={() => setSelectedVital(vital as typeof selectedVital)}
            >
              <Text
                style={[
                  styles.vitalButtonText,
                  selectedVital === vital && styles.selectedVitalText,
                ]}
              >
                {config.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Chart */}
        <View style={styles.chartContainer}>
          <LineChart
            data={getChartData()}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: selectedVital === 'water' ? 1 : 0,
              color: (opacity = 1) => vitalConfigs[selectedVital].color,
              labelColor: (opacity = 1) => '#666666',
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: vitalConfigs[selectedVital].color,
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>

        {/* Summary Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Average</Text>
            <Text
              style={[
                styles.statValue,
                { color: vitalConfigs[selectedVital].color },
              ]}
            >
              {(
                getChartData().datasets[0].data.reduce((a, b) => a + b, 0) /
                getChartData().datasets[0].data.length
              ).toFixed(1)}{' '}
              {vitalConfigs[selectedVital].unit}
            </Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Highest</Text>
            <Text
              style={[
                styles.statValue,
                { color: vitalConfigs[selectedVital].color },
              ]}
            >
              {Math.max(...getChartData().datasets[0].data)}{' '}
              {vitalConfigs[selectedVital].unit}
            </Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Lowest</Text>
            <Text
              style={[
                styles.statValue,
                { color: vitalConfigs[selectedVital].color },
              ]}
            >
              {Math.min(...getChartData().datasets[0].data)}{' '}
              {vitalConfigs[selectedVital].unit}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={navigateToMainScreen}>
          <Ionicons name="home-outline" size={30} color="#8b5cf6" />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToProfile}>
          <Ionicons name="person-outline" size={30} color="#8b5cf6" />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToSettings}>
          <Ionicons name="settings-outline" size={30} color="#8b5cf6" />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToStatistics}>
          <Ionicons name="stats-chart-outline" size={30} color="#8b5cf6" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1f2937',
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  periodButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#e5e7eb',
    borderRadius: 20,
  },
  selectedPeriod: {
    backgroundColor: '#8b5cf6',
  },
  periodButtonText: {
    color: '#374151',
    fontSize: 16,
  },
  selectedPeriodText: {
    color: '#ffffff',
  },
  vitalSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  vitalButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#e5e7eb',
    borderRadius: 20,
    marginBottom: 10,
  },
  vitalButtonText: {
    color: '#374151',
    fontSize: 16,
  },
  selectedVitalText: {
    color: '#ffffff',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  statCard: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
  },
});

export default StatisticsScreen;
