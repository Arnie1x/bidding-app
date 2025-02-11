"use client";

import { useState, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginAsync } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

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
        toast("Login successful");
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
    <div className="h-full w-full">
      <div className="flex items-center justify-center text-black max-w-[35rem] mx-auto my-auto">
        <form onSubmit={handleSubmit}
          className="bg-white p-8 rounded-md shadow-md w-full"
        >
          <h2 className="text-2xl font-bold mb-4">Sign In</h2>
          <label className="block mb-2" htmlFor="email">
            Email
          </label>
          <Input
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
          <Input
            type="password"
            id="password"
            name="password"
            className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* <input type="hidden" name="redirectTo" value={callbackUrl} /> */}
          <div className="flex flex-col sm:flex-row gap-2 justify-start sm:justify-between">
            <Button onClick={() => router.push("/signup")} type="button" variant={'link'}>Don't have an account? Sign Up</Button>
            <Button
              type="submit"
              className="text-white font-bold py-2 px-4 rounded-md"
            >
              Sign In
            </Button>
          </div>
          {errorMessage && (
            <p className="text-red-500 mt-4">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}
