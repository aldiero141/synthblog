import type  { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';
import type { IUserCredentials } from "../models/component";

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: 'https://gorest.co.in/public/v2', // Replace with your API base URL
  timeout: 5000,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add authorization token or other headers
    const userStorage = localStorage.getItem('user'); 
    const user = JSON.parse(userStorage ? userStorage : '{}') as IUserCredentials;
    const token: string = user.token;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // console.log('Request intercepted', config);
    return config;
  },
  (error: AxiosError) => {
    // Handle request error
    // console.error('Request error', error);
    localStorage.clear();
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Process response data
    // console.log('Response intercepted', response);
    return response;
  },
  (error: AxiosError) => {
    // Handle response errors
    if (error.response?.status === 401) {
      // console.warn('Unauthorized! Redirecting to login...');
      // Logic to redirect to login or refresh token
      window.location.href = '/401';
    }
    localStorage.clear();
    console.error('Response error', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
