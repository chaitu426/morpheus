"use client";

import { useState, useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

// Theme
import { ThemeProvider, useTheme } from "@/app/student-dashboard/ThemeContext";

// Layout
import AnimatedBackground from "./_components/layout/AnimatedBackground";
import DashboardHeader from "./_components/layout/DashboardHeader";
import PageHeading from "./_components/layout/PageHeading";

// UI
import TabPane from "./_components/ui/TabPane";

// Tabs
import Tutors from "./_components/tabs/Tutors";
import Billings from "./_components/tabs/Billings";
import MyProgress from "./_components/tabs/MyProgress";
import Chat from "./_components/tabs/Chat";
import Community from "./_components/tabs/Community";
import Flashcards from "./_components/tabs/Flashcards";
import VideoLectures from "./_components/tabs/VideoLectures";
import AITutor from "./_components/tabs/AITutor";
import ProfilePanel from "./_components/tabs/ProfilePanel";

import type { AppMode, RegularTab, ExamTab } from "./_components/constants";

// ── Inner component (needs ThemeProvider context) ─────────────────────────────
function StudentDashboard() {
  const { isDark, toggleTheme } = useTheme();
  const [mode, setMode] = useState<AppMode>("regular");
  const [tab, setTab] = useState<RegularTab | ExamTab>("Tutors");
  const [profileOpen, setProfileOpen] = useState(false);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleModeChange = (m: AppMode) => {
    setMode(m);
    setTab(m === "exam" ? "Community" : "Tutors");
  };

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
        mode={mode}
        onModeChange={handleModeChange}
        activeTab={tab}
        onTabChange={setTab}
        onProfileOpen={() => setProfileOpen(true)}
        isDark={isDark}
        onThemeToggle={toggleTheme}
      />

      <PageHeading tab={tab} mode={mode} isDark={isDark} />

      <main className="relative z-10 px-6 sm:px-10 pb-12">
        <TabPane key={tab} id={tab}>
          {tab === "Tutors" && <Tutors go={go} />}
          {tab === "Billings" && <Billings />}
          {tab === "My Progress" && <MyProgress go={go} />}
          {tab === "Chat" && <Chat />}

          {tab === "Community" && <Community />}
          {tab === "Flashcards" && <Flashcards />}
          {tab === "Video Lectures" && <VideoLectures />}
          {tab === "AI Tutor" && <AITutor />}
        </TabPane>
      </main>

      {profileOpen && (
        <ProfilePanel onClose={() => setProfileOpen(false)} />
      )}
    </div>
  );
}

// ── Root page (provides theme context) ───────────────────────────────────────
export default function StudentDashboardPage() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <StudentDashboard />
      </TooltipProvider>
    </ThemeProvider>
  );
}