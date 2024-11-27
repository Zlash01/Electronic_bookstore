import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthStore} from '../store/Store.js';
import axios from 'axios';
import {Alert} from 'react-native';

const IP = '26.62.31.221:3000';

const getAccessToken = async () => {
  const {accessToken} = useAuthStore.getState();
  console.log('Access token:', accessToken);
  if (!accessToken) {
    const {logout} = useAuthStore.getState();
    console.error('Access token is null');
    Alert.alert(
      'Invalid session, please log in again, error msg: Access token is null',
    );
    AsyncStorage.removeItem('refreshToken');
    logout();
    return;
  }
  return accessToken;
};

export const loginRequest = async (username, password) => {
  try {
    const response = await axios.post(
      `http://${IP}/api/auth/signin`,
      {
        username: username,
        password: password,
      },
      {
        timeout: 10000,
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

export const refreshRequest = async refreshToken => {
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

export const getTrendingBooks = async (page, limit) => {
  const accessToken = await getAccessToken();
  try {
    const response = await axios.get(
      `http://${IP}/api/book/getAllTrendingBooks?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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

export const createBook = async (title, description, coverImageLink) => {
  const accessToken = await getAccessToken();
  try {
    const response = await axios.post(
      `http://${IP}/api/book/createBook`,
      {
        title: title,
        plot: description,
        coverImage: coverImageLink,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: 5000,
      },
    );
    return {status: response.status, data: response.data};
  } catch (error) {
    if (error.response) {
      // Server responded with a status code outside of the 2xx range
      console.error('Server error:', error.response.status);
      console.log('Error:', error.response.data);
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

export const createChapter = async bookId => {
  const accessToken = await getAccessToken();
  try {
    const response = await axios.post(
      `http://${IP}/api/chapter/createChapter/${bookId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: 5000,
      },
    );
    return {status: response.status, data: response.data};
  } catch (error) {
    if (error.response) {
      // Server responded with a status code outside of the 2xx range
      console.error('Server error:', error.response.status);
      console.log('Error:', error.response.data);
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

export const updateChapter = async (chapterId, title, content) => {
  const accessToken = await getAccessToken();
  try {
    const response = await axios.put(
      `http://${IP}/api/chapter/updateChapter/${chapterId}`,
      {
        title: title,
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: 5000,
      },
    );
    return {status: response.status, data: response.data};
  } catch (error) {
    if (error.response) {
      // Server responded with a status code outside of the 2xx range
      console.error('Server error:', error.response.status);
      console.log('Error:', error.response.data);
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

export const getAllUserBooks = async () => {
  const accessToken = await getAccessToken();
  try {
    const response = await axios.get(`http://${IP}/api/book/getAllUserBooks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      timeout: 5000,
    });
    return {status: response.status, data: response.data};
  } catch (error) {
    if (error.response) {
      // Server responded with a status code outside of the 2xx range
      console.error('Server error:', error.response.status);
      console.log('Error:', error.response.data);
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

export const getAllUserPublishedBooks = async () => {
  const accessToken = await getAccessToken();
  console.log('Access token:', accessToken);
  try {
    const response = await axios.get(
      `http://${IP}/api/book/getAllUserPublishedBooks`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: 5000,
      },
    );
    return {status: response.status, data: response.data};
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn('No books found');
      return {status: 404, data: null}; // return specific response for 404
    } else if (error.response) {
      console.error('Server error:', error.response.status);
      console.log('Error:', error.response.data);
    } else if (error.request) {
      console.error(
        'No response received, server may be down or unreachable:',
        error.request,
      );
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

export const getAllUserDraftBooks = async () => {
  const accessToken = await getAccessToken();
  console.log('Access token:', accessToken);
  try {
    const response = await axios.get(
      `http://${IP}/api/book/getAllUserDraftBooks`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: 5000,
      },
    );
    return {status: response.status, data: response.data};
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn('No draft books found');
      return {status: 404, data: null}; // return specific response for 404
    } else if (error.response) {
      console.error('Server error:', error.response.status);
      console.log('Error:', error.response.data);
    } else if (error.request) {
      console.error(
        'No response received, server may be down or unreachable:',
        error.request,
      );
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

export const getSingleBookData = async bookId => {
  const accessToken = await getAccessToken();
  try {
    const response = await axios.get(
      `http://${IP}/api/book/getSingleBook/${bookId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: 5000,
      },
    );
    return {status: response.status, data: response.data};
  } catch (error) {
    if (error.response) {
      console.error('Server error:', error.response.status);
      console.log('Error:', error.response.data);
    } else if (error.request) {
      console.error(
        'No response received, server may be down or unreachable:',
        error.request,
      );
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

export const updateBook = async (
  bookId,
  title,
  description,
  coverImageLink,
  tags,
) => {
  const accessToken = await getAccessToken();
  try {
    const response = await axios.put(
      `http://${IP}/api/book/updateBook/${bookId}`,
      {
        title: title,
        plot: description,
        coverImage: coverImageLink,
        tags: tags,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: 5000,
      },
    );
    return {status: response.status, data: response.data};
  } catch (error) {
    if (error.response) {
      console.error('Server error:', error.response.status);
      console.log('Error:', error.response.data);
    } else if (error.request) {
      console.error(
        'No response received, server may be down or unreachable:',
        error.request,
      );
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

export const publishBook = async bookId => {
  const accessToken = await getAccessToken();
  try {
    const response = await axios.put(
      `http://${IP}/api/book/publishBook/${bookId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: 5000,
      },
    );
    return {status: response.status, data: response.data};
  } catch (error) {
    if (error.response) {
      console.error('Server error:', error.response.status);
      console.log('Error:', error.response.data);
    } else if (error.request) {
      console.error(
        'No response received, server may be down or unreachable:',
        error.request,
      );
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

export const unpublishBook = async bookId => {
  const accessToken = await getAccessToken();
  try {
    const response = await axios.put(
      `http://${IP}/api/book/unpublishBook/${bookId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: 5000,
      },
    );
    return {status: response.status, data: response.data};
  } catch (error) {
    if (error.response) {
      console.error('Server error:', error.response.status);
      console.log('Error:', error.response.data);
    } else if (error.request) {
      console.error(
        'No response received, server may be down or unreachable:',
        error.request,
      );
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

export const deleteBook = async bookId => {
  const accessToken = await getAccessToken();
  try {
    const response = await axios.delete(
      `http://${IP}/api/book/deleteBook/${bookId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: 5000,
      },
    );
    return {status: response.status, data: response.data};
  } catch (error) {
    if (error.response) {
      console.error('Server error:', error.response.status);
      console.log('Error:', error.response.data);
    } else if (error.request) {
      console.error(
        'No response received, server may be down or unreachable:',
        error.request,
      );
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

export const getSingleChapter = async chapterId => {
  const accessToken = await getAccessToken();
  try {
    const response = await axios.get(
      `http://${IP}/api/chapter/getSingleChapter/${chapterId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: 5000,
      },
    );
    return {status: response.status, data: response.data};
  } catch (error) {
    if (error.response) {
      console.error('Server error:', error.response.status);
      console.log('Error:', error.response.data);
    } else if (error.request) {
      console.error(
        'No response received, server may be down or unreachable:',
        error.request,
      );
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

export const searchBooks = async (query = '', tag = '', page, limit) => {
  const accessToken = await getAccessToken();
  try {
    const response = await axios.get(
      `http://${IP}/api/book/getAllBooks?keyword=${query}&tag=${tag}&page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: 5000,
      },
    );
    return {status: response.status, data: response.data};
  } catch (error) {
    if (error.response) {
      console.error('Server error:', error.response.status);
      console.log('Error:', error.response.data);
    } else if (error.request) {
      console.error(
        'No response received, server may be down or unreachable:',
        error.request,
      );
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

export const searchBooksByTag = async (tag, page = 1, limit = 10) => {
  const accessToken = await getAccessToken();
  try {
    const response = await axios.get(
      `http://${IP}/api/book/getAllBooks?keyword=&tags=${tag}&page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: 5000,
      },
    );
    return {status: response.status, data: response.data};
  } catch (error) {
    if (error.response) {
      console.error('Server error:', error.response.status);
      console.log('Error:', error.response.data);
    } else if (error.request) {
      console.error(
        'No response received, server may be down or unreachable:',
        error.request,
      );
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

export const getRandomBooks = async (page, limit) => {
  const accessToken = await getAccessToken();
  try {
    const response = await axios.get(
      `http://${IP}/api/book/getRandomBooks?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: 5000,
      },
    );
    return {status: response.status, data: response.data};
  } catch (error) {
    if (error.response) {
      console.error('Server error:', error.response.status);
    } else if (error.request) {
      console.error(
        'No response received, server may be down or unreachable:',
        error.request,
      );
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

export const addToLibrary = async bookId => {
  const accessToken = await getAccessToken();
  try {
    const response = await axios.put(
      `http://${IP}/api/book/addToLibrary/${bookId}`,
      {},
      {
        // Configuration object
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: 5000,
      },
    );
    return {status: response.status, data: response.data};
  } catch (error) {
    if (error.response) {
      console.error('Server error:', error.response.status);
    } else if (error.request) {
      console.error(
        'No response received, server may be down or unreachable:',
        error.request,
      );
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

export const createReview = async (bookId, positive, review) => {
  const accessToken = await getAccessToken();
  try {
    const response = await axios.post(
      `http://${IP}/api/review/createReview/`,
      {
        positive: positive,
        review: review,
        bookId: bookId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: 5000,
      },
    );
    return {status: response.status, data: response.data};
  } catch (error) {
    if (error.response) {
      console.error('Server error:', error.response.status);
    } else if (error.request) {
      console.error(
        'No response received, server may be down or unreachable:',
        error.request,
      );
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

export const hasReviewed = async bookId => {
  const accessToken = await getAccessToken();
  try {
    const response = await axios.get(
      `http://${IP}/api/user/${bookId}/hasReview`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: 5000,
      },
    );
    return {status: response.status, data: response.data};
  } catch (error) {
    if (error.response) {
      console.error('Server error:', error.response.status);
    } else if (error.request) {
      console.error(
        'No response received, server may be down or unreachable:',
        error.request,
      );
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

export const increaseViewCount = async bookId => {
  const accessToken = await getAccessToken();
  try {
    const response = await axios.put(
      `http://${IP}/api/book/increaseView/${bookId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: 5000,
      },
    );
    return {status: response.status, data: response.data};
  } catch (error) {
    if (error.response) {
      console.error('Server error:', error.response.status);
    } else if (error.request) {
      console.error(
        'No response received, server may be down or unreachable:',
        error.request,
      );
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

export const getBookReviews = async bookId => {
  const accessToken = await getAccessToken();
  try {
    const response = await axios.get(
      `http://${IP}/api/review/getBookReviews/${bookId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: 5000,
      },
    );
    return {status: response.status, data: response.data};
  } catch (error) {
    if (error.response) {
      console.error('Server error:', error.response.status);
    } else if (error.request) {
      console.error(
        'No response received, server may be down or unreachable:',
        error.request,
      );
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};

export const getLibrary = async () => {
  const accessToken = await getAccessToken();
  try {
    const response = await axios.get(`http://${IP}/api/user/getLibrary`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      timeout: 5000,
    });
    return {status: response.status, data: response.data};
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn('No books found');
      return {status: 404, data: null}; // return specific response for 404
    } else if (error.response) {
      console.error('Server error:', error.response.status);
      console.log('Error:', error.response.data);
    } else if (error.request) {
      console.error(
        'No response received, server may be down or unreachable:',
        error.request,
      );
    } else {
      console.error('Error:', error.message);
    }
    throw error;
  }
};
