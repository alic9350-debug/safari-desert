const P: Record<string, string> = {
  check: "M20 6 9 17l-5-5",
  star: "M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-14v4l3 2",
  chat: "M21 11.5a8.4 8.4 0 0 1-12.3 7.4L3 21l2.1-5.6A8.5 8.5 0 1 1 21 11.5z",
  lock: "M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4",
  pin: "M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm13 10v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8",
  leaf: "M11 20A7 7 0 0 1 4 13c0-5 4-9 16-10-1 12-5 16-9 16zM4 21c3-5 6-8 10-10",
  car: "M5 17h14M5 17a2 2 0 1 0 4 0m6 0a2 2 0 1 0 4 0M3 17v-5l2-5h14l2 5v5M3 12h18",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  minus: "M5 12h14",
  plus: "M12 5v14M5 12h14",
};

export default function Icon({ name, size = 18, className = "" }: { name: keyof typeof P | string; size?: number; className?: string }) {
  const filled = name === "star";
  return (
    <svg className={`ico ${className}`} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"
      fill={filled ? "currentColor" : "none"} stroke={filled ? "none" : "currentColor"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d={P[name]} />
    </svg>
  );
}
