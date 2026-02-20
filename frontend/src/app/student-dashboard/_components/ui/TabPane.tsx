"use client";

import { useState, useEffect } from "react";

export default function TabPane({ children, id }: { children: React.ReactNode; id: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, [id]);

  return (
    <div
      style={{
        transition: "opacity .35s cubic-bezier(.4,0,.2,1), transform .35s cubic-bezier(.4,0,.2,1)",
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0)" : "translateY(12px)",
      }}
    >
      {children}
    </div>
  );
}