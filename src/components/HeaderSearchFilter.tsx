import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import colors from '../styles/Colors';

interface HeaderSearchFilterProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onPress?: () => void;
  title: string;
}

const HeaderSearchFilter: React.FC<HeaderSearchFilterProps> = ({
  value,
  onChangeText,
  placeholder = '', // Default placeholder
  onPress,
  title = 'URUTKAN',
}) => {
  return (
    <View style={styles.container}>
      <Icon name="search" size={20} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
        <Icon
          name="chevron-down"
          size={20}
          color="orange"
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderSearchFilter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    marginVertical: 10,
  },
  icon: {
    marginLeft: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
  },
  button: {
    flexDirection: 'row',
    padding: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: colors.orange,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
