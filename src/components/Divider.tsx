import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

interface DividerProps {
  width?: number | string; // Can be a number (e.g., 200) or a percentage string (e.g., "50%")
  color?: string; // Hex, RGB, or named color
  thickness?: number; // Height of the divider
}

const Divider: React.FC<DividerProps> = ({
  width = '100%',
  color = '#ccc',
  thickness = 1,
}) => {
  return (
    <View
      style={[
        styles.divider,
        {
          width,
          backgroundColor: color,
          height: thickness,
        } as ViewStyle, // Explicitly cast the style object to ViewStyle
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    alignSelf: 'center',
  },
});

export default Divider;
