import React from 'react';
import { Svg, Circle } from 'react-native-svg';
import { View, Image, ImageSourcePropType } from 'react-native';

// Define the type for props
type CircularProgressBarProps = {
  progress: number; // Progress percentage (0-100)
  size: number;     // Diameter of the progress circle
  color1: string;   // Color of the background circle
  imageSource: ImageSourcePropType; // The source of the image to be displayed
};

const getColorByProgress = (progress: number): string => {
  if (progress <= 25) return '#2196F3'; // Blue
  if (progress <= 50) return '#4CAF50'; // Green
  if (progress <= 75) return '#FFC107'; // Yellow
  return '#F44336'; // Red
};

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ progress, size, color1, imageSource }) => {
  const radius = size / 2 - 20; // Adjust for stroke width
  const circumference = 2 * Math.PI * radius; // Total circumference of the circle
  const strokeDashoffset = 
    circumference - (progress / 100) * circumference; // Calculate offset for progress

  const progressColor = getColorByProgress(progress);

  // Calculate the position of the bob (small circle) at the end of the progress path
  const angle = (2 * Math.PI * (progress / 100)) - Math.PI / 2; // Endpoint angle
  const bobX = size / 2 + radius * Math.cos(angle + Math.PI); // X position
  const bobY = size / 2 + radius * Math.sin(angle + Math.PI); // Y position

  return (
    <View
      style={{
        position: 'relative',
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color1}
          strokeWidth={20}
          strokeDasharray={circumference}
          strokeDashoffset={0}
        />
        {/* Progress Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={progressColor}
          strokeWidth={20}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(90 ${size / 2} ${size / 2})`} // Rotate from the bottom
        />
        {/* Bob (Small Circle) at the End */}
        {progress > 0 && (
          <Circle
            cx={bobX}
            cy={bobY}
            r={15} // Size of the bob
            fill={progressColor}
          />
        )}
      </Svg>
      {/* Circular Image in the center */}
      <View
        style={{
          position: 'absolute',
          width: size / 1.15, // Adjust the size of the image
          height: size / 1.15, // Adjust the size of the image
          borderRadius: size, // Make it circular
          overflow: 'hidden',
          borderWidth: 0, // Optional: Border around the image
          borderColor: progressColor, // Border color matches the progress
          zIndex: -1000
        }}
      >
        <Image
          source={imageSource} // No require() here, directly use the prop as source
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover', // Ensure the image covers the circular area
          }}
        />
      </View>
    </View>
  );
};

export default CircularProgressBar;
