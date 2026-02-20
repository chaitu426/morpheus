import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";
import { PAGE_META } from "../constants";
import type { AppMode, RegularTab, ExamTab } from "../constants";

interface PageHeadingProps {
  tab:    RegularTab | ExamTab;
  mode:   AppMode;
  isDark: boolean;
}

export default function PageHeading({ tab, mode, isDark }: PageHeadingProps) {
  const isExam = mode === "exam";

  return (
    <div className="relative z-10 px-6 sm:px-10 pt-6 pb-5">
      <div className="flex items-end justify-between">
        <div>
          <h1
            className={`text-3xl sm:text-4xl xl:text-5xl tracking-tight leading-[1.1]
              ${isDark ? "text-white" : "text-gray-900"}`}
            style={{
              fontFamily: "var(--font-heading,'Instrument Serif',Georgia,serif)",
              fontWeight: 400,
              animation:  "fadeSlide .4s ease-out both",
            }}
          >
            {PAGE_META[tab].title}
          </h1>
          <p
            className={`text-sm mt-2 font-medium tracking-wide ${isDark ? "text-gray-400" : "text-gray-400"}`}
            style={{
              fontFamily: "var(--font-body,'Plus Jakarta Sans',sans-serif)",
              animation:  "fadeSlide .4s .08s ease-out both",
            }}
          >
            {PAGE_META[tab].sub}
          </p>
        </div>

        {isExam ? (
          <Badge className="bg-violet-100 text-violet-700 border-0 rounded-full text-xs font-semibold
            hidden sm:flex gap-1.5 items-center px-3 py-1.5">
            <Zap className="w-3 h-3 fill-violet-500" />
            Exam Mode Active
          </Badge>
        ) : (
          <Badge className="bg-emerald-100 text-emerald-700 border-0 rounded-full text-xs font-semibold
            hidden sm:flex gap-1.5 items-center px-3 py-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            2 sessions today
          </Badge>
        )}
      </div>
    </div>
  );
}