"use client";

import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "ghost";
};

export default function Button({ className = "", variant = "default", ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded px-4 py-2 text-sm font-medium shadow-sm";
  const variantClass =
    variant === "ghost"
      ? "bg-transparent text-zinc-900 hover:bg-zinc-100"
      : "bg-indigo-600 text-white hover:bg-indigo-700";

  return <button className={`${base} ${variantClass} ${className}`} {...props} />;
}
