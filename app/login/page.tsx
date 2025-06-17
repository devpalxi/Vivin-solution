"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabasePublic } from "@/lib/supabase/public";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { data, error } = await supabasePublic.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        setError(error.message);
      } else {
        console.log("Login successful");
        window.location.href = "/admin";
      }
    } catch (err) {
      console.error("Exception during login:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow max-w-sm w-full space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        {error && <div className="text-red-600 text-center">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
