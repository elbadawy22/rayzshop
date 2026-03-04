"use client";
import Link from "next/link";
interface LoginFormProps {
  loading?: boolean;
}

const LoginForm = ({ loading = false }: LoginFormProps) => {
  return (
    <>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[#0F172A] "
        >
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="w-full px-4 py-3 placeholder:text-gray-400 text-gray-700 bg-[#F8FAFC] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all duration-200"
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-[#0F172A] mb-2"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="w-full px-4 py-3 placeholder:text-gray-400 text-gray-700 bg-[#F8FAFC] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all duration-200"
          placeholder="••••••••••••••"
          required
          autoComplete="true"
        />
      </div>
      <div></div>
      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="w-4 h-4 text-[#2563EB] border-slate-300 rounded focus:ring-[#2563EB] focus:ring-2"
          />
          <span className="ml-2 text-sm text-slate-600">Remember me</span>
        </label>
        <button
          type="button"
          className="text-sm text-[#2563EB] hover:text-[#1d4ed8] transition-colors"
        >
          Forgot password?
        </button>
      </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#2563EB] text-white py-3 px-4 rounded-xl hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      <div className=" text-center">
        <p className="text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <button className="text-[#2563EB] hover:text-[#1d4ed8] font-medium transition-colors">
            <Link href="/register">Sign up</Link>
          </button>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
