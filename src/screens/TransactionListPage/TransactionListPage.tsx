import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import TransactionCards from './Fragments/TransactionCards';
import {fetchTransactions} from '../../services/api';
import {useNavigation} from '@react-navigation/native';
import {
  RootStackParamInterface,
  TransactionData,
} from '../../navigation/RootStackParamInterface';
import {StackNavigationProp} from '@react-navigation/stack';

// Type the navigation prop for the specific screen
type DetailTransactionPageScreenNavigationProp = StackNavigationProp<
  RootStackParamInterface,
  'DetailTransactionPage' // Specify the target screen
>;

const TransactionListPage = () => {
  const navigation = useNavigation<DetailTransactionPageScreenNavigationProp>();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const transactions = await fetchTransactions();
      setData(transactions); // Set the fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle pull-to-refresh action
  const onRefresh = async () => {
    if (refreshing || loading) {
      return;
    } // Prevent refresh if already loading

    setRefreshing(true); // Set refreshing to true to show the loading indicator

    try {
      await loadData(); // Re-fetch the data
    } catch (error) {
      console.error('Error during refresh:', error); // Error handling during refresh
    } finally {
      setRefreshing(false); // Set refreshing to false after refresh is completed
    }
  };

  const onPress = (item: TransactionData) => {
    navigation.navigate('DetailTransactionPage', {data: item});
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text>TransactionListPage</Text>
      <FlatList
        data={Object.values(data)}
        keyExtractor={item => (item as {id: string}).id} // Using the key (transaction ID)
        renderItem={({item}) => (
          <TransactionCards data={item} onPress={() => onPress(item)} />
        )}
        contentContainerStyle={styles.contentStyle}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
};

export default TransactionListPage;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentStyle: {
    paddingBottom: 50,
  },
});
