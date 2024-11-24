import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  useWindowDimensions,
} from 'react-native';

interface InfoCardProps {
  title1: string;
  title2?: string;
  subtitle1: string;
  subtitle2?: string;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  containerStyle?: ViewStyle;
  singleColumn?: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title1,
  title2,
  subtitle1,
  subtitle2,
  titleStyle,
  subtitleStyle,
  containerStyle,
  singleColumn = false,
}) => {
  const {width} = useWindowDimensions();

  const marginLeft = width * 0.2;

  return (
    <View style={[styles.container, containerStyle]}>
      {singleColumn ? (
        <View style={styles.column}>
          <Text style={[styles.title, titleStyle]}>{title1}</Text>
          <Text style={[styles.title, subtitleStyle]}>{subtitle1}</Text>
        </View>
      ) : (
        <>
          <View style={[styles.column, styles.leftColumn]}>
            <Text style={[styles.title, titleStyle]}>{title1}</Text>
            <Text style={[styles.title, subtitleStyle]}>{subtitle1}</Text>
          </View>
          <View style={[styles.column, styles.rightColumn, {marginLeft}]}>
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
    justifyContent: 'flex-start',
  },
  leftColumn: {
    flex: 1,
    alignItems: 'flex-start',
  },
  rightColumn: {
    flex: 1,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 16,
  },
});

export default InfoCard;
