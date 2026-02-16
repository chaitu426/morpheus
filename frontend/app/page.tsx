"use client"

import { motion } from "framer-motion"
import { ThemeToggle } from "./components/theme-toggle"
import Link from "next/link";

export default function Home() {
  return (
    <main
      className="
        neon-bg
        text-slate-800 dark:text-white
        transition-colors duration-500
        overflow-x-hidden
      "
    >
      {/* ================= TOP BAR ================= */}
      <div
        className="
          text-center text-sm py-2
          bg-blue-200/40 dark:bg-purple-600/20
          border-b border-blue-300 dark:border-purple-500/20
          transition duration-300
        "
      >
        🚀 Edusync 1.0 Launching Soon — Join Early Access
      </div>

      {/* ================= NAVBAR ================= */}
<nav
  className="
    sticky top-0 z-50
    backdrop-blur-2xl
    bg-white/60 dark:bg-black/40
    border-b border-blue-200 dark:border-white/10
    shadow-lg dark:shadow-purple-500/10
    transition-colors duration-500
  "
>
  <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">
    
    {/* Logo */}
    <h1
      className="
        text-xl font-semibold tracking-tight
        bg-gradient-to-r
        from-blue-600 to-cyan-500
        dark:from-purple-400 dark:to-blue-400
        bg-clip-text text-transparent
      "
    >
      EDUSYNC
    </h1>

    {/* Center Links */}
    <div className="hidden md:flex gap-8 text-sm text-slate-600 dark:text-zinc-300">
      {["Solutions", "Pricing", "Contact"].map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase()}`}
          className="
            hover:text-slate-900
            dark:hover:text-white
            transition duration-300
          "
        >
          {item}
        </a>
      ))}
    </div>

    {/* Right Side */}
    <div className="flex items-center gap-4">

      <ThemeToggle />

      

<div className="flex items-center gap-4">
  {/* Sign In */}
  <Link
    href="/login"
    className="
      hidden sm:inline-block
      px-4 py-2 rounded-lg
      text-blue-800 dark:text-blue-300
      hover:text-green-900 dark:hover:text-green-200
      transition duration-300
      shadow-sm hover:shadow-md dark:hover:shadow-green-500/30
    "
  >
    Sign In
  </Link>

  {/* Sign Up */}
  <Link
    href="/signup"
    className="
      px-5 py-2 rounded-lg font-medium
      bg-gradient-to-r
      from-blue-600 to-cyan-500
      dark:from-purple-500 dark:to-blue-500
      text-white
      hover:scale-105
      hover:shadow-xl
      dark:hover:shadow-purple-500/40
      transition duration-300
    "
  >
    Sign Up
  </Link>
</div>

    </div>
  </div>
</nav>


      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
        {/* Glow Aura */}
        <div
          className="
            absolute -inset-20
            bg-blue-400/30 dark:bg-purple-600/20
            blur-3xl
            opacity-30
            rounded-full
          "
        />

        <div className="relative z-10">
          <motion.h1
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight"
>
  <span className="block text-slate-900 dark:text-white">
    The Future of
  </span>

  <span
    className="
      block bg-gradient-to-r
      from-blue-900 via-cyan-700 to-blue-800
      dark:from-blue-300 dark:via-cyan-300 dark:to-indigo-300
      bg-clip-text text-transparent
    "
  >
    Real-Time Learning
  </span>
</motion.h1>



          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-6 text-lg md:text-xl text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto"
          >
            AI-powered tutor matching. Shadow learning. Scalable live education.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="mt-10 flex gap-6 flex-wrap justify-center"
          >
            <a
              href="/register/student"
              className="
                px-8 py-3 rounded-xl
                bg-gradient-to-r
                from-blue-500 to-cyan-500
                dark:from-purple-500 dark:to-blue-500
                hover:scale-105
                hover:shadow-2xl
                dark:hover:shadow-purple-500/40
                transition duration-300
              "
            >
              Start Learning
            </a>

            <a
              href="#solutions"
              className="
                px-8 py-3 rounded-xl
                border border-blue-300 dark:border-white/20
                bg-white/60 dark:bg-white/5
                backdrop-blur-md
                hover:border-blue-500
                dark:hover:border-purple-500/40
                hover:shadow-xl
                dark:hover:shadow-purple-500/30
                transition duration-300
              "
            >
              Explore Platform
            </a>
          </motion.div>
        </div>
      </section>

      {/* ================= SOLUTIONS ================= */}
      <section id="solutions" className="py-24 px-6">
        <SectionTitle title="Solutions" />
        <CardGrid />
      </section>

      {/* ================= PRICING ================= */}
      <section
        id="pricing"
        className="
          py-24 px-6
          bg-blue-50/60 dark:bg-black/40
          transition-colors duration-500
        "
      >
        <SectionTitle title="Simple Pricing" />
        <PricingGrid />
      </section>

      {/* ================= FOOTER ================= */}
      <footer
        className="
          py-16 px-6
          border-t border-blue-200 dark:border-white/10
          bg-white/60 dark:bg-black/50
          transition-colors duration-500
        "
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Edusync</h3>
            <p className="text-slate-600 dark:text-zinc-400 text-sm">
              Building the future of real-time education.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-slate-600 dark:text-zinc-400 text-sm">
              <li><a href="#" className="hover:text-black dark:hover:text-white transition">About</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white transition">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Social</h4>
            <ul className="space-y-2 text-slate-600 dark:text-zinc-400 text-sm">
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-purple-400 transition">Twitter</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-purple-400 transition">LinkedIn</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-purple-400 transition">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className="text-center text-slate-500 dark:text-zinc-500 text-sm mt-10">
          © 2026 Edusync. All rights reserved.
        </div>
      </footer>
    </main>
  )
}

/* ================= COMPONENTS ================= */

function SectionTitle({ title }: { title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl font-bold">{title}</h2>
    </motion.div>
  )
}

function CardGrid() {
  const cards = ["For Students", "For Tutors", "For Institutions"]

  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {cards.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: i * 0.15 }}
          viewport={{ once: true }}
          className="
            p-8 rounded-2xl
            bg-white/70 dark:bg-white/5
            backdrop-blur-md
            border border-blue-200 dark:border-white/10
            hover:border-blue-400 dark:hover:border-purple-500/40
            hover:-translate-y-2
            hover:shadow-xl
            dark:hover:shadow-purple-500/30
            transition duration-300
          "
        >
          <h3 className="text-xl font-semibold">{c}</h3>
        </motion.div>
      ))}
    </div>
  )
}

function PricingGrid() {
  const plans = ["Free", "Pro Student", "Tutor Pro"]

  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {plans.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: i * 0.15 }}
          viewport={{ once: true }}
          className="
            p-8 rounded-2xl
            bg-white/70 dark:bg-white/5
            backdrop-blur-md
            border border-blue-200 dark:border-white/10
            hover:border-blue-400 dark:hover:border-purple-500/40
            hover:-translate-y-2
            hover:shadow-xl
            dark:hover:shadow-purple-500/30
            transition duration-300
          "
        >
          <h3 className="text-xl font-semibold mb-4">{p}</h3>
          <p className="text-slate-600 dark:text-zinc-400">
            Premium scalable plan.
          </p>
        </motion.div>
      ))}
    </div>
  )
}
