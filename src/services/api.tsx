// src/services/api.ts
import axios from 'axios';

const url = 'https://recruitment-test.flip.id/frontend-test';

export const fetchTransactions = async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
