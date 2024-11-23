import React from 'react';
import {StatusBar, View} from 'react-native';
import TransactionListPage from './src/screens/TransactionListPage/TransactionListPage';

const App: React.FC = () => {
  return (
    <View>
      {/* Customize the status bar */}
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <TransactionListPage />
    </View>
  );
};

export default App;
