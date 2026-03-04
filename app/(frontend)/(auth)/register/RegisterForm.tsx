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
          htmlFor="name"
          className="block text-sm font-medium text-[#0F172A] "
        >
          Your Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="w-full px-4 py-3 placeholder:text-gray-400 text-gray-700 bg-[#F8FAFC] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all duration-200"
          placeholder="Jone Duo"
          
        />
      </div>
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
          
        />
      </div>
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-[#0F172A] "
        >
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="text"
          className="w-full px-4 py-3 placeholder:text-gray-400 text-gray-700 bg-[#F8FAFC] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all duration-200"
          placeholder="0123456789"
          
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
          autoComplete="true"
        />
      </div>
      <div></div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#2563EB] text-white py-3 px-4 rounded-xl hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      <div className=" text-center">
        <p className="text-sm text-slate-600">
          Already have an account?{" "}
          <button className="text-[#2563EB] hover:text-[#1d4ed8] font-medium transition-colors">
            <Link href="/login">Login</Link>
          </button>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
