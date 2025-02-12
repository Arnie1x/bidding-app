import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie } from 'cookies-next';
var CryptoJS = require('crypto-js');

// Type for your auth state
interface AuthState {
  user: {
    id: number | null;
    admin_id: number | null;
    name: string | null;
    email: string | null;
  } | null;
  accessToken: string | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  status: "idle",
  error: null,
};

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_COOKIE_ENCRYPTION_KEY || "my-secret-key";

// Utility functions for encrypting/decrypting the cookie data
const encryptData = (data: string) => {
  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
};

const decryptData = (cipherText: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Create an async thunk for logging in
export const loginAsync = createAsyncThunk(
  "/signin",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      // FastAPI expects form data in x-www-form-urlencoded format
      const params = new URLSearchParams();
      params.append("username", credentials.email);
      params.append("password", credentials.password);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/token`,
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.status === 200 && response.data.access_token) {
        return {
          id: response.data.user_id,
          admin_id: response.data.admin_id,
          name: response.data.name,
          email: credentials.email,
          accessToken: response.data.access_token,
        };
      } else {
        return rejectWithValue("Invalid credentials");
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.status = "idle";
      state.error = null;
      // Remove the cookie on logout
      setCookie('authData', null);
    },
    // A reducer to initialize auth state from cookie if it exists
    setCredentials(
      state,
      action: PayloadAction<{
        user: AuthState["user"];
        accessToken: string;
      }>
    ) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = {
          id: action.payload.id,
          admin_id: action.payload.admin_id,
          name: action.payload.name,
          email: action.payload.email,
        };
        state.accessToken = action.payload.accessToken;
        // Save the auth data to an encrypted cookie
        const cookieData = JSON.stringify({
          user: state.user,
          accessToken: state.accessToken,
        });
        setCookie("authData", encryptData(cookieData), {
          maxAge: 60 * 60 * 24 * 7, // 7 days expiration
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
        console.log(state.user);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
