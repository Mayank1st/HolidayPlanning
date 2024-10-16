import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://holidayplanning.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
