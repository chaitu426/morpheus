"use client";

import { useState, useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

// Theme
import { ThemeProvider, useTheme } from "./ThemeContext";

// Layout
import AnimatedBackground from "./_components/layout/AnimatedBackground";
import DashboardHeader    from "./_components/layout/DashboardHeader";
import PageHeading        from "./_components/layout/PageHeading";

// UI
import TabPane from "./_components/ui/TabPane";

// Tabs
import Overview     from "./_components/tabs/Overview";
import Payment      from "./_components/tabs/Payment";
import TestCreation from "./_components/tabs/TestCreation";
import Chat         from "./_components/tabs/Chat";
import Profile      from "./_components/tabs/Profile";

import type { NavTab } from "./_components/types";

// ── Inner component (needs ThemeProvider context) ─────────────────────────────
function TutorDashboard() {
  const { isDark, toggleTheme } = useTheme();
  const [tab, setTab] = useState<NavTab>("Overview");
  const [go,  setGo]  = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen w-full font-sans relative overflow-x-hidden transition-colors duration-500"
      style={{
        background: isDark
          ? "linear-gradient(155deg,#0c0a09 0%,#1c1917 50%,#292524 100%)"
          : "linear-gradient(155deg,#f0efe8 0%,#faf7e4 45%,#fef4be 100%)",
      }}
    >
      <AnimatedBackground isDark={isDark} />

      <DashboardHeader
        activeTab={tab}
        onTabChange={setTab}
        isDark={isDark}
        onThemeToggle={toggleTheme}
      />

      <PageHeading tab={tab} isDark={isDark} />

      <main className="relative z-10 px-6 sm:px-10 pb-12">
        <TabPane key={tab} id={tab}>
          {tab === "Overview"      && <Overview go={go} />}
          {tab === "Payment"       && <Payment />}
          {tab === "Test-Creation" && <TestCreation />}
          {tab === "Chat"          && <Chat />}
          {tab === "Profile"       && <Profile />}
        </TabPane>
      </main>
    </div>
  );
}

// ── Root page (provides theme context) ───────────────────────────────────────
export default function TutorDashboardPage() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <TutorDashboard />
      </TooltipProvider>
    </ThemeProvider>
  );
}
