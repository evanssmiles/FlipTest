import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import TransactionCards from './Fragments/TransactionCards';
import {fetchTransactions} from '../../services/api';
import {useNavigation} from '@react-navigation/native';
import {
  RootStackParamInterface,
  TransactionData,
} from '../../navigation/RootStackParamInterface';
import {StackNavigationProp} from '@react-navigation/stack';
import {HeaderSearchFilter} from '../../components';
import {useDebounce} from '../../hooks/useDebounce'; // Import the reusable debounce hook
import SortModal from './Fragments/SortModal';
import {getSortOptionLabel} from '../../utils';

// Type the navigation prop for the specific screen
type DetailTransactionPageScreenNavigationProp = StackNavigationProp<
  RootStackParamInterface,
  'DetailTransactionPage' // Specify the target screen
>;

const TransactionListPage = () => {
  const navigation = useNavigation<DetailTransactionPageScreenNavigationProp>();
  const [data, setData] = useState<TransactionData[]>([]);
  const [filteredData, setFilteredData] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // State to control the modal visibility
  const [selectedSortOption, setSelectedSortOption] = useState<
    'none' | 'asc' | 'desc' | 'dateAsc' | 'dateDesc'
  >('none'); // Track the selected sort option

  const handleSearch = useCallback(
    (text: string) => {
      const lowercasedText = text.toLowerCase();
      const filtered = data.filter(
        ({beneficiary_bank, sender_bank, beneficiary_name, amount}) =>
          beneficiary_bank.toLowerCase().includes(lowercasedText) ||
          sender_bank.toLowerCase().includes(lowercasedText) ||
          beneficiary_name.toLowerCase().includes(lowercasedText) ||
          amount.toString().includes(lowercasedText), // Convert amount to string temporarily
      );
      setFilteredData(filtered); // The original amount remains a number
    },
    [data],
  );

  // Debounced search handler
  const debouncedSearch = useDebounce(handleSearch, 300);

  const handleSearchTermChange = (text: string) => {
    setQuery(text);
    debouncedSearch(text);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const transactions = await fetchTransactions();
      setData(Object.values(transactions)); // Set the fetched data
      setFilteredData(Object.values(transactions)); // Initialize filtered data
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

  // Navigate to detail transaction once any of the cards is pressed
  const onPressCard = (item: TransactionData) => {
    navigation.navigate('DetailTransactionPage', {data: item});
  };

  const sortData = (
    option: 'none' | 'asc' | 'desc' | 'dateAsc' | 'dateDesc',
  ) => {
    let sortedData = [...filteredData];

    // Update the selected sort option when a user selects one
    setSelectedSortOption(option);

    switch (option) {
      case 'asc':
        sortedData = sortedData.sort((a, b) =>
          a.beneficiary_name.localeCompare(b.beneficiary_name),
        );
        break;
      case 'desc':
        sortedData = sortedData.sort((a, b) =>
          b.beneficiary_name.localeCompare(a.beneficiary_name),
        );
        break;
      case 'dateAsc':
        sortedData = sortedData.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        );
        break;
      case 'dateDesc':
        sortedData = sortedData.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
        break;
      default:
        break;
    }

    setFilteredData(sortedData);
    setModalVisible(false); // Close modal after sorting
  };

  // This is the data that we will be using for our flatlist
  const sortedData = useMemo(() => {
    let sorted = [...filteredData];
    switch (selectedSortOption) {
      case 'asc':
        sorted = sorted.sort((a, b) =>
          a.beneficiary_name.localeCompare(b.beneficiary_name),
        );
        break;
      case 'desc':
        sorted = sorted.sort((a, b) =>
          b.beneficiary_name.localeCompare(a.beneficiary_name),
        );
        break;
      case 'dateAsc':
        sorted = sorted.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        );
        break;
      case 'dateDesc':
        sorted = sorted.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
        break;
      default:
        break;
    }
    return sorted;
  }, [filteredData, selectedSortOption]);

  // Toggle the sort modal
  const onPressSort = () => {
    setModalVisible(true);
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
      <HeaderSearchFilter
        value={query}
        onChangeText={handleSearchTermChange}
        placeholder="Cari nama, bank, atau nominal"
        onPress={onPressSort}
        title={getSortOptionLabel(selectedSortOption)}
      />

      {/* Sort Modal */}

      {modalVisible && (
        <SortModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSort={sortData}
          selectedOption={selectedSortOption}
        />
      )}

      <FlatList
        data={sortedData} // Use the filtered data for display
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id} // Using the key (transaction ID)
        renderItem={({item}) => (
          <TransactionCards data={item} onPress={() => onPressCard(item)} />
        )}
        contentContainerStyle={styles.contentStyle}
        refreshing={refreshing}
        onRefresh={onRefresh}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
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
    paddingBottom: 100,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  sortOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
