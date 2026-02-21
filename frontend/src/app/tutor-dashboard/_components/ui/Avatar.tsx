import { AVATAR_COLORS } from "../constants";

interface AvatarProps {
  initials: string;
  ci?: number;
  size?: "xs" | "sm" | "md" | "lg";
}

const SIZE_MAP = {
  xs: "w-6 h-6 text-[9px]",
  sm: "w-8 h-8 text-[10px]",
  md: "w-9 h-9 text-xs",
  lg: "w-12 h-12 text-sm",
};

export default function Avatar({ initials, ci = 0, size = "md" }: AvatarProps) {
  return (
    <div
      className={`
        ${SIZE_MAP[size]}
        ${AVATAR_COLORS[ci % AVATAR_COLORS.length]}
        rounded-full flex items-center justify-center
        font-bold text-gray-900 shrink-0 ring-2 ring-white
      `}
    >
      {initials}
    </div>
  );
}