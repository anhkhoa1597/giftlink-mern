import axios from "axios";
import config from "../config/config";

const apiClient = axios.create({
  baseURL: config.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Thêm interceptor để tự động đính kèm token
apiClient.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const handleApi = async (axiosCall, rejectWithValue, optionReject) => {
  try {
    const res = await axiosCall();
    return res.data;
  } catch (err) {
    const message = {
      message: err.response?.data?.message || optionReject,
    };

    throw rejectWithValue(message);
  }
};

export default apiClient;
