'use client';

import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { new_user } from "../lib/actions";

export default function SignUp() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/app';
    const [errorMessage, formAction, isPending] = useActionState(
        new_user,
      undefined,
    );
  
    return (
      <div className="flex items-center justify-center h-screen text-black">
        <form
          action={formAction}
          className="bg-white p-8 rounded-md shadow-md"
        >
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          <label className="block mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
            required
          />
          <label className="block mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
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
            Sign Up
          </button>
          {errorMessage && (
            <p className="text-red-500 mt-4">{errorMessage}</p>
          )}
        </form>
      </div>
    );
  }