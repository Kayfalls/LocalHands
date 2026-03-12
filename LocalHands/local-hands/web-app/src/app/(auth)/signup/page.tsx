"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import apiClient from "@/lib/api-client";
import { storeAuth } from "@/lib/auth";
import { TokenResponse } from "@/types/api";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"worker" | "employer">("worker");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const { data } = await apiClient.post<TokenResponse>("/auth/register", {
        email,
        password,
        role,
      });
      storeAuth(data.access_token, data.role);
      if (data.role === "employer" || data.role === "admin") {
        router.push("/employer/dashboard");
        return;
      }
      router.push("/worker/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Registration failed. Try another email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen grid place-items-center p-6">
      <form onSubmit={onSubmit} className="card w-full max-w-md p-8 animate-slideUp">
        <h1 className="text-2xl font-semibold">Create Account</h1>
        <p className="text-sm text-neutral-600 mt-1">Sign up to find jobs or hire workers.</p>

        <label className="block mt-6 text-sm font-medium">Email</label>
        <input
          type="email"
          className="mt-1 w-full border border-[#f2ccd3] rounded-2xl px-4 py-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
        />

        <label className="block mt-4 text-sm font-medium">I am a:</label>
        <div className="mt-2 space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="role"
              value="worker"
              checked={role === "worker"}
              onChange={(e) => setRole(e.target.value as "worker")}
              className="mr-2"
            />
            <span className="text-sm">Worker (looking for jobs)</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="role"
              value="employer"
              checked={role === "employer"}
              onChange={(e) => setRole(e.target.value as "employer")}
              className="mr-2"
            />
            <span className="text-sm">Employer (hiring workers)</span>
          </label>
        </div>

        <label className="block mt-4 text-sm font-medium">Password</label>
        <input
          type="password"
          className="mt-1 w-full border border-[#f2ccd3] rounded-2xl px-4 py-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
          required
        />

        <label className="block mt-4 text-sm font-medium">Confirm Password</label>
        <input
          type="password"
          className="mt-1 w-full border border-[#f2ccd3] rounded-2xl px-4 py-3"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          required
        />

        {error && <p className="text-sm text-[#B11226] mt-4">{error}</p>}

        <button
          disabled={loading}
          className="w-full mt-6 bg-[#B11226] text-white rounded-2xl py-3 hover:bg-[#8e0d1e] transition-colors disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="text-sm text-neutral-600 mt-4 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-[#B11226] font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </main>
  );
}
