'use client';
import { useState } from "react";

export default function SignIn() {
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    const response = await fetch("http://localhost:8000/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { "username": email, "password": password },
    });
    const data = await response.json();
    if (data.error) {
      setError(data.error);
      // alert(data.error);
    } else {
      // window.location.href = "/";
      console.log(data);
    }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen text-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <label className="block mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
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
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Sign In
        </button>
        {error && <p className="text-red-500 mt-4">Error Signing In: {error}</p>}
      </form>
    </div>
  );
}
