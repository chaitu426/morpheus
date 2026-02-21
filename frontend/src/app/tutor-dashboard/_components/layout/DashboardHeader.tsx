"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Bell, Settings, BookOpen, Menu, X, Sun, Moon } from "lucide-react";
import { NAV_TABS } from "../constants";
import type { NavTab } from "../types";

interface DashboardHeaderProps {
  activeTab:    NavTab;
  onTabChange:  (tab: NavTab) => void;
  isDark:       boolean;
  onThemeToggle: () => void;
}

export default function DashboardHeader({
  activeTab, onTabChange, isDark, onThemeToggle,
}: DashboardHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const switchTab = (tab: NavTab) => {
    onTabChange(tab);
    setMobileOpen(false);
  };

  // ── Shared class fragments that flip with dark mode ───────────────────────
  const headerCls  = isDark
    ? "bg-gray-900/70 backdrop-blur-2xl border-b border-white/10 shadow-sm"
    : "bg-white/30   backdrop-blur-2xl border-b border-white/50  shadow-sm";
  const navBg      = isDark ? "bg-white/10 border-white/10"  : "bg-white/40 border-white/70";
  const activeBtn  = isDark ? "bg-amber-500 text-gray-900"   : "bg-gray-900 text-white";
  const inactiveBtn= isDark ? "text-gray-400 hover:text-white hover:bg-white/10"
                            : "text-gray-500 hover:text-gray-800 hover:bg-white/70";
  const iconBtn    = isDark ? "border-white/15 bg-white/10 hover:bg-white/20 text-gray-300"
                            : "border-gray-200/60 bg-white/60 hover:bg-white text-gray-600";
  const drawerCls  = isDark ? "bg-gray-900/80 backdrop-blur-xl border-b border-white/10"
                            : "bg-white/40    backdrop-blur-xl border-b border-white/50";
  const mobileActiveCls = isDark ? "bg-amber-500 text-gray-900"
                                  : "bg-gray-900 text-white";
  const mobileInactiveCls = isDark
    ? "bg-white/10 text-gray-300 border border-white/10 hover:bg-white/20"
    : "bg-white/70 text-gray-600 border border-gray-200 hover:bg-white";

  return (
    <>
      {/* ── Sticky header ─────────────────────────────────── */}
      <header className={`sticky top-0 z-30 flex items-center justify-between px-6 sm:px-10 py-3.5 gap-4 ${headerCls}`}>

        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-amber-400 rounded-xl flex items-center justify-center shadow-sm">
            <BookOpen className="w-4 h-4 text-gray-900" />
          </div>
          <span
            className={`hidden sm:block ${isDark ? "text-white" : "text-gray-900"}`}
            style={{ fontFamily:"var(--font-heading,'Instrument Serif',Georgia,serif)", fontWeight:400, fontSize:"1.15rem", letterSpacing:"-0.01em" }}
          >
            EduMentor
          </span>
        </div>

        {/* Desktop nav */}
        <nav className={`hidden md:flex items-center gap-0.5 rounded-2xl px-1.5 py-1.5 border ${navBg}`}>
          {NAV_TABS.map(({ label, icon: Ic }) => (
            <button
              key={label}
              onClick={() => switchTab(label)}
              className={`relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-semibold
                transition-all duration-200 outline-none
                ${activeTab === label ? activeBtn : inactiveBtn}`}
            >
              <Ic className="w-3.5 h-3.5 shrink-0" />
              {label}
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden sm:flex items-center gap-2">

            {/* 🌙 / ☀ Theme toggle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onThemeToggle}
                  aria-label="Toggle dark mode"
                  className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300
                    ${isDark
                      ? "bg-amber-400 border-amber-300 text-gray-900 hover:bg-amber-300"
                      : "bg-white/60 border-gray-200/60 text-gray-600 hover:bg-gray-100"}`}
                >
                  {isDark
                    ? <Sun  className="w-4 h-4" />
                    : <Moon className="w-4 h-4" />}
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">{isDark ? "Light mode" : "Dark mode"}</TooltipContent>
            </Tooltip>

            {/* Bell */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon"
                  className={`relative rounded-full w-9 h-9 shadow-none transition-all border ${iconBtn}`}>
                  <Bell className="w-3.5 h-3.5" />
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Notifications</TooltipContent>
            </Tooltip>

            <Button variant="outline" size="icon"
              className={`rounded-full w-9 h-9 shadow-none transition-all border ${iconBtn}`}>
              <Settings className="w-3.5 h-3.5" />
            </Button>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => switchTab("Profile")}
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-300 to-orange-400
                    flex items-center justify-center text-sm font-black text-white
                    hover:shadow-md active:scale-95 transition-all duration-200"
                >RK</button>
              </TooltipTrigger>
              <TooltipContent side="bottom">My Profile</TooltipContent>
            </Tooltip>
          </div>

          {/* Mobile hamburger */}
          <Button variant="outline" size="icon"
            className={`md:hidden rounded-full w-9 h-9 shadow-none border ${iconBtn}`}
            onClick={() => setMobileOpen(o => !o)}>
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>
      </header>

      {/* ── Mobile nav drawer ─────────────────────────────── */}
      <div className={`md:hidden relative z-20 overflow-hidden transition-all duration-300 ease-in-out ${drawerCls}
        ${mobileOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 py-3 flex flex-wrap gap-2 items-center">
          {/* theme toggle on mobile */}
          <button onClick={onThemeToggle}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border transition-all duration-200
              ${isDark
                ? "bg-amber-400 text-gray-900 border-amber-300"
                : "bg-white/70 text-gray-600 border-gray-200 hover:bg-white"}`}>
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            {isDark ? "Light" : "Dark"}
          </button>

          {NAV_TABS.map(({ label, icon: Ic }) => (
            <button key={label} onClick={() => switchTab(label)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200
                ${activeTab === label ? mobileActiveCls : mobileInactiveCls}`}>
              <Ic className="w-3.5 h-3.5" />{label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}