import axios from "axios";
import { getSession } from "@/lib/auth";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Attach an interceptor that gets the current token on each request.
apiClient.interceptors.request.use(async (config) => {
  const session = await getSession();
  console.log("API Client Session: " + session?.access_token);
  const token = session?.access_token;
  if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
  }
  return config;
});