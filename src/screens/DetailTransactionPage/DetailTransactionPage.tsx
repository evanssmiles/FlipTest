import {View} from 'react-native';
import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamInterface } from '../../navigation/RootStackParamInterface';
import IdTransaction from './Fragments/IdTransaction';
import {Divider} from '../../components';
import DetailDropdown from './Fragments/DetailDropdown';

type DetailTransactionPageProps = {
    route: RouteProp<RootStackParamInterface, 'DetailTransactionPage'>;
  };
  
  const DetailTransactionPage: React.FC<DetailTransactionPageProps> = ({ route }) => {
    const { data } = route.params;
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'white', marginTop: 20}}>
        <IdTransaction id={data.id}  />
        <Divider thickness={0.4} />
        <DetailDropdown 
            account_number={data.account_number}
            created_at={data.created_at} 
            remark={data.remark} 
            beneficiary_name={data.beneficiary_name}
            unique_code={data.unique_code}
            amount={data.amount} 
            sender_bank={data.sender_bank}
            beneficiary_bank={data.beneficiary_bank}
        />
        </View>
      </View>
    );
  };

export default DetailTransactionPage
