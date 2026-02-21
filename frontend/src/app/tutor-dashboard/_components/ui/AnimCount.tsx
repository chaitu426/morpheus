"use client";

import { useState, useEffect } from "react";

interface AnimCountProps {
  to: number;
  run: boolean;
}

export default function AnimCount({ to, run }: AnimCountProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    let current = 0;
    const step = Math.ceil(to / 45);
    const id = setInterval(() => {
      current += step;
      if (current >= to) {
        setValue(to);
        clearInterval(id);
      } else {
        setValue(current);
      }
    }, 22);
    return () => clearInterval(id);
  }, [run, to]);

  return <>{value}</>;
}