import {Text, View} from 'react-native';
import React, { useEffect } from 'react';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamInterface } from '../../navigation/RootStackParamInterface';
import IdTransaction from './Fragments/IdTransaction';

type DetailTransactionPageProps = {
    route: RouteProp<RootStackParamInterface, 'DetailTransactionPage'>;
  };
  
  const DetailTransactionPage: React.FC<DetailTransactionPageProps> = ({ route }) => {
    const { data } = route.params;
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'white', marginTop: 20, marginBottom: 60}}>
        <IdTransaction id={data.id}  />
        <Text>Beneficiary Name: {data.beneficiary_name}</Text>
        <Text>Amount: {data.amount}</Text>
        <Text>Status: {data.status}</Text>
        </View>
      </View>
    );
  };

export default DetailTransactionPage

// const styles = StyleSheet.create({})
