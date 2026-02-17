"use client";

import { motion } from "framer-motion";
import { ThemeToggle } from "../components/theme-toggle";

export default function LoginPage() {
  return (
    <main className="neon-bg min-h-screen flex flex-col items-center justify-center px-6 text-slate-900 dark:text-white transition-colors duration-500 overflow-x-hidden">
      
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Login Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-md w-full p-10 bg-white/70 dark:bg-black/30 backdrop-blur-lg rounded-3xl shadow-xl border border-blue-200 dark:border-white/10"
      >
        <h1 className="text-3xl font-extrabold text-center mb-6">Sign In</h1>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-xl border border-blue-200 dark:border-white/10 bg-white/50 dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 transition"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-xl border border-blue-200 dark:border-white/10 bg-white/50 dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 transition"
          />
          <button
            type="submit"
            className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-purple-500 dark:to-blue-500 text-white font-semibold hover:scale-105 hover:shadow-2xl dark:hover:shadow-purple-500/40 transition duration-300"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-slate-600 dark:text-zinc-400 text-sm">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="text-blue-600 dark:text-purple-400 hover:underline"
          >
            Sign Up
          </a>
        </p>
      </motion.div>
    </main>
  );
}
