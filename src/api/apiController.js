import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const IP = '26.62.31.221:3000';

export const loginRequest = async (username, password) => {
  try {
    const response = await axios.post(
      `http://${IP}/api/auth/signin`,
      {
        username: username,
        password: password,
      },
      {
        timeout: 5000,
      },
    );
    return {status: response.status, data: response.data};
  } catch (error) {
    if (error.response) {
      // Server responded with a status code outside of the 2xx range
      console.error('Server error:', error.response.status);
    } else if (error.request) {
      // Request was made but no response received (server might be down or unreachable)
      console.error(
        'No response received, server may be down or unreachable:',
        error.request,
      );
    } else {
      // Other errors (e.g., issue setting up the request)
      console.error('Error:', error.message);
    }
    throw error;
  }
};

export const registerRequest = async (email, username, password) => {
  try {
    const response = await axios.post(
      `http://${IP}/api/auth/signup`,
      {
        email: email,
        name: username,
        password: password,
      },
      {
        timeout: 5000,
      },
    );
    return {status: response.status, data: response.data};
  } catch (error) {
    if (error.response) {
      // Server responded with a status code outside of the 2xx range
      console.error('Server error:', error.response.status);
    } else if (error.request) {
      // Request was made but no response received (server might be down or unreachable)
      console.error(
        'No response received, server may be down or unreachable:',
        error.request,
      );
    } else {
      // Other errors (e.g., issue setting up the request)
      console.error('Error:', error.message);
    }
    throw error;
  }
};

export const RefreshRequest = async refreshToken => {
  try {
    const response = await axios.post(
      `http://${IP}/api/auth/refresh`,
      {
        refreshToken: refreshToken,
      },
      {
        timeout: 5000,
      },
    );
    return {status: response.status, data: response.data};
  } catch (error) {
    if (error.response) {
      // Server responded with a status code outside of the 2xx range
      console.error('Server error:', error.response.status);
    } else if (error.request) {
      // Request was made but no response received (server might be down or unreachable)
      console.error(
        'No response received, server may be down or unreachable:',
        error.request,
      );
    } else {
      // Other errors (e.g., issue setting up the request)
      console.error('Error:', error.message);
    }
    throw error;
  }
};
