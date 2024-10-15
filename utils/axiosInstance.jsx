import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://holidayplanning.onrender.com',  
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,  
});