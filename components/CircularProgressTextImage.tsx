import React from 'react';
import { Svg, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { View, Text, ImageSourcePropType, Image } from 'react-native';

type CircularProgressBarProps = {
  progress: number;
  size: number;
  color1: string;
  color2: string;
  color3: string; // Third color for smoother transitions
  imageSource: React.ReactNode; // The source of the image to be displayed
  stokeWidth: number;
};

const CircularProgressBarImage = ({ 
  progress, 
  size, 
  color1, 
  color2, 
  color3, 
  imageSource,
  stokeWidth 
}: CircularProgressBarProps) => {
  const radius = size / 2 - 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Calculate gradient stops for smoother transition
  const stop2Position = Math.min(progress, 20); // Midpoint color transitions at 50%
  const stop3Position = Math.min(progress * 2, 40); // Final color transitions faster near the end

  return (
    <View style={{ position: 'relative', width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={color1} />
            <Stop offset="50%" stopColor={color2} />
            <Stop offset="100%" stopColor={color3} />
          </LinearGradient>
        </Defs>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#ccc"
          strokeWidth={stokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={0}
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="url(#gradient)"
          strokeWidth={stokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View
        style={{
          position: 'absolute',
          width: size / 1.15,
          height: size / 1.15,
          borderRadius: size,
          overflow: 'hidden',
          zIndex: -1000,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {imageSource}

      </View>
    </View>
  );
};

export default CircularProgressBarImage;
