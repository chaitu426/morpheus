"use client";

import { useState, useEffect } from "react";

export default function AnimCount({ to, run }: { to: number; run: boolean }) {
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!run) return;
    let c = 0;
    const step = Math.ceil(to / 45);
    const id = setInterval(() => {
      c += step;
      if (c >= to) { setV(to); clearInterval(id); }
      else setV(c);
    }, 22);
    return () => clearInterval(id);
  }, [run, to]);

  return <>{v}</>;
}