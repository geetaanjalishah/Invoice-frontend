import axios from 'axios';

export const generateInvoice = async (invoiceData) => {
  try {
    console.log('Sending request to backend with data:', invoiceData);
    const response = await axios.post('http://localhost:5000/api/invoices/generate', invoiceData, {
      responseType: 'blob',
    });
    console.log('Received response from backend');
    return response.data;
  } catch (error) {
    console.error('Error in API call:', error);
    throw error;
  }
};
