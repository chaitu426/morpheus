"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Bell, BookOpen, Menu, X, LogOut, UserCircle, ChevronDown, Zap, Sun, Moon } from "lucide-react";
import { REGULAR_TABS, EXAM_TABS } from "../constants";
import type { AppMode, RegularTab, ExamTab } from "../constants";

interface DashboardHeaderProps {
  mode:           AppMode;
  onModeChange:   (m: AppMode) => void;
  activeTab:      RegularTab | ExamTab;
  onTabChange:    (t: RegularTab | ExamTab) => void;
  onProfileOpen:  () => void;
  isDark:         boolean;
  onThemeToggle:  () => void;
}

export default function DashboardHeader({
  mode, onModeChange, activeTab, onTabChange, onProfileOpen, isDark, onThemeToggle,
}: DashboardHeaderProps) {
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isExam = mode === "exam";
  const tabs   = isExam ? EXAM_TABS : REGULAR_TABS;

  const switchTab = (tab: RegularTab | ExamTab) => { onTabChange(tab); setMobileOpen(false); };
  const toggleMode = () => {
    const next = isExam ? "regular" : "exam";
    onModeChange(next);
    onTabChange(next === "exam" ? "Community" : "Tutors");
  };

  // ── Shared dark-aware class fragments ────────────────────────────────────
  const headerCls = isDark
    ? "bg-gray-900/70 backdrop-blur-2xl border-b border-white/10 shadow-sm"
    : "bg-white/30   backdrop-blur-2xl border-b border-white/50  shadow-sm";
  const navBg      = isDark ? "bg-white/10 border-white/10"  : "bg-white/40 border-white/70";
  const activeBtn  = isExam
    ? "bg-violet-600 text-white shadow-md"
    : isDark ? "bg-amber-500 text-gray-900 shadow-md" : "bg-gray-900 text-white shadow-md";
  const inactiveBtn = isDark
    ? "text-gray-400 hover:text-white hover:bg-white/10"
    : "text-gray-500 hover:text-gray-800 hover:bg-white/70";
  const iconBtn = isDark
    ? "border-white/15 bg-white/10 hover:bg-white/20 text-gray-300"
    : "border-gray-200/60 bg-white/60 hover:bg-white text-gray-600";
  const drawerCls = isDark
    ? "bg-gray-900/80 backdrop-blur-xl border-b border-white/10"
    : "bg-white/40    backdrop-blur-xl border-b border-white/50";
  const dropdownCls = isDark
    ? "bg-gray-800/95 backdrop-blur-xl border border-white/10"
    : "bg-white/90    backdrop-blur-xl border border-gray-100";
  const dropdownItem = isDark
    ? "text-gray-300 hover:bg-white/10 hover:text-white"
    : "text-gray-700 hover:bg-amber-50 hover:text-amber-700";
  const mobileActiveCls = isExam
    ? "bg-violet-600 text-white"
    : isDark ? "bg-amber-500 text-gray-900" : "bg-gray-900 text-white";
  const mobileInactiveCls = isDark
    ? "bg-white/10 text-gray-300 border border-white/10 hover:bg-white/20"
    : "bg-white/70 text-gray-600 border border-gray-200 hover:bg-white";

  return (
    <>
      {/* ── Sticky header ──────────────────────────────────── */}
      <header className={`sticky top-0 z-30 flex items-center justify-between px-6 sm:px-10 py-3.5 gap-4 ${headerCls}`}>

        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-amber-400 rounded-xl flex items-center justify-center shadow-sm">
            <BookOpen className="w-4 h-4 text-gray-900" />
          </div>
          <span
            className={`hidden sm:block ${isDark ? "text-white" : "text-gray-900"}`}
            style={{ fontFamily:"var(--font-heading,'Instrument Serif',Georgia,serif)", fontWeight:400, fontSize:"1.15rem", letterSpacing:"-0.01em" }}
          >EduMentor</span>
        </div>

        {/* Desktop nav */}
<nav className={`hidden md:flex items-center gap-0.5 rounded-2xl px-1.5 py-1.5 border ${navBg}`}>
  {tabs.map((tab) => (
    <button
      key={tab}
      onClick={() => switchTab(tab)}
      className={`relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-semibold
        transition-all duration-200 outline-none
        ${activeTab === tab ? activeBtn : inactiveBtn}`}
    >
      {tab}
    </button>
  ))}
</nav>

        {/* Right actions */}
        <div className="flex items-center gap-2.5 shrink-0">

          {/* Exam mode toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={toggleMode}
                className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold
                  border transition-all duration-300 select-none
                  ${isExam
                    ? "bg-violet-600 border-violet-500 text-white shadow-lg"
                    : isDark
                      ? "bg-white/10 border-white/15 text-gray-300 hover:bg-white/20 hover:border-amber-400 hover:text-amber-400"
                      : "bg-white/60 border-gray-200 text-gray-600 hover:bg-white hover:border-amber-300 hover:text-amber-700"}`}
                style={isExam ? { animation:"examGlow 2s ease-in-out infinite" } : {}}>
                <Zap className={`w-3.5 h-3.5 ${isExam ? "fill-white" : ""}`} />
                <span>{isExam ? "Exam Mode" : "Regular"}</span>
                <span className={`w-8 h-4 rounded-full flex items-center px-0.5 transition-colors duration-300
                  ${isExam ? "bg-violet-400" : "bg-gray-300"}`}>
                  <span className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform duration-300
                    ${isExam ? "translate-x-4" : "translate-x-0"}`} />
                </span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-[200px] text-center">
              {isExam ? "Switch to Regular Mode" : "Switch to Exam Mode for fast-track prep"}
            </TooltipContent>
          </Tooltip>

          {/* 🌙 / ☀ Theme toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={onThemeToggle} aria-label="Toggle dark mode"
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 hidden sm:flex
                  ${isDark
                    ? "bg-amber-400 border-amber-300 text-gray-900 hover:bg-amber-300"
                    : "bg-white/60 border-gray-200/60 text-gray-600 hover:bg-gray-100"}`}>
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{isDark ? "Light mode" : "Dark mode"}</TooltipContent>
          </Tooltip>

          {/* Bell */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon"
                className={`relative rounded-full w-9 h-9 shadow-none transition-all border hidden sm:flex ${iconBtn}`}>
                <Bell className="w-3.5 h-3.5" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Notifications</TooltipContent>
          </Tooltip>

          {/* Profile dropdown */}
          <div className="relative hidden sm:block">
            <button onClick={() => setProfileOpen(o => !o)}
              className={`flex items-center gap-1.5 border rounded-full pl-1 pr-2.5 py-1 transition-all duration-200 hover:shadow-sm
                ${isDark
                  ? "bg-white/10 border-white/15 hover:bg-white/20"
                  : "bg-white/60 border-gray-200/60 hover:bg-white"}`}>
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-300 to-blue-400
                flex items-center justify-center text-xs font-black text-white">AS</div>
              <span className={`text-xs font-semibold ${isDark ? "text-gray-200" : "text-gray-700"}`}>Aanya</span>
              <ChevronDown className={`w-3 h-3 ${isDark ? "text-gray-400" : "text-gray-400"} transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`} />
            </button>

            {profileOpen && (
              <div className={`absolute right-0 top-full mt-2 w-44 rounded-2xl shadow-xl py-1.5 z-50 overflow-hidden ${dropdownCls}`}>
                <button onClick={() => { onProfileOpen(); setProfileOpen(false); }}
                  className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${dropdownItem}`}>
                  <UserCircle className="w-4 h-4" /> My Profile
                </button>
                <div className={`h-px mx-3 my-1 ${isDark ? "bg-white/10" : "bg-gray-100"}`} />
                <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                  <LogOut className="w-4 h-4" /> Log Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <Button variant="outline" size="icon"
            className={`md:hidden rounded-full w-9 h-9 shadow-none border ${iconBtn}`}
            onClick={() => setMobileOpen(o => !o)}>
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>
      </header>

      {/* ── Mobile nav drawer ──────────────────────────────── */}
      <div className={`md:hidden relative z-20 overflow-hidden transition-all duration-300 ease-in-out ${drawerCls}
        ${mobileOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 py-3 flex flex-col gap-2">
          <div className="flex flex-wrap gap-2 items-center">
            {/* Mode toggle */}
            <button onClick={toggleMode}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all
                ${isExam ? "bg-violet-600 border-violet-500 text-white" : isDark ? "bg-white/10 border-white/15 text-gray-300" : "bg-white/60 border-gray-200 text-gray-600"}`}>
              <Zap className="w-3.5 h-3.5" />
              {isExam ? "Exam Mode ON" : "Exam Mode"}
            </button>
            {/* Theme toggle */}
            <button onClick={onThemeToggle}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all
                ${isDark ? "bg-amber-400 border-amber-300 text-gray-900" : "bg-white/60 border-gray-200 text-gray-600"}`}>
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              {isDark ? "Light" : "Dark"}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
           {tabs.map((tab) => (
  <Button
    key={tab}   // ✅ REQUIRED
    onClick={() => onTabChange(tab)}
  >
    {tab}
  </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}