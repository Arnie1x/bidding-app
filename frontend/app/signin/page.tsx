"use client";

import { Metadata } from "next";
import { useState } from "react";
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';

export default function SignIn() {
//   const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/app';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );


  return (
    <div className="flex items-center justify-center h-screen text-black">
      <form
        action={formAction}
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
          required
        />
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <button
          type="submit" aria-disabled={isPending}
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
