import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import CircularProgressBar from '@/components/CircularProgress';
import CircularProgressBarText from '@/components/CircularProgressText';
import CircularProgressBarImage from '@/components/CircularProgressTextImage';

const StepTrackerApp = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Steps Tracker</Text>
      <CircularProgressBarImage
        progress={90} // Progress percentage
        size={300} // Diameter of the circular progress bar
        color1="#833ab4"
        color2="#fd1d1d"
        color3='#fcb045'
        imageSource={<FontAwesome5 name="running" size={120} color="#fff" />}
        stokeWidth={20}
      />
      <View style={styles.header}>
        <FontAwesome5 name="running" size={30} color="#fff" />
        <Text style={styles.headerText}>8255 Steps</Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <CircularProgressBarText
            progress={70}
            size={175}
            color1="#833ab4"
            color2="#fd1d1d"
            color3='#fcb045'
            textnumber="4.5"
            textunit="KM"
            goal={100}
            textcolor='#fff'
            stokeWidth={10}
          ></CircularProgressBarText>
        </View>
        <View style={styles.statItem}>
          <CircularProgressBarText
            progress={50}
            size={175}
            color1="#833ab4"
            color2="#fd1d1d"
            color3='#fcb045'
            textnumber="1000"
            textunit="Kcal"
            goal={100}
                        textcolor='#fff'
            stokeWidth={10}
          ></CircularProgressBarText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b2b2b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#aaa',
    fontSize: 16,
  },
});

export default StepTrackerApp;
