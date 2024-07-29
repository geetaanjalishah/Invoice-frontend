import axios from 'axios';

export const generateInvoice = async (invoiceData) => {
  try {
    console.log('Sending request to backend with data:', invoiceData);
    const response = await axios.post('https://invoice-backend-z1cv.onrender.com', invoiceData, {
      responseType: 'blob',
    });
    console.log('Received response from backend');
    return response.data;
  } catch (error) {
    console.error('Error in API call:', error.message);
    throw error;
  }
};
