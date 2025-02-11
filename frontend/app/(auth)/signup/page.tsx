"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { apiClient } from "@/utils/apiClient";
import { toast } from "@/lib/actions";

export default function SignUp() {
  const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
      confirmPassword,
    };
    try {
      const schema = z
        .object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(5),
          confirmPassword: z.string().min(5),
        })
        .safeParse(data);

      if (!schema.success) {
        console.log(schema.error);
        return schema.error;
      }
      const finalData = {
        name: data.name,
        email: data.email,
        password: data.password
      }
      await apiClient.post("/signup", finalData);
      toast("Account Created Successfully.", "Sign Up");
      router.push("/signin");
    } catch (error) {
      console.log(error);
      setErrorMessage("Sign Up Failed: " + error || "Unknown error");
    }
  };

  return (
    <div className="flex items-center justify-center h-full text-black max-w-[35rem] mx-auto my-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-md w-full"
      >
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <label className="block mb-2" htmlFor="email">
          Name
        </label>
        <Input
          type="text"
          id="name"
          name="name"
          className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <label className="block mb-2" htmlFor="password">
          Confirm Password
        </label>
        <Input
          type="password"
          id="confirm-password"
          name="confirm-password"
          className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {/* <input type="hidden" name="redirectTo" value={callbackUrl} /> */}
        <div className="flex flex-col sm:flex-row gap-2 justify-start sm:justify-between">
          <Button
            onClick={() => router.push("/signin")}
            type="button"
            variant={"link"}
          >
            Already have an account? Sign in
          </Button>
          <Button
            type="submit"
            className="text-white font-bold py-2 px-4 rounded-md"
          >
            Sign In
          </Button>
        </div>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </form>
    </div>
  );
}
