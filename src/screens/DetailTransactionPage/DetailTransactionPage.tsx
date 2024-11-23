import {Text, View} from 'react-native';
import React, { useEffect } from 'react';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamInterface } from '../../navigation/RootStackParamInterface';

type DetailTransactionPageProps = {
    route: RouteProp<RootStackParamInterface, 'DetailTransactionPage'>;
  };
  
  type TransactionData = {
    account_number: string;
    amount: number;
    beneficiary_bank: string;
    beneficiary_name: string;
    completed_at: string;
    created_at: string;
    fee: number;
    id: string;
    remark: string;
    sender_bank: string;
    status: string;
    unique_code: number;
  };

  const DetailTransactionPage: React.FC<DetailTransactionPageProps> = ({ route }) => {
    const { data } = route.params;
    return (
      <View>
        <Text>DetailTransactionPage</Text>
        <Text>Beneficiary Name: {data.beneficiary_name}</Text>
        <Text>Amount: {data.amount}</Text>
        <Text>Status: {data.status}</Text>
      </View>
    );
  };

export default DetailTransactionPage

// const styles = StyleSheet.create({})
