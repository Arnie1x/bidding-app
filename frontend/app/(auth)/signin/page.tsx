"use client";

import { useState, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginAsync } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';

export default function SignIn() {
const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/app';
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(loginAsync({ email, password }));
      if (loginAsync.fulfilled.match(resultAction)) {
        console.log(resultAction)
        // Redirect on successful login
        router.push("/");
      } else {
        // Handle error (display message, etc.)
        setErrorMessage("Login failed: " + (resultAction.payload || "Unknown error"));
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };


  return (
    <div className="flex items-center justify-center h-screen text-black">
      <form onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <label className="block mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="username"
          name="username"
          className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="block mb-2" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Sign In
        </button>
        {errorMessage && (
          <p className="text-red-500 mt-4">{errorMessage}</p>
        )}
      </form>
    </div>
  );
}
