"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useEffect } from "react";
import { setCookie, getCookie } from 'cookies-next';
var CryptoJS = require('crypto-js');
import { setCredentials } from "@/store/authSlice";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  // Optionally, initialize the Redux auth state from the cookie on app load.
  useEffect(() => {
    const encryptedData = getCookie("authData");
    if (encryptedData) {
      try {
        const decrypted = CryptoJS.AES.decrypt(
          encryptedData,
          process.env.NEXT_PUBLIC_COOKIE_ENCRYPTION_KEY || "my-secret-key"
        ).toString(CryptoJS.enc.Utf8);
        const authData = JSON.parse(decrypted);
        store.dispatch(setCredentials(authData));
      } catch (error) {
        console.error("Failed to decrypt auth cookie", error);
      }
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
