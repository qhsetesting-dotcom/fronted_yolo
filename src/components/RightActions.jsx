import {
  CircleAlert,
  Download,
  Mail,
  PlayCircle,
  StopCircle,
} from "lucide-react";
import { alerts } from "../data/dashboardData";

export default function RightActions() {
  const handleOpenEmailPage = (alert) => {
    window.location.href = `/email-settings?alert=${encodeURIComponent(
      alert[0]
    )}`;
  };

  return (
    <div className="w-full min-w-0 space-y-2 overflow-hidden">
      {/* Live Violation Alerts */}
      <section className="glass-card min-w-0 overflow-hidden p-2.5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h3 className="truncate text-[11px] font-semibold">
            Live Violation Alerts
          </h3>

          <button className="shrink-0 text-[10px] text-white/70 hover:text-white">
            View All ›
          </button>
        </div>

        <div className="h-[154px] space-y-1.5 overflow-y-auto pr-1">
          {alerts.map(([name, place, time, tone], index) => (
            <div
              key={`${name}-${index}`}
              className="grid h-[34px] grid-cols-[minmax(0,1fr)_24px] items-center gap-1.5 rounded-md bg-[#06182b]/70 px-2 py-1 transition hover:bg-[#0b2238]"
            >
              <div className="min-w-0">
                <div className="flex min-w-0 items-center gap-1.5">
                  <CircleAlert
                    size={12}
                    className={`shrink-0 ${
                      tone === "danger" ? "text-red-400" : "text-yellow-400"
                    }`}
                  />

                  <span title={name} className="truncate text-[10px] font-semibold">
                    {name}
                  </span>
                </div>

                <div className="mt-0.5 flex min-w-0 items-center gap-1.5 text-[9px] text-white/55">
                  <span title={place} className="truncate">
                    • {place}
                  </span>

                  <span className="shrink-0">{time}</span>
                </div>
              </div>

              <button
                onClick={() => handleOpenEmailPage([name, place, time, tone])}
                className="grid h-6 w-6 shrink-0 place-items-center rounded-md border border-[#1b3b5c] bg-[#07182a] text-white/75 transition hover:bg-[#123a5a] hover:text-white"
                title="Open email page"
              >
                <Mail size={12} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="glass-card min-w-0 overflow-hidden p-3">
        <h3 className="mb-2 truncate text-[11px] font-semibold text-white">
          Quick Actions
        </h3>

        <div className="grid grid-cols-1 gap-2">
          <button
            title="Start Recognition"
            className="group flex h-[32px] w-full min-w-0 items-center justify-center gap-2 rounded-md bg-[#0d63e6] px-3 text-[10px] font-semibold leading-none text-white transition hover:bg-[#0b55c8] hover:shadow-md active:scale-[0.98]"
          >
            <PlayCircle
              size={14}
              className="shrink-0 transition group-hover:scale-110"
            />
            <span className="truncate whitespace-nowrap">
              Start Recognition
            </span>
          </button>

          <button
            title="Stop"
            className="group flex h-[32px] w-full min-w-0 items-center justify-center gap-2 rounded-md bg-[#dc2626] px-3 text-[10px] font-semibold leading-none text-white transition hover:bg-[#b91c1c] hover:shadow-md active:scale-[0.98]"
          >
            <StopCircle
              size={14}
              className="shrink-0 transition group-hover:scale-110"
            />
            <span className="truncate whitespace-nowrap">Stop</span>
          </button>

          <button
            title="Export To Excel"
            className="group flex h-[32px] w-full min-w-0 items-center justify-center gap-2 rounded-md bg-[#09a953] px-3 text-[10px] font-semibold leading-none text-white transition hover:bg-[#078f46] hover:shadow-md active:scale-[0.98]"
          >
            <Download
              size={14}
              className="shrink-0 transition group-hover:scale-110"
            />
            <span className="truncate whitespace-nowrap">
              Export To Excel
            </span>
          </button>
        </div>
      </section>

      {/* Email Settings */}
      <section className="glass-card min-w-0 overflow-hidden p-3">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="flex min-w-0 items-center gap-1.5 text-[13px] font-semibold text-white">
            <Mail size={11} className="shrink-0 text-white/80" />
            <span className="truncate">Email Settings</span>
          </h3>

          <span className="shrink-0 rounded bg-green-600 px-2 py-0.5 text-[10px] font-semibold text-white">
            Enabled
          </span>
        </div>

        <p className="mb-3 truncate text-[10px] text-white/65">
          Receiver:{" "}
          <span className="font-medium text-white">
            mygaterlive@gmail.com
          </span>
        </p>

        <button
          onClick={() => (window.location.href = "/email-settings")}
          className="flex h-[34px] w-full items-center justify-center gap-2 rounded-md border border-[#123250] bg-[#0b2238] px-3 text-[11px] font-semibold text-white/90 transition hover:bg-[#123a5a] hover:text-white"
        >
          <Mail size={13} className="shrink-0" />
          Manage Email Settings
        </button>
      </section>
    </div>
  );
}