import React from "react";

// List of professional, modern Tailwind background colors
const BACKGROUND_COLORS = [
  "bg-red-500 text-white",
  "bg-orange-500 text-white",
  "bg-amber-500 text-black",
  "bg-emerald-500 text-white",
  "bg-teal-500 text-white",
  "bg-cyan-500 text-white",
  "bg-sky-500 text-white",
  "bg-blue-500 text-white",
  "bg-indigo-500 text-white",
  "bg-violet-500 text-white",
  "bg-purple-500 text-white",
  "bg-fuchsia-500 text-white",
  "bg-pink-500 text-white",
  "bg-rose-500 text-white",
];

export function UserAvatar({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  // 1. Get Initials (e.g., "john doe" -> "JD")
  const words = name.trim().split(/\s+/);
  let initials = "";

  if (words.length > 0 && words[0]) {
    initials += words[0][0]; // First letter of first name
    if (words.length > 1 && words[words.length - 1]?.[0]) {
      initials += words[words.length - 1][0]; // First letter of last name
    }
  }

  // Fallback if name is empty
  const fallbackInitials = initials ? initials.toUpperCase() : "?";

  // 2. Consistent Hash Algorithm to pick a random color based on the name string
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colorIndex = Math.abs(hash) % BACKGROUND_COLORS.length;
  const pickedColorClass = BACKGROUND_COLORS[colorIndex];

  // 3. Render the round container box
  return (
    <div
      className={`flex items-center justify-center rounded-full font-semibold select-none shrink-0 text-sm h-10 w-10 ${pickedColorClass} ${className}`}>
      {fallbackInitials}
    </div>
  );
}
