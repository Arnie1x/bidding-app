// utils/apiClient.ts

import axios from "axios";
import { getAuthToken } from "./getAuthToken";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Attach an interceptor that gets the current token on each request.
apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    if (config.method === 'get') {
      config.params = { ...config.params, token };
    } else {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }
  return config;
});
