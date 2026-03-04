"use client";

import { LogIn } from "lucide-react";
import LoginForm from "./LoginForm";
import { useState } from "react";


const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    // Validation
    if (!email) {
      setError("Email is required");
      setLoading(false);
      return;
    }
    if (!password) {
      setError("Password is required");
      setLoading(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          credentials: "include",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Use window.location for full page reload to ensure cookie is read
      // This ensures the middleware sees the cookie
      window.location.href = "/";
    } catch (err) {
      setError(err instanceof Error ? err.message + "  Hello" : "Login failed");
      setLoading(false);
    }
  };

  return (
    <section>
      <div className=" absolute bg-white min-w-screen min-h-screen flex items-start lg:items-center lg:pt-0 pt-15   px-4 ">
        <div className="w-full  flex flex-col lg:flex-row lg:px-15 lg:gap-20  justify-around  items-center">
          <div className="text-center mb-3 ">
            <div className="inline-flex  items-center justify-center w-14 h-14 bg-[#2563EB] rounded-2xl mb-4">
              <LogIn className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-semibold text-[#0F172A] mb-2">
              Welcome back
            </h1>
            <p className="text-slate-600">
              Sign in to your account to continue
            </p>
          </div>
          <div className="lg:pt-8 pt-3 w-full  max-w-150">
            <div className="bg-white w-full  rounded-2xl shadow-sm border border-slate-200 p-8">
              <form onSubmit={handleSubmit} className="space-y-4 w-full ">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                <LoginForm loading={loading} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
