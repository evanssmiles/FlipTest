import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../../styles/Colors';
import {moneyFormat, bankFormat, dateFormat} from '../../../utils';

// Define the type of the data prop passed from FlatList
interface TransactionCardProps {
  beneficiary_name: string;
  sender_bank: string;
  beneficiary_bank: string;
  amount: number;
  created_at: string;
  status: string;
}

// Define the props that the component will receive
interface TransactionCardsProps {
  data: TransactionCardProps;
  onPress: () => void; // Add onPress function prop
}

const TransactionCards: React.FC<TransactionCardsProps> = ({data, onPress}) => {
  const {
    beneficiary_name,
    beneficiary_bank,
    sender_bank,
    amount,
    created_at,
    status,
  } = data;

  // Determine border color based on status
  const borderColor = status === 'PENDING' ? colors.orange : colors.green;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, {borderLeftColor: borderColor}]}>
      <View style={styles.content}>
        <Text style={styles.title}>
          {bankFormat(sender_bank)} → {bankFormat(beneficiary_bank)}
        </Text>
        <Text style={styles.recipientName}>
          {beneficiary_name.toUpperCase()}
        </Text>
        <Text style={styles.amount}>
          Rp{moneyFormat(amount)} • {dateFormat(created_at)}
        </Text>
      </View>
      <View
        style={[
          styles.label,
          status === 'PENDING' ? styles.pendingLabel : styles.successLabel,
        ]}>
        <Text
          style={
            status === 'PENDING' ? styles.pendingLabelText : styles.labelText
          }>
          {status === 'PENDING' ? 'Pengecekan' : 'Berhasil'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderLeftWidth: 8,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  recipientName: {
    fontSize: 14,
    color: 'black',
  },
  amount: {
    fontSize: 14,
    color: 'black',
  },
  label: {
    padding: 10,
    borderRadius: 10,
  },
  pendingLabel: {
    backgroundColor: 'white', // Pending button color
    borderWidth: 2,
    borderColor: colors.orange,
  },
  successLabel: {
    backgroundColor: colors.green, // Success button color
  },
  labelText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  pendingLabelText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default TransactionCards;
