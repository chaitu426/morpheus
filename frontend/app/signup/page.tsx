"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "../components/theme-toggle";

export default function SignUpPage() {
  const [role, setRole] = useState<"student" | "tutor">("student");

  return (
    <main className="neon-bg min-h-screen flex flex-col items-center justify-center px-6 text-slate-900 dark:text-white transition-colors duration-500 overflow-x-hidden">
      
      {/* Theme Toggle Top Right */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-md w-full p-10 bg-white/70 dark:bg-black/30 backdrop-blur-lg rounded-3xl shadow-xl border border-blue-200 dark:border-white/10"
      >
        <h1 className="text-3xl font-extrabold text-center mb-6">
          Sign Up
        </h1>

        {/* Role Selector */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg font-medium ${
              role === "student"
                ? "bg-blue-500 text-white"
                : "bg-white/30 dark:bg-white/10 dark:text-white"
            } transition duration-300`}
            onClick={() => setRole("student")}
          >
            Student
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium ${
              role === "tutor"
                ? "bg-purple-500 text-white"
                : "bg-white/30 dark:bg-white/10 dark:text-white"
            } transition duration-300`}
            onClick={() => setRole("tutor")}
          >
            Tutor
          </button>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="p-3 rounded-xl border border-blue-200 dark:border-white/10 bg-white/50 dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 transition"
          />
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
            Sign Up as {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        </form>

        {/* Switch to Sign In */}
        <p className="mt-6 text-center text-slate-600 dark:text-zinc-400 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 dark:text-purple-400 hover:underline"
          >
            Sign In
          </a>
        </p>
      </motion.div>
    </main>
  );
}
