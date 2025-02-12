import { store } from "@/store/store";
import { getCookie } from 'cookies-next';
var CryptoJS = require("crypto-js");

// Use your encryption key (set via environment variable in production)
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_COOKIE_ENCRYPTION_KEY || "my-secret-key";

function getTokenFromCookie(): string | null {
  const encryptedData = getCookie("authData");
  if (!encryptedData) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    const authData = JSON.parse(decrypted);
    return authData?.accessToken;
  } catch (error) {
    console.error("Error decrypting auth cookie:", error);
    return null;
  }
}

export function getAuthToken(): string | null {
  // First try to get the token from the Redux store
  const state = store.getState();
  if (state.auth.accessToken) {
    return state.auth.accessToken;
  }
  // Otherwise, try to get it from the cookie
  return getTokenFromCookie();
}
