import { AlertTriangle, Gauge, ScanFace, UsersRound } from "lucide-react";

const cardMap = {
  persons: { icon: UsersRound, tone: "from-[#0d63e6] to-[#0647aa]" },
  faces: { icon: ScanFace, tone: "from-[#09a96d] to-[#04774e]" },
  fps: { icon: Gauge, tone: "from-[#6b35f4] to-[#3b18b8]" },
  violations: { icon: AlertTriangle, tone: "from-[#ff9f0a] to-[#e06f00]" },
};

function FpsSparkline() {
  return (
    <svg
      viewBox="0 0 160 36"
      className="mt-1 h-6 w-full sm:h-7"
      preserveAspectRatio="none"
    >
      <path
        d="M0 28 C18 28, 28 27, 42 26 C60 25, 70 23, 84 22 C100 20, 112 18, 124 15 C138 12, 148 8, 160 4"
        fill="none"
        stroke="#22c55e"
        strokeWidth="2"
      />

      <path
        d="M0 28 C18 28, 28 27, 42 26 C60 25, 70 23, 84 22 C100 20, 112 18, 124 15 C138 12, 148 8, 160 4 L160 36 L0 36 Z"
        fill="rgba(34, 197, 94, 0.12)"
      />
    </svg>
  );
}

export default function StatCard({
  type = "persons",
  title = "",
  value = "",
  subtitle = "",
  change = "",
  danger = false,
}) {
  const config = cardMap[type] || cardMap.persons;
  const Icon = config.icon;

  return (
    <div className="glass-card flex min-h-[92px] min-w-0 items-center gap-2 overflow-hidden p-3 sm:gap-3">
      <div
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br sm:h-11 sm:w-11 lg:h-12 lg:w-12 ${config.tone}`}
      >
        <Icon size={20} className="shrink-0" />
      </div>

      <div className="min-w-0 flex-1 overflow-hidden">
        <p
          title={title}
          className="break-words text-[10px] font-semibold leading-tight text-white/70 sm:text-[11px]"
        >
          {title}
        </p>

        <h3
          title={String(value)}
          className="mt-0.5 truncate text-lg font-bold leading-tight sm:text-xl"
        >
          {value}
        </h3>

        <p
          title={subtitle}
          className="truncate text-[10px] leading-tight text-white/70 sm:text-[11px]"
        >
          {subtitle}
        </p>

        {type === "fps" && <FpsSparkline />}

        {change && type !== "fps" && (
          <p
            title={change}
            className={`mt-0.5 truncate text-[10px] font-semibold leading-tight sm:text-[11px] ${
              danger ? "text-red-500" : "text-green-400"
            }`}
          >
            {change}
          </p>
        )}
      </div>
    </div>
  );
}