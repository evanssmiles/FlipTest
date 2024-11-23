import React from 'react';
import {View, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';

interface InfoCardProps {
  title1: string;
  title2?: string; // Made title2 optional
  subtitle1: string;
  subtitle2?: string; // Made subtitle2 optional
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  containerStyle?: ViewStyle;
  singleColumn?: boolean; // New prop to switch to a single column layout
}

const InfoCard: React.FC<InfoCardProps> = ({
  title1,
  title2,
  subtitle1,
  subtitle2,
  titleStyle,
  subtitleStyle,
  containerStyle,
  singleColumn = false, // Default to false, meaning two columns
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {/* Conditionally render one or two columns */}
      {singleColumn ? (
        <View style={styles.column}>
          <Text style={[styles.title, titleStyle]}>{title1}</Text>
          <Text style={[styles.title, subtitleStyle]}>{subtitle1}</Text>
        </View>
      ) : (
        <>
          <View style={styles.column}>
            <Text style={[styles.title, titleStyle]}>{title1}</Text>
            <Text style={[styles.title, subtitleStyle]}>{subtitle1}</Text>
          </View>
          <View style={[styles.column, styles.rightColumn]}>
            <Text style={[styles.title, titleStyle]}>{title2}</Text>
            <Text style={[styles.title, subtitleStyle]}>{subtitle2}</Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  column: {
    flexDirection: 'column',
  },
  rightColumn: {
    marginRight: 40,
  },
  title: {
    fontSize: 16,
  },
});

export default InfoCard;
