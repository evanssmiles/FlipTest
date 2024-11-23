import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TransactionListPage from '../screens/TransactionListPage/TransactionListPage';
import DetailTransactionPage from '../screens/DetailTransactionPage/DetailTransactionPage';
import {StatusBar} from 'react-native';
import {RootStackParamInterface} from './RootStackParamInterface';

const Stack = createStackNavigator<RootStackParamInterface>();

const AppNavigator = () => (
  <NavigationContainer>
    <StatusBar barStyle="dark-content" backgroundColor="white" />
    <Stack.Navigator initialRouteName="TransactionListPage">
      <Stack.Screen
        name="TransactionListPage"
        component={TransactionListPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailTransactionPage"
        component={DetailTransactionPage}
        options={{headerTitle: ''}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
