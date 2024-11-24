import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {InfoCard, Divider} from '../../../components';
import colors from '../../../styles/Colors';
import {moneyFormat, bankFormat, dateFormat} from '../../../utils';

interface DetailDropdownProps {
  beneficiary_name: string;
  amount: number;
  remark: string;
  unique_code: number;
  created_at: string;
  account_number: string;
  sender_bank: string;
  beneficiary_bank: string;
}

const DetailDropdown: React.FC<DetailDropdownProps> = ({
  beneficiary_name,
  amount,
  remark,
  unique_code,
  created_at,
  account_number,
  sender_bank,
  beneficiary_bank,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownText = dropdown ? 'Tutup' : 'Buka';

  const onPressDropdown = () => {
    setDropdown(prevDropdown => !prevDropdown);
  };

  const renderDropdown = () => {
    if (dropdown) {
      return (
        <View style={styles.dropdownContainer}>
          <Text style={styles.titleBank}>
            {bankFormat(sender_bank)} → {bankFormat(beneficiary_bank)}
          </Text>
          <InfoCard
            title1={beneficiary_name}
            subtitle1={account_number}
            title2="NOMINAL"
            subtitle2={`Rp${moneyFormat(amount)}`}
            titleStyle={styles.title}
            subtitleStyle={styles.subtitle}
          />
          <InfoCard
            title1="BERITA TRANSFER"
            subtitle1={remark}
            title2="KODE UNIK"
            subtitle2={unique_code.toString()}
            titleStyle={styles.title}
            subtitleStyle={styles.subtitle}
          />
          <InfoCard
            title1="WAKTU DIBUAT"
            subtitle1={dateFormat(created_at)}
            titleStyle={styles.title}
            subtitleStyle={styles.subtitle}
            singleColumn={true}
          />
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.topContainer}>
      <View style={styles.container}>
        <Text style={styles.textTitle}>DETAIL TRANSAKSI</Text>
        <TouchableOpacity onPress={onPressDropdown}>
          <Text style={styles.textButton}>{dropdownText}</Text>
        </TouchableOpacity>
      </View>
      <Divider thickness={1.2} />
      {renderDropdown()}
    </View>
  );
};

export default DetailDropdown;

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
  },
  dropdownContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  container: {
    marginHorizontal: 20,
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-between',
  },
  textTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 5,
  },
  textButton: {
    color: colors.orange,
    fontSize: 16,
  },
  titleBank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    fontSize: 16,
    color: 'black',
  },
});
