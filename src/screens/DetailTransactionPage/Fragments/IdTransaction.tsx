import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Clipboard from '@react-native-clipboard/clipboard';

type IdTransactionProps = {
  id: string;
};

const IdTransaction: React.FC<IdTransactionProps> = ({id}) => {
  const copyToClipboard = () => {
    Clipboard.setString(id);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.textIdStyle}>ID TRANSAKSI:#{id}</Text>
      <TouchableOpacity>
        <Icon
          style={{
            transform: [{scaleX: -1}],
          }}
          name="content-copy"
          size={20}
          color="orange"
          onPress={copyToClipboard}
        />
      </TouchableOpacity>
    </View>
  );
};

export default IdTransaction;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flexDirection: 'row',
    marginVertical: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textIdStyle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 5,
  },
});
