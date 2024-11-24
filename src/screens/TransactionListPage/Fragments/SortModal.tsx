import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../../../styles/Colors';

type SortModalProps = {
  visible: boolean;
  onClose: () => void;
  onSort: (option: 'none' | 'asc' | 'desc' | 'dateAsc' | 'dateDesc') => void;
  selectedOption: 'none' | 'asc' | 'desc' | 'dateAsc' | 'dateDesc';
};

const SortModal: React.FC<SortModalProps> = ({
  visible,
  onClose,
  onSort,
  selectedOption,
}) => {
  const handleSortOptionPress = (
    option: 'none' | 'asc' | 'desc' | 'dateAsc' | 'dateDesc',
  ) => {
    onSort(option); // Trigger the sorting function
    onClose(); // Close the modal after sorting
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {/* Sort options with radio buttons */}
          <TouchableOpacity
            style={styles.sortOption}
            onPress={() => handleSortOptionPress('none')}>
            <View style={styles.radioButton}>
              {selectedOption === 'none' && (
                <View style={styles.selectedRadio} />
              )}
            </View>
            <Text style={styles.optionText}>URUTKAN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sortOption}
            onPress={() => handleSortOptionPress('asc')}>
            <View style={styles.radioButton}>
              {selectedOption === 'asc' && (
                <View style={styles.selectedRadio} />
              )}
            </View>
            <Text style={styles.optionText}>Nama A-Z</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sortOption}
            onPress={() => handleSortOptionPress('desc')}>
            <View style={styles.radioButton}>
              {selectedOption === 'desc' && (
                <View style={styles.selectedRadio} />
              )}
            </View>
            <Text style={styles.optionText}>Nama Z-A</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sortOption}
            onPress={() => handleSortOptionPress('dateDesc')}>
            <View style={styles.radioButton}>
              {selectedOption === 'dateDesc' && (
                <View style={styles.selectedRadio} />
              )}
            </View>
            <Text style={styles.optionText}>Tanggal Terbaru</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sortOption}
            onPress={() => handleSortOptionPress('dateAsc')}>
            <View style={styles.radioButton}>
              {selectedOption === 'dateAsc' && (
                <View style={styles.selectedRadio} />
              )}
            </View>
            <Text style={styles.optionText}>Tanggal Terlama</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background overlay
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  sortOption: {
    flexDirection: 'row', // Align radio button and text horizontally
    alignItems: 'center',
    paddingVertical: 10, // Adjust padding without a divider
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.orange,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadio: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.orange, // orange color for selected radio button
  },
  optionText: {
    fontSize: 16,
    color: 'black',
  },
});

export default SortModal;
